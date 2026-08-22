import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { ReviewsBoard } from "@/components/dashboard/reviews-board";
import { reviews } from "@/lib/mock-data";

export default async function ReviewsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return <ReviewsBoard reviews={reviews} dict={dict} />;
}
