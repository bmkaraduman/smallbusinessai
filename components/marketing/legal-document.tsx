import type { LegalDoc } from "@/lib/dictionary-types";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <article className="container-x max-w-3xl py-16">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {doc.title}
      </h1>
      <p className="mt-3 text-xs uppercase tracking-widest text-slate-500">
        {doc.updated}
      </p>
      <p className="mt-6 text-[15px] leading-relaxed text-slate-300">{doc.intro}</p>

      <div className="prose-legal mt-4">
        {doc.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className="mt-2">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
