/**
 * Hand-written shape for the translation files.
 *
 * We declare this explicitly instead of inferring it from nl.json, because
 * TypeScript would infer literal tuple types from JSON imports — which breaks
 * as soon as one item in an array has an optional field (e.g. `badge` on the
 * Business plan). Every dictionary in lib/dictionaries must match this shape.
 */

export type LegalSection = { h: string; body: string[] };

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    modules: string;
    sectors: string;
    pricing: string;
    referral: string;
    faq: string;
    dashboard: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
    stats: { value: string; label: string }[];
  };
  problem: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
  };
  day: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { time: string; title: string; body: string }[];
  };
  modules: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { name: string; tagline: string; points: string[] }[];
  };
  sectors: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { icon: string; name: string; problem: string }[];
  };
  compare: {
    eyebrow: string;
    title: string;
    subtitle: string;
    headers: { name: string; why: string };
    rows: { name: string; why: string }[];
    us: { name: string; why: string };
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    period: string;
    plans: {
      name: string;
      price: string;
      desc: string;
      badge?: string;
      features: string[];
      cta: string;
    }[];
    notes: string[];
  };
  referral: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    headers: { tier: string; refs: string; rate: string };
    tiers: Record<"bronze" | "silver" | "gold" | "elite", string>;
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  final: { title: string; subtitle: string; cta: string; note: string };
  footer: {
    tagline: string;
    product: string;
    company: string;
    legal: string;
    links: Record<
      | "modules"
      | "pricing"
      | "demo"
      | "referral"
      | "about"
      | "contact"
      | "privacy"
      | "terms",
      string
    >;
    rights: string;
    kvk: string;
  };
  legal: { privacy: LegalDoc; terms: LegalDoc };
  dash: {
    demoBanner: string;
    nav: Record<
      "overview" | "reviews" | "social" | "whatsapp" | "reports" | "backToSite",
      string
    >;
    common: Record<
      | "connected"
      | "approve"
      | "edit"
      | "regenerate"
      | "published"
      | "pending"
      | "approved"
      | "urgent"
      | "aiDraft"
      | "viewAll"
      | "minutesAgo"
      | "hoursAgo",
      string
    >;
    overview: {
      title: string;
      subtitle: string;
      stats: Record<"rating" | "pending" | "response" | "saved", string>;
      trendTitle: string;
      trendSub: string;
      ordersTitle: string;
      ordersSub: string;
      ordersDirect: string;
      ordersPlatform: string;
      urgentTitle: string;
      activityTitle: string;
    };
    reviews: {
      title: string;
      subtitle: string;
      filters: Record<"all" | "pending" | "published", string>;
      empty: string;
      draftLabel: string;
      publishedLabel: string;
    };
    social: {
      title: string;
      subtitle: string;
      triggers: Record<"weather" | "event" | "menu", string>;
      status: Record<"draft" | "scheduled" | "published", string>;
      likes: string;
      reach: string;
    };
    whatsapp: {
      title: string;
      subtitle: string;
      hint: string;
      replyPlaceholder: string;
      legendTitle: string;
      legend: Record<"alert" | "reminder" | "campaign" | "report", string>;
    };
    reports: {
      title: string;
      subtitle: string;
      week: string;
      channelsTitle: string;
      highlightsTitle: string;
      customersTitle: string;
      segments: Record<"loyal" | "at_risk" | "new" | "birthday", string>;
      tableHeaders: Record<
        "customer" | "orders" | "last" | "value" | "segment",
        string
      >;
      ago: string;
    };
  };
};
