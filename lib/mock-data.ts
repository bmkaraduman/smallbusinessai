/**
 * Mock data layer.
 *
 * Everything here simulates responses we will later get from:
 *   - Google Business Profile API  (reviews, replies, ratings)
 *   - Meta Graph API               (Instagram / Facebook posts)
 *   - WhatsApp Business Cloud API  (notifications, approvals)
 *
 * Each export is shaped like the real API response so that swapping in the
 * live client later is a one-file change. Customer-facing text stays in Dutch
 * on purpose — that is the language real reviews arrive in.
 */

export type Business = {
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  googleConnected: boolean;
  whatsappConnected: boolean;
  instagramConnected: boolean;
};

export const business: Business = {
  name: "Döner Palace",
  category: "Döner & Shoarma",
  city: "Amsterdam Oud-West",
  rating: 4.3,
  reviewCount: 218,
  googleConnected: true,
  whatsappConnected: true,
  instagramConnected: true,
};

export type ReviewStatus = "pending" | "approved" | "published";

export type Review = {
  id: string;
  author: string;
  initials: string;
  rating: number;
  receivedAt: string;
  minutesAgo: number;
  text: string;
  status: ReviewStatus;
  urgent: boolean;
  draft: string;
  publishedAt?: string;
};

export const reviews: Review[] = [
  {
    id: "rev_01",
    author: "Sanne de Vries",
    initials: "SV",
    rating: 2,
    receivedAt: "02:14",
    minutesAgo: 41,
    text: "Bestelling kwam 50 minuten te laat en de friet was koud. Jammer, want de döner zelf is normaal echt lekker.",
    status: "pending",
    urgent: true,
    draft:
      "Beste Sanne, wat vervelend dat je bestelling zo laat kwam en de friet koud was — dat is niet de kwaliteit die we willen leveren. Het was gisteravond uitzonderlijk druk, maar dat is geen excuus. Stuur je ons even een bericht? Dan maken we het goed bij je volgende bestelling. Bedankt dat je de moeite nam om dit te laten weten.",
  },
  {
    id: "rev_02",
    author: "Mehmet Y.",
    initials: "MY",
    rating: 5,
    receivedAt: "21:38",
    minutesAgo: 320,
    text: "Beste döner van Oud-West. Het brood is altijd vers en het personeel is vriendelijk. Ga zo door!",
    status: "pending",
    urgent: false,
    draft:
      "Bedankt Mehmet! Vers brood elke dag is precies waar we het meeste tijd in steken, dus fijn dat je het proeft. Tot de volgende keer!",
  },
  {
    id: "rev_03",
    author: "Lisa Brouwer",
    initials: "LB",
    rating: 4,
    receivedAt: "19:02",
    minutesAgo: 478,
    text: "Lekker eten en snelle service. Enige minpuntje: het is soms lastig een plekje te vinden om te zitten.",
    status: "pending",
    urgent: false,
    draft:
      "Dank je wel Lisa! Fijn dat het eten en de service in orde waren. Je hebt gelijk over de zitplaatsen — in de avonduren is het vaak vol. We kijken naar een andere indeling. Tot snel!",
  },
  {
    id: "rev_04",
    author: "Ahmed el Amrani",
    initials: "AA",
    rating: 5,
    receivedAt: "17:45",
    minutesAgo: 555,
    text: "Halal, betaalbaar en altijd consistent. Mijn vaste adres na het werk.",
    status: "approved",
    urgent: false,
    draft:
      "Bedankt Ahmed! Consistentie is precies waar we op sturen. Fijn dat je er zo vaak bent — tot de volgende!",
  },
  {
    id: "rev_05",
    author: "Joris Bakker",
    initials: "JB",
    rating: 5,
    receivedAt: "12:20",
    minutesAgo: 1400,
    text: "Snel geregeld via WhatsApp, binnen 15 minuten klaar. Top service.",
    status: "published",
    urgent: false,
    publishedAt: "12:26",
    draft:
      "Dank je Joris! Bestellen via WhatsApp scheelt ons allebei tijd — fijn dat het goed beviel.",
  },
  {
    id: "rev_06",
    author: "Fatima Ouali",
    initials: "FO",
    rating: 4,
    receivedAt: "10:05",
    minutesAgo: 1535,
    text: "Goede kwaliteit voor de prijs. Zou wel meer vegetarische opties willen zien.",
    status: "published",
    urgent: false,
    publishedAt: "10:31",
    draft:
      "Bedankt Fatima! Meer vegetarische opties staan op onze lijst — we testen binnenkort een falafel-menu. Blijf ons volgen!",
  },
];

