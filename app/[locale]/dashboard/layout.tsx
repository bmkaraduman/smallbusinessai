import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Sidebar, type NavItem } from "@/components/dashboard/sidebar";
import { LangSwitcher } from "@/components/lang-switcher";
import { Icon } from "@/components/icons";
import { business, reviews } from "@/lib/mock-data";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const base = `/${params.locale}/dashboard`;
  const pending = reviews.filter((review) => review.status === "pending").length;

  const items: NavItem[] = [
    { href: base, label: dict.dash.nav.overview, icon: "home" },
    { href: `${base}/reviews`, label: dict.dash.nav.reviews, icon: "star", badge: pending },
    { href: `${base}/social`, label: dict.dash.nav.social, icon: "instagram" },
    { href: `${base}/whatsapp`, label: dict.dash.nav.whatsapp, icon: "whatsapp" },
    { href: `${base}/reports`, label: dict.dash.nav.reports, icon: "chart" },
  ];

  return (
    <div className="lg:flex">
      <Sidebar
        items={items}
        backHref={`/${params.locale}`}
        backLabel={dict.dash.nav.backToSite}
        business={business}
      />

      <div className="min-w-0 flex-1 lg:h-screen lg:overflow-y-auto scroll-thin">
        {/* Demo notice — makes clear the integrations are simulated. */}
        <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/[0.07] px-5 py-2.5 text-xs text-amber-200/90">
          <Icon.alert className="h-4 w-4 shrink-0" />
          <span>{dict.dash.demoBanner}</span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-ink-700 px-5 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">
              <Icon.google className="h-3.5 w-3.5" />
              Google · {dict.dash.common.connected}
            </span>
            <span className="chip">
              <Icon.whatsapp className="h-3.5 w-3.5 text-wa-500" />
              WhatsApp · {dict.dash.common.connected}
            </span>
            <span className="chip hidden sm:inline-flex">
              <Icon.instagram className="h-3.5 w-3.5 text-pink-400" />
              Instagram · {dict.dash.common.connected}
            </span>
          </div>
          <LangSwitcher current={params.locale} />
        </div>

        <main className="p-5 sm:p-7">{children}</main>
      </div>
    </div>
  );
}
