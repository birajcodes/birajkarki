"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import QuantumCircuit from "@/components/QuantumCircuit";
import { quantum, mlProgression, credentials } from "@/data/experiments";

export default function Lab() {
  const [step, setStep] = useState(0);
  const active = mlProgression[step];

  return (
    <section id="lab" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        index="04"
        title="THE LAB"
        description="Areas I'm exploring — not a claim to be a researcher."
      />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
            {quantum.headline.toUpperCase()} — {quantum.status.toUpperCase()}
          </span>
          <p className="mt-4 max-w-lg text-fg-muted">{quantum.framing}</p>
          <p className="mt-3 font-mono text-xs text-fg-dim">{quantum.highlight}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {quantum.concepts.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-muted"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <QuantumCircuit />
          </div>
        </div>

        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-dim">
            WHAT I&apos;M EXPLORING
          </span>

          <div className="relative mt-6 flex flex-col">
            {mlProgression.map((item, i) => (
              <button
                key={item.step}
                data-cursor="hover"
                onClick={() => setStep(i)}
                className="group flex items-center gap-4 border-l py-3 pl-5 text-left transition-colors"
                style={{
                  borderColor: i === step ? "var(--color-accent)" : "var(--color-border)",
                }}
              >
                <span
                  className="font-mono text-[10px]"
                  style={{ color: i === step ? "var(--color-accent)" : "var(--color-fg-dim)" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="font-display text-lg sm:text-xl"
                  style={{ color: i === step ? "var(--color-fg)" : "var(--color-fg-dim)" }}
                >
                  {item.step}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-16 border border-border bg-bg-elevated/40 p-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={active.step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm leading-relaxed text-fg-muted"
              >
                {active.detail}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-10 overflow-hidden border-t border-border pt-6">
            <span className="mb-4 block font-mono text-[10px] tracking-[0.2em] text-fg-dim">
              CREDENTIALS
            </span>
            <div className="no-scrollbar relative overflow-hidden">
              <div className="flex w-max animate-marquee gap-8 font-mono text-xs whitespace-nowrap text-fg-dim">
                {[...credentials, ...credentials].map((c, i) => (
                  <span key={i} className="flex items-center gap-8">
                    {c}
                    <span className="text-accent">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
