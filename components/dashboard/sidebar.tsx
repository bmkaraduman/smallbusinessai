"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../icons";

export type NavItem = {
  href: string;
  label: string;
  icon: keyof typeof Icon;
  badge?: number;
};

export function Sidebar({
  items,
  backHref,
  backLabel,
  business,
}: {
  items: NavItem[];
  backHref: string;
  backLabel: string;
  business: { name: string; category: string; city: string };
}) {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col gap-1 border-b border-ink-700 bg-ink-950 p-3 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-4">
      <Link href={backHref} className="mb-4 hidden items-center gap-2.5 px-2 lg:flex">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-400 text-base">
          🥙
        </span>
        <span className="font-display text-sm font-bold text-white">
          SmallBusiness<span className="text-brand-300">AI</span>
        </span>
      </Link>

      <div className="mb-3 hidden rounded-xl border border-ink-700 bg-ink-850 p-3 lg:block">
        <p className="truncate font-display text-sm font-semibold text-white">
          {business.name}
        </p>
        <p className="mt-0.5 truncate text-xs text-slate-500">
          {business.category} · {business.city}
        </p>
      </div>

      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map((item) => {
          const IconComponent = Icon[item.icon];
          const active =
            pathname === item.href || pathname === `${item.href}/`;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition
                ${
                  active
                    ? "bg-brand-400/12 text-brand-200"
                    : "text-slate-400 hover:bg-ink-800 hover:text-slate-200"
                }`}
            >
              <IconComponent className="h-[18px] w-[18px]" />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-brand-400 px-1.5 text-[11px] font-bold text-ink-950">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <Link
        href={backHref}
        className="mt-auto hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:text-slate-300 lg:flex"
      >
        <Icon.arrowRight className="h-4 w-4 rotate-180" />
        {backLabel}
      </Link>
    </aside>
  );
}
