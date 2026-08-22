"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import { PageHeading } from "./ui";
import type { WhatsAppMessage } from "@/lib/mock-data";
import type { Dictionary } from "@/lib/dictionary-types";

const KIND_STYLE: Record<string, string> = {
  alert: "text-red-300",
  reminder: "text-amber-300",
  campaign: "text-sky-300",
  report: "text-wa-400",
};

/** Renders *bold* segments the way WhatsApp does. */
function formatBody(text: string) {
  return text.split("\n").map((line, lineIndex) => (
    <span key={lineIndex} className="block">
      {line.split(/(\*[^*]+\*)/g).map((part, partIndex) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <b key={partIndex} className="font-semibold text-white">
            {part.slice(1, -1)}
          </b>
        ) : (
          <span key={partIndex}>{part}</span>
        ),
      )}
    </span>
  ));
}

export function WhatsAppSim({
  thread,
  dict,
}: {
  thread: WhatsAppMessage[];
  dict: Dictionary;
}) {
  const t = dict.dash.whatsapp;
  const [visible, setVisible] = useState(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [visible]);

  /** Reveal messages until the next one that asks the owner for input. */
  function advance() {
    setVisible((previous) => {
      let next = previous;
      do {
        next++;
      } while (
        next < thread.length &&
        !(thread[next - 1].from === "system" && thread[next - 1].actions)
      );
      return Math.min(next, thread.length);
    });
  }

  const shown = thread.slice(0, visible);
  const last = shown[shown.length - 1];
  const waitingForReply =
    last?.from === "system" && last.actions && visible < thread.length;

  const legend = [
    { key: "alert", label: t.legend.alert },
    { key: "reminder", label: t.legend.reminder },
    { key: "campaign", label: t.legend.campaign },
    { key: "report", label: t.legend.report },
  ];

  return (
    <>
      <PageHeading title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Phone */}
        <div className="mx-auto w-full max-w-[380px]">
          <div className="rounded-[2.4rem] border border-ink-600 bg-ink-950 p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[1.9rem] bg-[#0d1418]">
              <div className="flex items-center gap-3 bg-wa-700 px-4 py-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-wa-500 text-base">
                  🥙
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    SmallBusinessAI
                  </p>
                  <p className="text-[11px] text-wa-400">online</p>
                </div>
                <Icon.whatsapp className="h-5 w-5 text-wa-400" />
              </div>

              <div className="scroll-thin h-[460px] space-y-3 overflow-y-auto px-3 py-4">
                {shown.map((message) =>
                  message.from === "owner" ? (
                    <div key={message.id} className="ml-auto w-fit max-w-[80%]">
                      <div className="rounded-2xl rounded-tr-md bg-wa-600 px-4 py-2.5">
                        <p className="text-sm font-medium text-white">
                          {message.body}
                        </p>
                        <p className="mt-0.5 text-right text-[10px] text-wa-400">
                          {message.time} ✓✓
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="max-w-[88%]">
                      <div className="rounded-2xl rounded-tl-md bg-ink-800 px-3.5 py-2.5">
                        {message.title && (
                          <p
                            className={`text-xs font-bold ${KIND_STYLE[message.kind] ?? "text-slate-300"}`}
                          >
                            {message.title}
                          </p>
                        )}
                        <div className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-slate-200">
                          {formatBody(message.body)}
                        </div>
                        <p className="mt-1 text-right text-[10px] text-slate-500">
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ),
                )}
                <div ref={endRef} />
              </div>

              {/* Composer */}
              <div className="border-t border-ink-800 bg-ink-900 p-3">
                {waitingForReply ? (
                  <div className="flex flex-wrap gap-2">
                    {last.actions?.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={advance}
                        className="rounded-full border border-wa-500/40 bg-wa-500/10 px-4 py-2
                                   text-sm font-semibold text-wa-400 transition hover:bg-wa-500/20"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-850 px-4 py-2.5">
                    <span className="flex-1 text-sm text-slate-600">
                      {t.replyPlaceholder}
                    </span>
                    <Icon.send className="h-4 w-4 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-slate-500">{t.hint}</p>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          <section className="card p-5">
            <h2 className="font-display text-sm font-semibold text-white">
              {t.legendTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {legend.map((entry) => (
                <li key={entry.key} className="flex items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-800 ${KIND_STYLE[entry.key]}`}
                  >
                    {entry.key === "alert" ? (
                      <Icon.alert className="h-4 w-4" />
                    ) : entry.key === "reminder" ? (
                      <Icon.bell className="h-4 w-4" />
                    ) : entry.key === "campaign" ? (
                      <Icon.cloudRain className="h-4 w-4" />
                    ) : (
                      <Icon.chart className="h-4 w-4" />
                    )}
                  </span>
                  <span className="text-sm text-slate-300">{entry.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-sm font-semibold text-white">
              WhatsApp Business Cloud API
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="flex gap-2.5">
                <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-wa-500" />
                Template messages voor notificaties buiten het 24-uursvenster
              </li>
              <li className="flex gap-2.5">
                <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-wa-500" />
                Webhook ontvangt het antwoord van de ondernemer
              </li>
              <li className="flex gap-2.5">
                <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-wa-500" />
                BullMQ-jobs voor 10:00-herinnering en maandagrapport
              </li>
              <li className="flex gap-2.5">
                <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-wa-500" />
                Antwoord &ldquo;1&rdquo; triggert de Google Business Profile API
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
