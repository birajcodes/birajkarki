"use client";

import { useEffect, useRef, useState } from "react";
import { Workflow, Container, Droplet, Server, Boxes, Globe } from "lucide-react";
import { GithubMark } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const PIPELINE = [
  { label: "GITHUB", detail: "Source of truth — push to main.", icon: GithubMark },
  { label: "GITHUB ACTIONS", detail: "Lint, typecheck, build, then image build.", icon: Workflow },
  { label: "CONTAINER", detail: "Multi-stage Docker image, pushed to GHCR.", icon: Container },
  { label: "DIGITALOCEAN", detail: "A single droplet — no orchestrator.", icon: Droplet },
  { label: "NGINX", detail: "Reverse proxy, HTTPS, the only public entry point.", icon: Server },
  { label: "NEXT.JS", detail: "The app itself, running as a non-root container.", icon: Boxes },
  { label: "BIRAJKARKI.COM", detail: "Health-checked before it ever gets traffic.", icon: Globe },
];

export default function System() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.5;
      const raw = total > 0 ? (window.innerHeight * 0.8 - rect.top) / total : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.floor(progress * (PIPELINE.length - 1) + 0.001);

  return (
    <section
      ref={sectionRef}
      id="system"
      className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-32"
    >
      <SectionHeading
        index="—"
        title="THE SYSTEM"
        description="How this page itself reaches the internet."
      />

      <p className="max-w-lg text-fg-muted">
        Not a diagram for the sake of one — this is the actual pipeline
        this portfolio deploys through. One app, one container, one
        droplet, nothing more than it needs.
      </p>

      <div className="relative mt-16 flex flex-col gap-0 lg:mt-20 lg:flex-row lg:items-start lg:justify-between lg:gap-2">
        {/* Mobile: vertical progress rail */}
        <div
          className="absolute top-0 bottom-0 left-[19px] w-px bg-border lg:hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-0 w-px bg-accent transition-[height] duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        {/* Desktop: horizontal progress rail */}
        <div
          className="absolute top-[19px] right-0 left-0 hidden h-px bg-border lg:block"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-0 h-px bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {PIPELINE.map((node, i) => {
          const active = i <= activeIndex;
          return (
            <div
              key={node.label}
              className="relative flex items-start gap-4 py-5 lg:flex-1 lg:flex-col lg:items-center lg:py-0 lg:text-center"
            >
              <span
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-bg transition-colors duration-300",
                  active
                    ? "border-accent text-accent"
                    : "border-border-strong text-fg-dim"
                )}
              >
                <node.icon size={16} />
              </span>
              <div className="lg:mt-4 lg:max-w-[130px]">
                <div
                  className={cn(
                    "font-mono text-[10px] tracking-[0.12em] transition-colors duration-300",
                    active ? "text-fg" : "text-fg-dim"
                  )}
                >
                  {node.label}
                </div>
                <p className="mt-1 hidden text-[11px] leading-relaxed text-fg-dim lg:block">
                  {node.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
