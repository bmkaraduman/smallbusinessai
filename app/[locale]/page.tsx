import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import {
  Compare,
  DayInLife,
  Faq,
  FinalCta,
  Hero,
  Modules,
  Pricing,
  Problem,
  Referral,
  Sectors,
} from "@/components/marketing/sections";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const props = { dict, locale: params.locale };

  return (
    <>
      <SiteHeader {...props} />
      <main>
        <Hero {...props} />
        <Problem {...props} />
        <DayInLife {...props} />
        <Modules {...props} />
        <Sectors {...props} />
        <Compare {...props} />
        <Pricing {...props} />
        <Referral {...props} />
        <Faq {...props} />
        <FinalCta {...props} />
      </main>
      <SiteFooter {...props} />
    </>
  );
}
