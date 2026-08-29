"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { experience, leadership } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const [active, setActive] = useState(0);
  const current = experience[active];

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40"
    >
      <SectionHeading
        index="02"
        title="EXPERIENCE"
        description="Focused on impact, not job descriptions."
      />

      <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
        <ol className="relative border-l border-border pl-6">
          {experience.map((entry, i) => (
            <li key={entry.id} className="relative mb-2 last:mb-0">
              <span
                className={`absolute top-3 -left-[27px] h-2.5 w-2.5 rounded-full border transition-colors ${
                  active === i
                    ? "border-accent bg-accent"
                    : "border-border-strong bg-bg"
                }`}
                aria-hidden="true"
              />
              <button
                data-cursor="hover"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className="w-full py-3 text-left"
              >
                <div className="font-mono text-[10px] tracking-[0.15em] text-fg-dim">
                  {entry.period}
                </div>
                <div
                  className={`mt-1 font-display text-xl transition-colors sm:text-2xl ${
                    active === i ? "text-fg" : "text-fg-dim"
                  }`}
                >
                  {entry.company}
                </div>
                <div className="mt-0.5 text-sm text-fg-muted">{entry.role}</div>
              </button>
            </li>
          ))}
        </ol>

        <div className="border border-border bg-bg-elevated/40 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.15em] text-fg-dim">
                <span>{current.location}</span>
                <span>{current.period}</span>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-fg-muted">
                {current.summary}
              </p>

              {current.impact.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {current.impact.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-fg">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {current.stack.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {current.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.15em] text-accent">
            BEYOND THE ROLE
          </span>
          <p className="mt-2 max-w-lg text-fg-muted">
            {leadership.role}, {leadership.organization} — {leadership.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
