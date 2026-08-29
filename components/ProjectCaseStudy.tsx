"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, ExternalLink } from "lucide-react";
import { GithubMark } from "@/components/icons";
import type { Project } from "@/data/projects";

const FIELDS: { key: keyof Project["caseStudy"]; label: string }[] = [
  { key: "problem", label: "THE PROBLEM" },
  { key: "idea", label: "THE IDEA" },
  { key: "role", label: "MY ROLE" },
  { key: "architecture", label: "THE ARCHITECTURE" },
  { key: "technology", label: "THE TECHNOLOGY" },
  { key: "hardPart", label: "THE HARD PART" },
  { key: "result", label: "THE RESULT" },
];

export default function ProjectCaseStudy({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={!!project} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[95] bg-bg/95 backdrop-blur-md" />
        <Dialog.Content
          className="fixed inset-0 z-[96] overflow-y-auto focus:outline-none"
          aria-describedby={undefined}
        >
          {project && (
            <div className="mx-auto min-h-full max-w-4xl px-5 py-20 sm:px-8 md:py-28">
              <Dialog.Close
                data-cursor="hover"
                className="fixed top-5 right-5 z-[97] flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-fg-muted transition-colors hover:border-accent hover:text-accent sm:top-8 sm:right-8"
                aria-label="Close case study"
              >
                <X size={16} />
              </Dialog.Close>

              <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                {project.category.toUpperCase()}
              </span>
              <Dialog.Title asChild>
                <h2 className="mt-3 font-display text-4xl leading-[0.95] font-medium text-fg sm:text-6xl">
                  {project.title}
                </h2>
              </Dialog.Title>
              <p className="mt-5 max-w-xl text-lg text-fg-muted">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.metrics?.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-full border border-accent/40 bg-accent-dim px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-accent"
                  >
                    {m.value} — {m.label.toUpperCase()}
                  </span>
                ))}
                {(project.github || project.live) && (
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        data-cursor="external"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-muted hover:text-fg"
                      >
                        <GithubMark size={12} /> REPO
                      </a>
                    )}
                    {project.live && (
                      <a
                        data-cursor="external"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-muted hover:text-fg"
                      >
                        <ExternalLink size={12} /> LIVE
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2">
                {FIELDS.map(({ key, label }) => (
                  <div key={key}>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-fg-dim">
                      {label}
                    </span>
                    <p className="mt-3 leading-relaxed text-fg-muted">
                      {project.caseStudy[key]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 border-t border-border pt-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-fg-dim">
                  STACK
                </span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
