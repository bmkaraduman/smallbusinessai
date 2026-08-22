"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

const LOCALES = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export function LangSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Swap only the first path segment so the visitor stays on the same page.
  function hrefFor(locale: string) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  const active = LOCALES.find((l) => l.code === current) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/70 px-3 py-2 text-sm
                   font-medium text-slate-200 transition hover:border-ink-500 hover:bg-ink-700"
      >
        <span aria-hidden="true">{active.flag}</span>
        <span className="hidden sm:inline">{active.code.toUpperCase()}</span>
        <Icon.chevronDown
          className={`h-4 w-4 text-slate-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-ink-600
                     bg-ink-850 p-1 shadow-2xl"
        >
          {LOCALES.map((locale) => (
            <li key={locale.code}>
              <Link
                href={hrefFor(locale.code)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${
                    locale.code === current
                      ? "bg-brand-400/10 text-brand-200"
                      : "text-slate-300 hover:bg-ink-700"
                  }`}
              >
                <span aria-hidden="true">{locale.flag}</span>
                {locale.name}
                {locale.code === current && (
                  <Icon.check className="ml-auto h-4 w-4 text-brand-300" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
