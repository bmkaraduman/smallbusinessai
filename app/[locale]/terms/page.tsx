import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { LegalDocument } from "@/components/marketing/legal-document";

export default async function TermsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return (
    <>
      <SiteHeader dict={dict} locale={params.locale} />
      <main>
        <LegalDocument doc={dict.legal.terms} />
      </main>
      <SiteFooter dict={dict} locale={params.locale} />
    </>
  );
}
