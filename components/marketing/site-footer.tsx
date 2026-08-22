import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary-types";

export function SiteFooter({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const year = 2026;

  const columns = [
    {
      title: dict.footer.product,
      links: [
        { label: dict.footer.links.modules, href: `/${locale}#modules` },
        { label: dict.footer.links.pricing, href: `/${locale}#pricing` },
        { label: dict.footer.links.demo, href: `/${locale}/dashboard` },
        { label: dict.footer.links.referral, href: `/${locale}#referral` },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { label: dict.footer.links.about, href: `/${locale}#modules` },
        { label: dict.footer.links.contact, href: "mailto:hallo@smallbusinessai.nl" },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { label: dict.footer.links.privacy, href: `/${locale}/privacy` },
        { label: dict.footer.links.terms, href: `/${locale}/terms` },
      ],
    },
  ];

  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-400 text-lg">
              🥙
            </span>
            <span className="font-display text-[15px] font-bold text-white">
              SmallBusiness<span className="text-brand-300">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {dict.footer.tagline}
          </p>
          <p className="mt-6 text-xs text-slate-500">{dict.footer.kvk}</p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-800">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} SmallBusinessAI. {dict.footer.rights}
          </p>
          <p>Amsterdam · Rotterdam · Den Haag</p>
        </div>
      </div>
    </footer>
  );
}
