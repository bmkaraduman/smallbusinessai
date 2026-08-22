import type { Dictionary } from "./dictionary-types";

export type { Dictionary };

export const locales = ["nl", "tr", "de", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  tr: "Türkçe",
  de: "Deutsch",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  nl: "🇳🇱",
  tr: "🇹🇷",
  de: "🇩🇪",
  en: "🇬🇧",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  nl: () => import("./dictionaries/nl.json").then((m) => m.default as unknown as Dictionary),
  tr: () => import("./dictionaries/tr.json").then((m) => m.default as unknown as Dictionary),
  de: () => import("./dictionaries/de.json").then((m) => m.default as unknown as Dictionary),
  en: () => import("./dictionaries/en.json").then((m) => m.default as unknown as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale] ?? dictionaries[defaultLocale];
  return load();
}
