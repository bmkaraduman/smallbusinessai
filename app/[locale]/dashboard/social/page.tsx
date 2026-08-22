import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Icon } from "@/components/icons";
import { PageHeading } from "@/components/dashboard/ui";
import { business, socialPosts } from "@/lib/mock-data";

export default async function SocialPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.dash.social;

  const triggerIcon = {
    weather: Icon.cloudRain,
    event: Icon.calendar,
    menu: Icon.tag,
  } as const;

  const statusStyle = {
    draft: "bg-ink-700 text-slate-300",
    scheduled: "bg-brand-400/15 text-brand-300",
    published: "bg-wa-500/15 text-wa-400",
  } as const;

  return (
    <>
      <PageHeading title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {socialPosts.map((post) => {
          const TriggerIcon = triggerIcon[post.trigger as keyof typeof triggerIcon];
          const PlatformIcon =
            post.platform === "instagram" ? Icon.instagram : Icon.facebook;

          return (
            <article key={post.id} className="card flex flex-col overflow-hidden">
              {/* Faux media area — a real post would render the uploaded image. */}
              <div className="relative grid h-36 place-items-center bg-gradient-to-br from-brand-500/25 via-ink-800 to-ink-850">
                <span className="text-4xl">🥙</span>
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[post.status]}`}
                >
                  {t.status[post.status]}
                </span>
                <PlatformIcon
                  className={`absolute left-3 top-3 h-4 w-4 ${
                    post.platform === "instagram" ? "text-pink-400" : "text-blue-400"
                  }`}
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <TriggerIcon className="h-3.5 w-3.5" />
                  {t.triggers[post.trigger as keyof typeof t.triggers]}
                </span>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-200">
                  {post.caption}
                </p>

                <p className="mt-2 text-xs text-brand-300/80">
                  {post.hashtags.join(" ")}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-ink-700 pt-3 text-xs text-slate-500">
                  <span>{post.scheduledFor}</span>
                  {post.status === "published" ? (
                    <span>
                      {post.likes} {t.likes} · {post.reach?.toLocaleString("nl-NL")}{" "}
                      {t.reach}
                    </span>
                  ) : (
                    <span className="text-slate-600">@{business.name.toLowerCase().replace(/\s+/g, "")}</span>
                  )}
                </div>

                {post.status === "draft" && (
                  <button type="button" className="btn-wa mt-3 !py-2 text-xs">
                    <Icon.send className="h-3.5 w-3.5" />
                    {dict.dash.common.approve}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
