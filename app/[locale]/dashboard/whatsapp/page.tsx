import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { WhatsAppSim } from "@/components/dashboard/whatsapp-sim";
import { whatsappThread } from "@/lib/mock-data";

export default async function WhatsAppPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return <WhatsAppSim thread={whatsappThread} dict={dict} />;
}
