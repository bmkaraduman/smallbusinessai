import Link from "next/link";
import { Icon } from "../icons";
import { referralTiers } from "@/lib/mock-data";
import type { Dictionary } from "@/lib/dictionary-types";

type Props = { dict: Dictionary; locale: string };

/* ---------------------------------------------------------------- Hero -- */

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      <div className="absolute -inset-8 rounded-[3rem] bg-brand-400/20 blur-3xl" aria-hidden />
      <div className="relative rounded-[2.2rem] border border-ink-600 bg-ink-950 p-2.5 shadow-2xl">
        <div className="overflow-hidden rounded-[1.7rem] bg-[#0d1418]">
          {/* WhatsApp header */}
          <div className="flex items-center gap-3 bg-wa-700 px-4 py-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-wa-500 text-sm">
              🥙
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">
                SmallBusinessAI
              </p>
              <p className="text-[10px] text-wa-400">online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-2.5 px-3 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-ink-800 px-3 py-2.5">
              <p className="text-[11px] font-semibold text-brand-300">
                🚨 2 sterren — 02:14
              </p>
              <p className="mt-1 text-[12px] leading-snug text-slate-200">
                &ldquo;Bestelling kwam 50 minuten te laat en de friet was koud.&rdquo;
              </p>
              <p className="mt-2 text-[11px] leading-snug text-slate-400">
                Antwoord staat klaar. Stuur <b className="text-white">1</b> om te
                versturen.
              </p>
              <p className="mt-1.5 text-right text-[9px] text-slate-500">02:16</p>
            </div>

            <div className="ml-auto w-fit rounded-2xl rounded-tr-md bg-wa-600 px-4 py-2">
              <p className="text-[13px] font-semibold text-white">1</p>
              <p className="mt-0.5 text-right text-[9px] text-wa-400">07:04 ✓✓</p>
            </div>

            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-ink-800 px-3 py-2.5">
              <p className="text-[12px] leading-snug text-slate-200">
                ✅ Geplaatst op Google.
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Reactietijd: 4 uur 50 min.
              </p>
              <p className="mt-1.5 text-right text-[9px] text-slate-500">07:04</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero({ dict, locale }: Props) {
  return (
    <section className="relative overflow-hidden bg-grid-fade">
      <div className="container-x grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="animate-fade-up">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-wa-500 animate-pulse-soft" />
            {dict.hero.badge}
          </span>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {dict.hero.title}{" "}
            <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
              {dict.hero.titleAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-300">
            {dict.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#pricing" className="btn-primary">
              {dict.hero.ctaPrimary}
              <Icon.arrowRight className="h-4 w-4" />
            </a>
            <Link href={`/${locale}/dashboard`} className="btn-ghost">
              {dict.hero.ctaSecondary}
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">{dict.hero.note}</p>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-700 pt-8">
            {dict.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-bold text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-slate-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Problem -- */

export function Problem({ dict }: Props) {
  return (
    <section className="border-t border-ink-800 py-20">
      <div className="container-x">
        <p className="label-eyebrow">{dict.problem.eyebrow}</p>
        <h2 className="h-section mt-3 max-w-2xl">{dict.problem.title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-400">
          {dict.problem.subtitle}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.problem.items.map((item, index) => (
            <article key={item.title} className="card p-6">
              <span className="font-display text-sm font-bold text-brand-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Day in life -- */

export function DayInLife({ dict }: Props) {
  return (
    <section className="border-t border-ink-800 bg-ink-950/60 py-20">
      <div className="container-x">
        <p className="label-eyebrow">{dict.day.eyebrow}</p>
        <h2 className="h-section mt-3 max-w-2xl">{dict.day.title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-400">
          {dict.day.subtitle}
        </p>

        <ol className="mt-12 space-y-0 border-l border-ink-700 pl-6 sm:pl-8">
          {dict.day.items.map((item) => (
            <li key={item.time} className="relative pb-9 last:pb-0">
              <span
                className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full
                           bg-brand-400 ring-4 ring-ink-900 sm:-left-[calc(2rem+5px)]"
                aria-hidden
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="font-display text-sm font-bold tabular-nums text-brand-300 sm:w-14">
                  {item.time}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Modules -- */

const moduleIcons = [Icon.star, Icon.instagram, Icon.whatsapp, Icon.chart, Icon.bell];

export function Modules({ dict }: Props) {
  return (
    <section id="modules" className="scroll-mt-20 border-t border-ink-800 py-20">
      <div className="container-x">
        <p className="label-eyebrow">{dict.modules.eyebrow}</p>
        <h2 className="h-section mt-3 max-w-2xl">{dict.modules.title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-400">
          {dict.modules.subtitle}
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {dict.modules.items.map((module, index) => {
            const IconComponent = moduleIcons[index] ?? Icon.sparkles;
            const isLast = index === dict.modules.items.length - 1;
            return (
              <article
                key={module.name}
                className={`card p-7 ${isLast ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-400/25 bg-brand-400/10 text-brand-300">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {module.name}
                    </h3>
                    <p className="mt-1 text-sm text-brand-200/80">
                      {module.tagline}
                    </p>
                  </div>
                </div>

                <ul
                  className={`mt-6 space-y-2.5 ${isLast ? "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0 sm:[&>li]:mb-2.5" : ""}`}
                >
                  {module.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-wa-500" />
                      <span className="text-sm leading-relaxed text-slate-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Sectors -- */

export function Sectors({ dict }: Props) {
  return (
    <section id="sectors" className="scroll-mt-20 border-t border-ink-800 bg-ink-950/60 py-20">
      <div className="container-x">
        <p className="label-eyebrow">{dict.sectors.eyebrow}</p>
        <h2 className="h-section mt-3 max-w-2xl">{dict.sectors.title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-400">
          {dict.sectors.subtitle}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.sectors.items.map((sector) => (
            <article
              key={sector.name}
              className="card group p-6 transition hover:border-brand-400/40"
            >
              <span className="text-3xl">{sector.icon}</span>
              <h3 className="mt-4 font-display text-base font-semibold text-white">
                {sector.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {sector.problem}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Compare -- */

export function Compare({ dict }: Props) {
  return (
    <section className="border-t border-ink-800 py-20">
      <div className="container-x">
        <p className="label-eyebrow">{dict.compare.eyebrow}</p>
        <h2 className="h-section mt-3 max-w-3xl">{dict.compare.title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-400">
          {dict.compare.subtitle}
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink-600">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-ink-850">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {dict.compare.headers.name}
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {dict.compare.headers.why}
                </th>
              </tr>
            </thead>
            <tbody>
              {dict.compare.rows.map((row) => (
                <tr key={row.name} className="border-t border-ink-700">
                  <td className="px-6 py-4 text-sm font-medium text-slate-200">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.why}</td>
                </tr>
              ))}
              <tr className="border-t border-brand-400/30 bg-brand-400/[0.07]">
                <td className="px-6 py-5 text-sm font-bold text-brand-200">
                  {dict.compare.us.name}
                </td>
                <td className="px-6 py-5 text-sm font-medium text-brand-100/90">
                  {dict.compare.us.why}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Pricing -- */

export function Pricing({ dict }: Props) {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-ink-800 bg-ink-950/60 py-20">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="label-eyebrow">{dict.pricing.eyebrow}</p>
          <h2 className="h-section mt-3">{dict.pricing.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
            {dict.pricing.subtitle}
          </p>
        </div>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {dict.pricing.plans.map((plan) => {
            const featured = Boolean(plan.badge);
            return (
              <article
                key={plan.name}
                className={`relative rounded-2xl border p-7 ${
                  featured
                    ? "border-brand-400/50 bg-ink-850 shadow-glow lg:-mt-4 lg:pb-10"
                    : "border-ink-600 bg-ink-850/60"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="mt-1.5 min-h-[2.5rem] text-sm text-slate-400">
                  {plan.desc}
                </p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500">
                    {dict.pricing.period}
                  </span>
                </p>

                <a
                  href="mailto:hallo@smallbusinessai.nl"
                  className={`mt-6 w-full ${featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-7 space-y-3 border-t border-ink-700 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-wa-500" />
                      <span className="text-sm leading-relaxed text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {dict.pricing.notes.map((note) => (
            <li key={note} className="flex items-center gap-2 text-xs text-slate-500">
              <Icon.check className="h-3.5 w-3.5 text-wa-600" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Referral -- */

export function Referral({ dict }: Props) {
  return (
    <section id="referral" className="scroll-mt-20 border-t border-ink-800 py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="label-eyebrow">{dict.referral.eyebrow}</p>
          <h2 className="h-section mt-3">{dict.referral.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
            {dict.referral.subtitle}
          </p>
          <div className="card mt-6 border-brand-400/25 bg-brand-400/[0.06] p-5">
            <p className="text-sm leading-relaxed text-brand-100/90">
              {dict.referral.body}
            </p>
          </div>
          <p className="mt-4 text-xs text-slate-500">{dict.referral.note}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-ink-600">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-ink-850">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {dict.referral.headers.tier}
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {dict.referral.headers.refs}
                </th>
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {dict.referral.headers.rate}
                </th>
              </tr>
            </thead>
            <tbody>
              {referralTiers.map((tier) => (
                <tr key={tier.key} className="border-t border-ink-700">
                  <td className="px-5 py-4 text-sm font-medium text-slate-200">
                    <span className="mr-2" aria-hidden>
                      {tier.icon}
                    </span>
                    {dict.referral.tiers[tier.key as keyof typeof dict.referral.tiers]}
                  </td>
                  <td className="px-5 py-4 text-sm tabular-nums text-slate-400">
                    {tier.range}
                  </td>
                  <td className="px-5 py-4 text-right font-display text-sm font-bold tabular-nums text-brand-300">
                    {tier.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- FAQ -- */

export function Faq({ dict }: Props) {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-ink-800 bg-ink-950/60 py-20">
      <div className="container-x max-w-3xl">
        <p className="label-eyebrow">{dict.faq.eyebrow}</p>
        <h2 className="h-section mt-3">{dict.faq.title}</h2>

        <div className="mt-10 divide-y divide-ink-700 border-y border-ink-700">
          {dict.faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-display text-[15px] font-semibold text-white">
                  {item.q}
                </span>
                <Icon.chevronDown className="h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Final CTA -- */

export function FinalCta({ dict, locale }: Props) {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid-fade"
        aria-hidden
      />
      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {dict.final.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400">
          {dict.final.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="mailto:hallo@smallbusinessai.nl" className="btn-primary">
            {dict.final.cta}
            <Icon.arrowRight className="h-4 w-4" />
          </a>
          <Link href={`/${locale}/dashboard`} className="btn-ghost">
            {dict.nav.dashboard}
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">{dict.final.note}</p>
      </div>
    </section>
  );
}
