"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubMark } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";
import { useGithubStats } from "@/hooks/useGithubStats";

const ARTIFACTS = [
  {
    label: "Custom NPM Package",
    detail: "Integration layer for the biometric system, published for reuse across internal projects.",
    tags: ["JavaScript", "NPM"],
  },
  {
    label: "Go-Based Internal Tooling",
    detail: "Internal tooling built in Go while at Velox Labs.",
    tags: ["Go"],
  },
  {
    label: "IBM Quantum Challenge 2024",
    detail: "Completed — hands-on with Qiskit 1.0, VQE, and scaling a VQC to 50+ qubits.",
    tags: ["Qiskit", "Python"],
  },
];

export default function Building() {
  const stats = useGithubStats(site.links.github);

  return (
    <section id="building" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-32">
      <SectionHeading index="05" title="BUILDING IN PUBLIC" />

      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <p className="max-w-lg text-fg-muted">
          Most of what I build lives inside client and company codebases —
          but the pieces I can share, I do: internal tools, integration
          packages, and what I&apos;m learning along the way.
        </p>

        <a
          data-cursor="external"
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
        >
          <GithubMark size={14} />
          GITHUB
          {stats && (
            <span className="text-fg-dim">
              {stats.publicRepos} REPOS · {stats.followers} FOLLOWERS
            </span>
          )}
          <ArrowUpRight size={12} />
        </a>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
        {ARTIFACTS.map((item) => (
          <div key={item.label} className="bg-bg p-6">
            <span className="font-display text-lg text-fg">{item.label}</span>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-fg-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
