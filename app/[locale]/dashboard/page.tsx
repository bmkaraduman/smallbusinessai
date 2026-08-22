import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Icon } from "@/components/icons";
import {
  Avatar,
  OrdersChart,
  PageHeading,
  Panel,
  Sparkline,
  StatTile,
  Stars,
} from "@/components/dashboard/ui";
import {
  business,
  ordersByDay,
  overviewStats,
  ratingTrend,
  reviews,
  whatsappThread,
} from "@/lib/mock-data";

export default async function OverviewPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.dash.overview;
  const base = `/${params.locale}/dashboard`;

  const needsAttention = reviews.filter((review) => review.status === "pending");
  const activity = whatsappThread
    .filter((message) => message.from === "system")
    .slice(0, 5);

  return (
    <>
      <PageHeading
        title={`${t.title}, ${business.name.split(" ")[0]} 👋`}
        subtitle={t.subtitle}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label={t.stats.rating}
          value={overviewStats.rating.value}
          delta={overviewStats.rating.delta}
          trend="up"
        />
        <StatTile
          label={t.stats.pending}
          value={overviewStats.pendingReviews.value}
          delta={overviewStats.pendingReviews.delta}
          trend="down"
        />
        <StatTile
          label={t.stats.response}
          value={overviewStats.responseTime.value}
          delta={overviewStats.responseTime.delta}
          trend="down"
        />
        <StatTile
          label={t.stats.saved}
          value={overviewStats.commissionSaved.value}
          delta={overviewStats.commissionSaved.delta}
          trend="up"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title={t.trendTitle} subtitle={t.trendSub}>
          <Sparkline data={ratingTrend} />
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-white">
              {business.rating.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-xs text-slate-500">
              {business.reviewCount} reviews
            </span>
          </div>
        </Panel>

        <Panel
          title={t.ordersTitle}
          subtitle={t.ordersSub}
          className="lg:col-span-2"
        >
          <OrdersChart
            data={ordersByDay}
            directLabel={t.ordersDirect}
            platformLabel={t.ordersPlatform}
          />
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel
          title={t.urgentTitle}
          action={
            <Link
              href={`${base}/reviews`}
              className="text-xs font-medium text-brand-300 hover:text-brand-200"
            >
              {dict.dash.common.viewAll}
            </Link>
          }
        >
          <ul className="space-y-3">
            {needsAttention.map((review) => (
              <li
                key={review.id}
                className="flex items-start gap-3 rounded-xl border border-ink-700 bg-ink-900/60 p-3.5"
              >
                <Avatar initials={review.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-white">
                      {review.author}
                    </p>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {review.text}
                  </p>
                </div>
                {review.urgent && (
                  <Icon.alert className="h-4 w-4 shrink-0 text-red-400" />
                )}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t.activityTitle}>
          <ul className="space-y-3">
            {activity.map((message) => (
              <li key={message.id} className="flex gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-700 text-slate-400">
                  {message.kind === "alert" ? (
                    <Icon.alert className="h-3.5 w-3.5" />
                  ) : message.kind === "report" ? (
                    <Icon.chart className="h-3.5 w-3.5" />
                  ) : message.kind === "campaign" ? (
                    <Icon.cloudRain className="h-3.5 w-3.5" />
                  ) : (
                    <Icon.bell className="h-3.5 w-3.5" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-200">
                    {message.title ?? message.body.split("\n")[0]}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{message.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
