import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Avatar, PageHeading, Panel } from "@/components/dashboard/ui";
import { customers, weeklyReport } from "@/lib/mock-data";

const SEGMENT_STYLE: Record<string, string> = {
  loyal: "bg-wa-500/15 text-wa-400",
  at_risk: "bg-red-500/15 text-red-300",
  new: "bg-sky-500/15 text-sky-300",
  birthday: "bg-brand-400/15 text-brand-300",
};

export default async function ReportsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.dash.reports;

  return (
    <>
      <PageHeading
        title={t.title}
        subtitle={t.subtitle}
        right={
          <span className="chip">
            {t.week} {weeklyReport.week} · {weeklyReport.period}
          </span>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {weeklyReport.highlights.map((item) => (
          <div key={item.label} className="card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {item.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold tabular-nums text-white">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title={t.channelsTitle}>
          <ul className="space-y-4">
            {weeklyReport.channels.map((channel) => (
              <li key={channel.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-slate-200">
                    {channel.name}
                  </span>
                  <span className="text-xs tabular-nums text-slate-500">
                    {channel.pct}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-brand-400"
                    style={{ width: `${channel.pct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">{channel.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t.customersTitle} className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr>
                  {[
                    t.tableHeaders.customer,
                    t.tableHeaders.orders,
                    t.tableHeaders.last,
                    t.tableHeaders.value,
                    t.tableHeaders.segment,
                  ].map((header) => (
                    <th
                      key={header}
                      className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-ink-700">
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2.5">
                        <Avatar initials={customer.initials} />
                        <span className="text-sm font-medium text-slate-200">
                          {customer.name}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-sm tabular-nums text-slate-400">
                      {customer.orders}
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-400">
                      {customer.lastOrder} {t.ago}
                    </td>
                    <td className="py-3 pr-4 text-sm tabular-nums text-slate-300">
                      {customer.value}
                    </td>
                    <td className="py-3">
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${SEGMENT_STYLE[customer.segment]}`}
                      >
                        {t.segments[customer.segment]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
