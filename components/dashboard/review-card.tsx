"use client";

import { useState } from "react";
import { Icon } from "../icons";
import { Avatar, Stars } from "./ui";
import type { Review } from "@/lib/mock-data";
import type { Dictionary } from "@/lib/dictionary-types";

export function ReviewCard({
  review,
  dict,
}: {
  review: Review;
  dict: Dictionary;
}) {
  const t = dict.dash.common;
  const [status, setStatus] = useState(review.status);
  const [draft, setDraft] = useState(review.draft);
  const [editing, setEditing] = useState(false);
  const [sentAt, setSentAt] = useState<string | null>(
    review.publishedAt ?? null,
  );

  function publish() {
    setStatus("published");
    setEditing(false);
    // In production this is a POST to the Google Business Profile API.
    const now = new Date();
    setSentAt(
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    );
  }

  const published = status === "published";

  return (
    <article
      className={`card overflow-hidden ${
        review.urgent && !published ? "border-red-500/35" : ""
      }`}
    >
      {review.urgent && !published && (
        <div className="flex items-center gap-2 border-b border-red-500/20 bg-red-500/10 px-5 py-2 text-xs font-medium text-red-300">
          <Icon.alert className="h-3.5 w-3.5" />
          {t.urgent}
        </div>
      )}

      <div className="p-5">
        <header className="flex items-start gap-3">
          <Avatar initials={review.initials} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-display text-sm font-semibold text-white">
                {review.author}
              </p>
              <Stars rating={review.rating} />
              <span className="text-xs text-slate-500">{review.receivedAt}</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
              {review.text}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              published
                ? "bg-wa-500/15 text-wa-400"
                : status === "approved"
                  ? "bg-brand-400/15 text-brand-300"
                  : "bg-ink-700 text-slate-400"
            }`}
          >
            {published ? t.published : status === "approved" ? t.approved : t.pending}
          </span>
        </header>

        <div className="mt-4 rounded-xl border border-ink-600 bg-ink-900/70 p-4">
          <div className="mb-2.5 flex items-center gap-2">
            <Icon.sparkles className="h-3.5 w-3.5 text-brand-300" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-300">
              {t.aiDraft}
            </span>
          </div>

          {editing ? (
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={5}
              className="w-full resize-y rounded-lg border border-ink-600 bg-ink-950 p-3 text-sm
                         leading-relaxed text-slate-200 outline-none focus:border-brand-400"
            />
          ) : (
            <p className="text-sm leading-relaxed text-slate-300">{draft}</p>
          )}

          {published ? (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-wa-400">
              <Icon.check className="h-3.5 w-3.5" />
              {dict.dash.reviews.publishedLabel} {sentAt}
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={publish} className="btn-wa !px-4 !py-2 text-xs">
                <Icon.send className="h-3.5 w-3.5" />
                {t.approve}
              </button>
              <button
                type="button"
                onClick={() => setEditing((v) => !v)}
                className="btn-ghost !px-4 !py-2 text-xs"
              >
                {editing ? t.approved : t.edit}
              </button>
              <button
                type="button"
                onClick={() => setDraft(review.draft)}
                className="btn-ghost !px-4 !py-2 text-xs"
              >
                <Icon.sparkles className="h-3.5 w-3.5" />
                {t.regenerate}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
