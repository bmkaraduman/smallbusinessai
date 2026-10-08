# SmallBusinessAI — project context

WhatsApp-first AI assistant for small businesses in the Netherlands (döner shops,
barbers, repair shops, corner stores). Reviews answered, social media kept
running, lapsed customers won back — the owner approves everything with a single
WhatsApp message.

This file is the handoff. Read it before changing anything.

## Status as of 2026-10-08

**Working and deployed:**

- Marketing site in four languages (nl / tr / de / en), live on Vercel
- Privacy policy and terms, fully translated — these exist because the Google
  Business Profile API application requires a visible privacy policy
- Demo dashboard running entirely on `lib/mock-data.ts`: review inbox with
  approve/edit/publish, social queue, interactive WhatsApp flow, weekly report
- WhatsApp webhook endpoint, verified against production, HMAC signature check

**Not done yet:** no real Google, Meta or Supabase calls. Everything the
dashboard shows is simulated.

Live: <https://smallbusinessai-eta.vercel.app> · Repo: `bmkaraduman/smallbusinessai`

## Running it

Node 18.17+ required.

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to browser's language, else /nl
npm run typecheck  # keep this clean
npm run build
```

Secrets are not in the repo. Copy `.env.example` to `.env.local` and fill in what
you need; the app only reads a variable when it actually uses it, so an empty
file is fine for the demo.

## Layout

```
app/[locale]/              Pages. The locale layout IS the root layout — there is
                           no app/layout.tsx, which is the documented Next.js
                           i18n pattern. Do not add one.
  dashboard/               Demo product, own sidebar layout
app/api/webhooks/whatsapp/ Meta webhook: GET verification, POST with signature check
components/marketing/      Landing sections, header, footer, legal renderer
components/dashboard/      Sidebar, stat tiles, charts, review card, WhatsApp sim
lib/i18n.ts                Locale list + dictionary loader
lib/dictionary-types.ts    The shape every dictionary must match
lib/dictionaries/*.json    nl, tr, de, en — identical key structure, enforced by hand
lib/mock-data.ts           Simulated API responses — the seam
lib/whatsapp.ts            Graph API client: sendText, sendTemplate, markAsRead
middleware.ts              Locale detection and redirect; excludes /api
```

## Conventions

**Translations.** All four dictionaries must have exactly the same key
structure — a missing key renders as `undefined` in one language only, which is
easy to miss. After editing any dictionary, verify:

```bash
python3 -c "
import json
d={l:json.load(open(f'lib/dictionaries/{l}.json')) for l in ['nl','tr','de','en']}
def p(o,x=''):
    s=set()
    if isinstance(o,dict):
        for k,v in o.items(): s.add(x+'/'+k); s|=p(v,x+'/'+k)
    elif isinstance(o,list):
        s.add(f'{x}[len={len(o)}]')
        for v in o: s|=p(v,x+'/*')
    return s
b=p(d['nl'])
print('OK' if all(p(d[l])==b for l in d) else 'MISMATCH')
"
```

`lib/dictionary-types.ts` is hand-written on purpose — inferring the type from
the JSON breaks as soon as one array item has an optional field (the `badge` on
the Business pricing plan).

**Sample content language.** UI chrome is translated; the sample reviews, AI
drafts and social posts in `lib/mock-data.ts` stay in Dutch, because that is the
language real customer reviews arrive in.

**Secrets.** Never commit tokens. `.env.local` and `.claude/` are gitignored —
`.claude/launch.json` holds an absolute path to a specific machine.

## The mock-data seam

`lib/mock-data.ts` is the single file standing between the demo and the real
product. Each export is shaped like the API response it replaces:

| Export | Will be replaced by |
| --- | --- |
| `reviews`, `business` | Google Business Profile API |
| `socialPosts` | Meta Graph API |
| `whatsappThread` | WhatsApp Business Cloud API |
| `customers`, `weeklyReport`, `ordersByDay` | Supabase queries |

Components do not know where the data came from. Swapping in live clients should
touch this file and a fetch layer around it, not the UI.

## Where the external setup stands

### WhatsApp (Meta) — in progress, blocked on a phone number

Done:

- App `smallbusinessai` created; `whatsapp_business_messaging` and
  `whatsapp_business_management` are "Ready for testing"
- WABA `1781727896614278` with Meta's test number `+1 555-199-6272`
  (phone number ID `1338248882694083`, status CONNECTED)
- Webhook endpoint deployed and verified against production

Blocked: registering a real business phone number. The test number only sends to
a hand-verified allow-list of five recipients, and the UI for managing that list
is missing from the current Meta dashboard — "Step 1. Try it out" reports "No
phone numbers available for this app" even though the API shows the number
CONNECTED to the WABA. We stopped chasing that and moved to Step 2 (production
setup), which has no allow-list at all.

To continue: register a phone number that is **not** already on WhatsApp. A
number currently in the WhatsApp Business app can be migrated, but it then
leaves the app permanently and its chat history does not come along — disable
two-step verification in the app first or the migration fails silently. Two
numbers are allowed before business verification, twenty after, so a throwaway
dev number now and a Dutch +31 number for the beta is a reasonable split.

Also still open:

- `META_APP_SECRET` must be set in Vercel or every real webhook POST returns 401
- The app is unpublished, so only test webhooks from the dashboard are
  delivered. Publishing needs a privacy policy URL, which exists:
  `/nl/privacy`
- Message templates (crisis alert, morning reminder, weekly report) have not
  been submitted for approval
- Payment method needed for business-initiated messages; customer replies
  inside the 24-hour window do not need one

### Google Business Profile — not started

The access request form needs: a Google Cloud project number, a website with a
visible privacy policy, and an application email **on the same domain as that
website** — a Gmail address is rejected, and so is the `vercel.app` subdomain
since no mailbox can exist on it. So this is blocked on buying
`smallbusinessai.nl` and setting up mail there.

The other requirement — managing a Business Profile verified and active for
60+ days — is satisfied by being added as a manager on an existing shop's
profile; the 60 days refers to the profile's age, not how long you have managed
it.

## Gotchas already paid for

- **Vercel environment variables only apply to new deployments.** Adding a
  variable and reloading the site does nothing; redeploy.
- **Meta has two consoles that show different things.** `business.facebook.com`
  manages who in your company can access assets; `developers.facebook.com`
  manages the app your code talks to. The classic WhatsApp dev console URL now
  redirects to a Tools page.
- **Percentage heights need a definite parent height.** The orders chart
  rendered with invisible bars until it was switched to pixel maths — a flex
  item inside an `items-end` row does not stretch.
- **Next 14 on purpose.** Next 15+ makes `params` a Promise, which would mean
  rewriting every page. Stay on 14.2.x unless you are doing that migration
  deliberately.

## What to do next, in order

1. Buy `smallbusinessai.nl`, point it at Vercel, set up `metin@` and `privacy@`
   mailboxes. This single step unblocks both the Google application and
   publishing the Meta app.
2. Register a WhatsApp business number, generate a permanent token, set
   `META_APP_SECRET`, `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` in
   Vercel, redeploy.
3. Submit the Google Business Profile API access request.
4. Replace the review half of `lib/mock-data.ts` with real Google reviews, and
   generate draft replies with Claude. That is the first module that stops being
   a simulation.
5. Supabase schema and auth, so drafts and approvals persist.

Fuller product background — market, pricing, the five modules, the roadmap —
is in the original brief, `SmallBusinessAI_Context.docx`, which is not in this
repo.
