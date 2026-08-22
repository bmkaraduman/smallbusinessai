"use client";

import { useState } from "react";
import { ReviewCard } from "./review-card";
import { PageHeading } from "./ui";
import type { Review } from "@/lib/mock-data";
import type { Dictionary } from "@/lib/dictionary-types";

type Filter = "all" | "pending" | "published";

export function ReviewsBoard({
  reviews,
  dict,
}: {
  reviews: Review[];
  dict: Dictionary;
}) {
  const t = dict.dash.reviews;
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = reviews.filter((review) => {
    if (filter === "all") return true;
    if (filter === "pending") return review.status !== "published";
    return review.status === "published";
  });

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.filters.all },
    { key: "pending", label: t.filters.pending },
    { key: "published", label: t.filters.published },
  ];

  return (
    <>
      <PageHeading
        title={t.title}
        subtitle={t.subtitle}
        right={
          <div className="flex gap-1 rounded-xl border border-ink-600 bg-ink-850 p-1">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  filter === item.key
                    ? "bg-brand-400 text-ink-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        }
      />

      {filtered.length === 0 ? (
        <p className="card p-8 text-center text-sm text-slate-500">{t.empty}</p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} dict={dict} />
          ))}
        </div>
      )}
    </>
  );
}
