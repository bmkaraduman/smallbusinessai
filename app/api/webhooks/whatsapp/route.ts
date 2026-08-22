import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { markAsRead, sendText } from "@/lib/whatsapp";

/**
 * WhatsApp Business Cloud API webhook.
 *
 *   GET  — Meta's one-time verification handshake ("Verify and save")
 *   POST — inbound messages and delivery status updates
 *
 * The owner replies with short commands from their phone; this is where the
 * WhatsApp simulation in the dashboard stops being a simulation:
 *
 *   "1"  publish the pending AI reply to Google
 *   "2"  edit it first
 *   "R"  list reviews still awaiting approval
 *   "JA" approve the proposed campaign
 *   "D"  weekly report details
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------ verify -- */

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (!expected) {
    console.error("[whatsapp] WHATSAPP_VERIFY_TOKEN is not set");
    // TEMPORARY setup diagnostic. Reports which of the variables we expect are
    // present and non-empty — names and booleans only, never values. Remove
    // once the webhook is verified.
    const expectedNames = [
      "WHATSAPP_VERIFY_TOKEN",
      "WHATSAPP_ACCESS_TOKEN",
      "WHATSAPP_PHONE_NUMBER_ID",
      "META_APP_SECRET",
    ];
    return NextResponse.json(
      {
        error: "not_configured",
        present: Object.fromEntries(
          expectedNames.map((name) => [name, Boolean(process.env[name])]),
        ),
        // Any WhatsApp/Meta-ish names actually visible at runtime, so a typo
        // in the Vercel dashboard shows up here.
        seen: Object.keys(process.env)
          .filter((key) => /WHATS|META|WA_/i.test(key))
          .sort(),
      },
      { status: 500 },
    );
  }

  if (mode === "subscribe" && token === expected && challenge) {
    // Meta expects the raw challenge back as plain text.
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

/* ---------------------------------------------------------- signature -- */

/**
 * Meta signs every POST with the app secret. Without this check anyone who
 * learns the URL could forge "the owner approved it" messages.
 */
function isSignatureValid(rawBody: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET;
  if (!secret) {
    console.error("[whatsapp] META_APP_SECRET is not set — rejecting");
    return false;
  }
  if (!header?.startsWith("sha256=")) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");
  const received = header.slice("sha256=".length);

  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(received, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/* ------------------------------------------------------------ inbound -- */

type InboundMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
  button?: { text: string; payload: string };
};

type WebhookPayload = {
  object?: string;
  entry?: {
    id: string;
    changes?: {
      field: string;
      value: {
        messaging_product: string;
        metadata?: { display_phone_number: string; phone_number_id: string };
        messages?: InboundMessage[];
        statuses?: { id: string; status: string; recipient_id: string }[];
      };
    }[];
  }[];
};

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!isSignatureValid(rawBody, request.headers.get("x-hub-signature-256"))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const { messages, statuses } = change.value;

      for (const status of statuses ?? []) {
        console.log(`[whatsapp] ${status.recipient_id} → ${status.status}`);
      }

      for (const message of messages ?? []) {
        try {
          await handleMessage(message);
        } catch (error) {
          // Never let one bad message turn into a Meta retry storm.
          console.error("[whatsapp] handler failed", error);
        }
      }
    }
  }

  // Meta retries anything that is not a fast 200.
  return NextResponse.json({ received: true });
}

async function handleMessage(message: InboundMessage) {
  const body =
    message.type === "button"
      ? (message.button?.payload ?? message.button?.text ?? "")
      : (message.text?.body ?? "");

  const command = body.trim().toUpperCase();
  console.log(`[whatsapp] ${message.from}: ${JSON.stringify(body)}`);

  await markAsRead(message.id);

  switch (command) {
    case "1":
      // TODO: publish the pending draft via the Google Business Profile API,
      // then persist the result. Until that lands, acknowledge explicitly so
      // the owner is never misled into thinking a reply went live.
      await sendText(
        message.from,
        "✅ Ontvangen. De koppeling met Google is nog niet actief — je antwoord is opgeslagen als concept.",
      );
      break;

    case "2":
      await sendText(
        message.from,
        "Stuur de tekst zoals je hem wil hebben, dan gebruiken we die in plaats van het concept.",
      );
      break;

    case "R":
      // TODO: read pending reviews from Supabase instead of a fixed number.
      await sendText(
        message.from,
        "Je hebt 3 reviews die nog een antwoord nodig hebben. Open het dashboard om ze te bekijken.",
      );
      break;

    case "JA":
      await sendText(message.from, "✅ Campagne goedgekeurd. We zetten hem klaar.");
      break;

    case "NEE":
      await sendText(message.from, "Prima, we slaan deze campagne over.");
      break;

    case "D":
      await sendText(
        message.from,
        "Het volledige weekrapport staat in je dashboard onder Rapporten.",
      );
      break;

    default:
      await sendText(
        message.from,
        "Ik begreep dat niet. Stuur *1* om een antwoord te versturen, *2* om aan te passen, of *R* voor openstaande reviews.",
      );
  }
}
