"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

export default function ProjectPanel({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      data-cursor="project"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full overflow-hidden border-t border-border py-10 text-left transition-colors last:border-b hover:bg-bg-elevated/40 md:py-14"
    >
      <div className="flex flex-col gap-6 px-1 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex items-start gap-4 md:gap-8">
          <span className="pt-2 font-mono text-[11px] tracking-[0.1em] text-fg-dim">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div>
            {project.featured && (
              <span className="mb-2 inline-block font-mono text-[10px] tracking-[0.2em] text-accent">
                HERO PROJECT
              </span>
            )}
            <h3
              className={`font-display text-4xl leading-[0.95] font-medium transition-colors sm:text-5xl md:text-6xl ${
                hovered ? "text-accent" : "text-fg"
              }`}
            >
              {project.title}
            </h3>
            <p className="mt-3 max-w-md text-sm text-fg-muted sm:text-base">
              {project.oneLiner}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 pl-14 md:pl-0">
          <div className="hidden flex-wrap justify-end gap-2 md:flex md:max-w-[240px]">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-dim"
              >
                {tech}
              </span>
            ))}
          </div>
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] tracking-[0.1em] transition-all ${
              hovered
                ? "border-accent bg-accent-dim text-accent rotate-45"
                : "border-border-strong text-fg-dim"
            }`}
            aria-hidden="true"
          >
            {hovered ? "→" : "↗"}
          </span>
        </div>
      </div>
    </button>
  );
}
