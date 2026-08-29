"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";
import ProjectPanel from "@/components/ProjectPanel";
import ProjectConstellation from "@/components/ProjectConstellation";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { cn } from "@/lib/utils";

export default function Work() {
  const [view, setView] = useState<"list" | "constellation">("list");
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <SectionHeading index="03" title="SELECTED WORK" />
        <div className="mb-12 flex items-center gap-1 rounded-full border border-border p-1 md:mb-16">
          {(["list", "constellation"] as const).map((v) => (
            <button
              key={v}
              data-cursor="hover"
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.15em] transition-colors",
                view === v ? "bg-accent-dim text-accent" : "text-fg-dim hover:text-fg-muted"
              )}
            >
              {v === "list" ? "CASE STUDIES" : "CONSTELLATION"}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div>
          {projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>
      ) : (
        <ProjectConstellation onSelectProject={setOpenId} />
      )}

      <ProjectCaseStudy
        project={openProject}
        onOpenChange={(open) => !open && setOpenId(null)}
      />
    </section>
  );
}