export type SocialPost = {
  id: string;
  platform: "instagram" | "facebook";
  status: "draft" | "scheduled" | "published";
  scheduledFor: string;
  trigger: string;
  caption: string;
  hashtags: string[];
  likes?: number;
  reach?: number;
};

export const socialPosts: SocialPost[] = [
  {
    id: "post_01",
    platform: "instagram",
    status: "draft",
    scheduledFor: "Vandaag 17:00",
    trigger: "weather",
    caption:
      "Regen in Amsterdam? Wij bezorgen. Vandaag bij elke bestelling boven €20 een gratis drankje erbij. 🌧️",
    hashtags: ["#amsterdam", "#doner", "#bezorging", "#oudwest"],
  },
  {
    id: "post_02",
    platform: "instagram",
    status: "scheduled",
    scheduledFor: "Morgen 12:00",
    trigger: "menu",
    caption:
      "Vandaag vers gesneden kipdöner, elke ochtend om 07:00 opgezet. Kom langs zolang de voorraad strekt.",
    hashtags: ["#versgemaakt", "#kipdoner", "#lunchdeal"],
  },
  {
    id: "post_03",
    platform: "facebook",
    status: "scheduled",
    scheduledFor: "Zaterdag 18:30",
    trigger: "event",
    caption:
      "Ajax speelt zaterdag om 20:00. Reserveer je tafel of bestel op tijd — het wordt druk!",
    hashtags: ["#ajax", "#wedstrijdavond", "#amsterdam"],
  },
  {
    id: "post_04",
    platform: "instagram",
    status: "published",
    scheduledFor: "Gisteren 18:00",
    trigger: "menu",
    caption:
      "Nieuw op de kaart: falafel-box met huisgemaakte hummus. Vegetarisch en vullend.",
    hashtags: ["#falafel", "#vegetarisch", "#amsterdamfood"],
    likes: 247,
    reach: 3140,
  },
];

export type WhatsAppMessage = {
  id: string;
  from: "system" | "owner";
  time: string;
  kind: "alert" | "reminder" | "report" | "campaign" | "reply";
  title?: string;
  body: string;
  actions?: string[];
};

export const whatsappThread: WhatsAppMessage[] = [
  {
    id: "wa_01",
    from: "system",
    time: "02:16",
    kind: "alert",
    title: "🚨 Kritieke review",
    body: "Nieuwe review van 2 sterren van Sanne de Vries:\n\n\"Bestelling kwam 50 minuten te laat en de friet was koud...\"\n\nIk heb een antwoord voorbereid. Stuur *1* om te versturen, *2* om aan te passen.",
    actions: ["1", "2"],
  },
  { id: "wa_02", from: "owner", time: "07:04", kind: "reply", body: "1" },
  {
    id: "wa_03",
    from: "system",
    time: "07:04",
    kind: "alert",
    body: "✅ Antwoord geplaatst op Google. Reactietijd: 4 uur 50 min.",
  },
  {
    id: "wa_04",
    from: "system",
    time: "10:00",
    kind: "reminder",
    title: "☀️ Goedemorgen",
    body: "Je hebt *3* reviews die nog een antwoord nodig hebben. Alle drie de concepten staan klaar. Stuur *R* om ze te bekijken.",
    actions: ["R"],
  },
  {
    id: "wa_05",
    from: "system",
    time: "16:32",
    kind: "campaign",
    title: "🌧️ Weeralarm — KNMI",
    body: "Vanaf 17:00 regen in Amsterdam. Voorstel: \"Gratis drankje bij bestelling boven €20\" op Instagram + WhatsApp-lijst (412 klanten).\n\nStuur *JA* om te versturen.",
    actions: ["JA", "NEE"],
  },
  { id: "wa_06", from: "owner", time: "16:35", kind: "reply", body: "JA" },
  {
    id: "wa_07",
    from: "system",
    time: "16:36",
    kind: "campaign",
    body: "✅ Campagne verstuurd naar 412 klanten en geplaatst op Instagram.",
  },
  {
    id: "wa_08",
    from: "system",
    time: "09:00",
    kind: "report",
    title: "📊 Weekrapport — week 34",
    body: "Reviews: *12 nieuw* (gem. 4,4 ⭐)\nAntwoorden: *12/12* binnen 6 uur\nDirecte bestellingen: *38* (€74 commissie bespaard)\nInstagram: *3 posts*, 8.400 bereik\nTeruggewonnen klanten: *6*\n\nStuur *D* voor details.",
    actions: ["D"],
  },
];

