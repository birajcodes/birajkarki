"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { skillSystems } from "@/data/skills";

export default function Skills() {
  const [open, setOpen] = useState<string | null>(skillSystems[0].id);

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-32">
      <SectionHeading
        index="—"
        title="ENGINEERING STACK"
        description="Grouped by system, not alphabet."
      />

      <div className="divide-y divide-border border-t border-b border-border">
        {skillSystems.map((system) => {
          const isOpen = open === system.id;
          return (
            <div key={system.id}>
              <button
                data-cursor="hover"
                onClick={() => setOpen(isOpen ? null : system.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-display text-2xl text-fg sm:text-3xl">
                    {system.label}
                  </span>
                  <span className="hidden font-mono text-xs text-fg-dim sm:inline">
                    {system.description}
                  </span>
                </div>
                <Plus
                  size={18}
                  className={`shrink-0 text-fg-dim transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-accent" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pb-6">
                      {system.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border-strong px-4 py-1.5 font-mono text-xs tracking-[0.05em] text-fg-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
