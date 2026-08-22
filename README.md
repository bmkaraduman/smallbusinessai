# SmallBusinessAI

WhatsApp-first AI assistant for small businesses in the Netherlands — döner shops,
barbers, repair shops and corner stores.

This repository contains the marketing site (with the privacy policy required for
the Google Business Profile API application) and a working product demo. The
Google, Meta and WhatsApp integrations are **simulated with mock data**, so the
whole thing runs before any API approval comes through.

## Running it

Node.js 18.17 or newer is required. If `node -v` fails, install it from
[nodejs.org](https://nodejs.org) (LTS) first.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. You will be redirected to the language your browser
prefers, falling back to Dutch.

| Route | What it is |
| --- | --- |
| `/nl`, `/tr`, `/de`, `/en` | Marketing site |
| `/<locale>/privacy` | Privacy policy — **required for the Google API application** |
| `/<locale>/terms` | Terms of service |
| `/<locale>/dashboard` | Owner dashboard — overview |
| `/<locale>/dashboard/reviews` | Review inbox with AI drafts, approve / edit / publish |
| `/<locale>/dashboard/social` | Instagram & Facebook post queue |
| `/<locale>/dashboard/whatsapp` | Interactive WhatsApp flow simulation |
| `/<locale>/dashboard/reports` | Weekly report and customer segments |

## Languages

Dutch, Turkish, German and English. Copy lives in `lib/dictionaries/*.json` — all
four files share exactly the same key structure, so adding a language means
copying one file and translating the values, then adding the code to
`lib/i18n.ts` and `middleware.ts`.

Customer-facing sample content (reviews, replies, posts) stays in Dutch on
purpose: that is the language it arrives in from real customers.

## Where the mock data lives

`lib/mock-data.ts` is the single seam between the demo and the real thing. Each
export is shaped like the API response it stands in for:

| Export | Will be replaced by |
| --- | --- |
| `reviews`, `business` | Google Business Profile API |
| `socialPosts` | Meta Graph API |
| `whatsappThread` | WhatsApp Business Cloud API |
| `customers`, `weeklyReport`, `ordersByDay` | Supabase queries |

Swapping in the live clients should be a change to this one file plus the fetch
layer around it — the components do not know where the data came from.

## Project layout

```
app/[locale]/          Pages. The locale layout is the root layout.
  dashboard/           Demo product, own sidebar layout
components/marketing/  Landing page sections, header, footer, legal renderer
components/dashboard/  Sidebar, stat tiles, charts, review card, WhatsApp sim
lib/i18n.ts            Locale list + dictionary loader
lib/dictionary-types.ts  The shape every dictionary must match
lib/mock-data.ts       Simulated API responses
middleware.ts          Locale detection and redirect
```

## Deploying

Push to GitHub and import the repo on [Vercel](https://vercel.com) — no build
configuration needed. Point `smallbusinessai.nl` at it and the privacy policy is
live at `https://smallbusinessai.nl/nl/privacy`, which is what the Google
Business Profile API access request form asks for.

## Before going live

- [ ] Replace the placeholder KvK and VAT numbers in `lib/dictionaries/*.json` (`footer.kvk`)
- [ ] Have a Dutch lawyer review the privacy policy and terms — they are a solid
      starting draft, not vetted legal advice
- [ ] Set up `hallo@` and `privacy@` on your own domain (Google rejects
      applications submitted from a Gmail address)
- [ ] Fill in `.env.local` from `.env.example` as each integration is approved