export const overviewStats = {
  rating: { value: "4,3", delta: "+0,2", trend: "up" as const },
  pendingReviews: { value: "3", delta: "-2", trend: "down" as const },
  responseTime: { value: "2u 10m", delta: "-45m", trend: "down" as const },
  commissionSaved: { value: "€287", delta: "+€64", trend: "up" as const },
};

/** Rating trend, last 8 weeks. */
export const ratingTrend = [3.9, 3.9, 4.0, 4.0, 4.1, 4.2, 4.2, 4.3];

/** Direct (commission-free) orders per weekday. */
export const ordersByDay = [
  { day: "Ma", direct: 18, platform: 31 },
  { day: "Di", direct: 22, platform: 28 },
  { day: "Wo", direct: 26, platform: 27 },
  { day: "Do", direct: 31, platform: 25 },
  { day: "Vr", direct: 44, platform: 34 },
  { day: "Za", direct: 52, platform: 38 },
  { day: "Zo", direct: 39, platform: 30 },
];

export type Customer = {
  id: string;
  name: string;
  initials: string;
  orders: number;
  lastOrder: string;
  segment: "loyal" | "at_risk" | "new" | "birthday";
  value: string;
};

export const customers: Customer[] = [
  { id: "c1", name: "Ahmed el Amrani", initials: "AA", orders: 24, lastOrder: "2 dagen", segment: "loyal", value: "€412" },
  { id: "c2", name: "Sanne de Vries", initials: "SV", orders: 9, lastOrder: "23 dagen", segment: "at_risk", value: "€148" },
  { id: "c3", name: "Joris Bakker", initials: "JB", orders: 3, lastOrder: "1 dag", segment: "new", value: "€47" },
  { id: "c4", name: "Fatima Ouali", initials: "FO", orders: 17, lastOrder: "5 dagen", segment: "loyal", value: "€289" },
  { id: "c5", name: "Tim Jansen", initials: "TJ", orders: 11, lastOrder: "26 dagen", segment: "at_risk", value: "€196" },
  { id: "c6", name: "Lisa Brouwer", initials: "LB", orders: 6, lastOrder: "9 dagen", segment: "birthday", value: "€102" },
];

export const weeklyReport = {
  week: 34,
  period: "18 – 24 aug 2026",
  highlights: [
    { label: "Nieuwe reviews", value: "12", sub: "gem. 4,4 ⭐" },
    { label: "Beantwoord", value: "12/12", sub: "binnen 6 uur" },
    { label: "Directe bestellingen", value: "38", sub: "zonder commissie" },
    { label: "Bespaard", value: "€74", sub: "aan platformcommissie" },
  ],
  channels: [
    { name: "Google", detail: "12 reviews · 4,4 gem.", pct: 82 },
    { name: "Instagram", detail: "3 posts · 8.400 bereik", pct: 64 },
    { name: "WhatsApp", detail: "412 ontvangers · 31% respons", pct: 31 },
    { name: "Facebook", detail: "1 post · 1.900 bereik", pct: 22 },
  ],
};

/** Referral tiers — the Binance-style lifetime commission model. */
export const referralTiers = [
  { key: "bronze", icon: "🥉", range: "1–5", rate: "5%" },
  { key: "silver", icon: "🥈", range: "6–15", rate: "7%" },
  { key: "gold", icon: "🥇", range: "16–30", rate: "9%" },
  { key: "elite", icon: "💎", range: "31+", rate: "10%" },
];
