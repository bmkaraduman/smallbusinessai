/**
 * WhatsApp Business Cloud API client.
 *
 * Thin wrapper around the Graph API endpoints we actually use. Everything the
 * dashboard simulates today (crisis alert, morning reminder, campaign proposal,
 * weekly report) is sent through here once a business number is registered.
 *
 * Required environment variables — see .env.example:
 *   WHATSAPP_ACCESS_TOKEN     permanent system-user token
 *   WHATSAPP_PHONE_NUMBER_ID  the sender number's ID (not the phone number)
 */

const GRAPH_VERSION = "v26.0";

function config() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error(
      "WhatsApp is not configured: set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID",
    );
  }
  return { token, phoneNumberId };
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID,
  );
}

type GraphError = {
  error?: { message?: string; code?: number; error_data?: { details?: string } };
};

async function post(path: string, body: unknown) {
  const { token, phoneNumberId } = config();
  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/${path}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const json = (await response.json()) as GraphError & Record<string, unknown>;

  if (!response.ok) {
    const detail =
      json.error?.error_data?.details ?? json.error?.message ?? "unknown error";
    throw new Error(`WhatsApp API ${json.error?.code ?? response.status}: ${detail}`);
  }
  return json;
}

/**
 * Free-form text. Only allowed inside the 24-hour customer service window —
 * i.e. after the shop owner has messaged us. Outside it, use sendTemplate.
 */
export async function sendText(to: string, body: string, previewUrl = false) {
  return post("messages", {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: { body, preview_url: previewUrl },
  });
}

/**
 * Approved template. This is what we use for business-initiated messages:
 * the 03:00 crisis alert, the 10:00 reminder, the Monday report.
 */
export async function sendTemplate(
  to: string,
  templateName: string,
  languageCode = "nl",
  bodyParams: string[] = [],
) {
  return post("messages", {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      ...(bodyParams.length > 0 && {
        components: [
          {
            type: "body",
            parameters: bodyParams.map((text) => ({ type: "text", text })),
          },
        ],
      }),
    },
  });
}

/** Blue ticks on the owner's side — keeps the thread feeling responsive. */
export async function markAsRead(messageId: string) {
  return post("messages", {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
}
