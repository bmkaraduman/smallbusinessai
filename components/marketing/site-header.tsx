"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "../icons";
import { LangSwitcher } from "../lang-switcher";
import type { Dictionary } from "@/lib/dictionary-types";

export function SiteHeader({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#modules", label: dict.nav.modules },
    { href: "#sectors", label: dict.nav.sectors },
    { href: "#pricing", label: dict.nav.pricing },
    { href: "#referral", label: dict.nav.referral },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink-700 bg-ink-900/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-400 text-lg shadow-glow">
            🥙
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-white">
            SmallBusiness<span className="text-brand-300">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher current={locale} />
          <Link
            href={`/${locale}/dashboard`}
            className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white md:inline-flex"
          >
            {dict.nav.dashboard}
          </Link>
          <a href="#pricing" className="btn-primary hidden !py-2.5 sm:inline-flex">
            {dict.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-600 text-slate-300 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <Icon.close className="h-5 w-5" /> : <Icon.menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-700 bg-ink-900 lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-slate-300 hover:bg-ink-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={`/${locale}/dashboard`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-brand-300 hover:bg-ink-800"
            >
              {dict.nav.dashboard}
            </Link>
            <a href="#pricing" onClick={() => setOpen(false)} className="btn-primary mt-2">
              {dict.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
