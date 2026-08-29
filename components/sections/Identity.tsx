"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/data/site";
import SectionHeading from "@/components/SectionHeading";
import SystemStatus from "@/components/SystemStatus";

export default function Identity() {
  const [active, setActive] = useState(0);
  const trait = site.identity.traits[active];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40"
    >
      <SectionHeading index="01" title="IDENTITY" />

      <p className="max-w-3xl text-balance font-display text-3xl leading-[1.15] font-medium text-fg sm:text-4xl md:text-5xl">
        {site.identity.statement}
      </p>

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
        <div className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
          {site.identity.traits.map((t, i) => (
            <button
              key={t.label}
              data-cursor="hover"
              onClick={() => setActive(i)}
              className="group flex items-center gap-4 border-b border-border py-3 text-left md:border-b-0 md:border-t md:first:border-t-0"
              aria-pressed={active === i}
            >
              <span
                className={`font-mono text-[10px] tracking-[0.15em] ${
                  active === i ? "text-accent" : "text-fg-dim"
                }`}
              >
                0{i + 1}
              </span>
              <span
                className={`font-display text-xl transition-colors sm:text-2xl ${
                  active === i ? "text-fg" : "text-fg-dim group-hover:text-fg-muted"
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative min-h-40 border border-border bg-bg-elevated/40 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={trait.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                {trait.label}
              </span>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-muted">
                {trait.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <SystemStatus />
      </div>
    </section>
  );
}
