"use client";

import { useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import { buildConstellation } from "@/lib/constellation";

type Point = { x: number; y: number };

export default function ProjectConstellation({
  onSelectProject,
}: {
  onSelectProject: (id: string) => void;
}) {
  const { edges, conceptNodes, projectNodes } = useMemo(
    () => buildConstellation(),
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Map<string, Point>>(new Map());
  const [hovered, setHovered] = useState<string | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const next = new Map<string, Point>();
    container.querySelectorAll<HTMLElement>("[data-node-key]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      next.set(el.dataset.nodeKey!, {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });
    setPositions(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const isRelated = (key: string) => {
    if (!hovered) return true;
    if (key === hovered) return true;
    return edges.some(
      (e) =>
        (e.from === hovered && e.to === key) ||
        (e.to === hovered && e.from === key)
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[520px] flex-col justify-between gap-24 overflow-hidden border border-border bg-bg-elevated/30 px-6 py-16 sm:px-10"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {edges.map((edge, i) => {
          const from = positions.get(edge.from);
          const to = positions.get(edge.to);
          if (!from || !to) return null;
          const related = !hovered || edge.from === hovered || edge.to === hovered;
          const midY = (from.y + to.y) / 2;
          const d = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={related ? "var(--color-accent)" : "var(--color-border-strong)"}
              strokeWidth={related && hovered ? 1.5 : 1}
              opacity={related ? (hovered ? 0.7 : 0.35) : 0.12}
              style={{ transition: "opacity 250ms var(--ease-system), stroke 250ms" }}
            />
          );
        })}
      </svg>

      <div className="relative z-10 flex flex-wrap justify-center gap-3">
        {conceptNodes.map((node) => (
          <button
            key={node.key}
            data-node-key={node.key}
            data-cursor="hover"
            onMouseEnter={() => setHovered(node.key)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(node.key)}
            onBlur={() => setHovered(null)}
            onClick={() => {
              if (node.label === "VQC" || node.label === "QISKIT" || node.label === "QUANTUM") {
                document.getElementById("lab")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="rounded-full border border-border-strong px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all"
            style={{
              opacity: isRelated(node.key) ? 1 : 0.3,
              color: hovered === node.key ? "var(--color-accent)" : "var(--color-fg-muted)",
              borderColor: hovered === node.key ? "var(--color-accent)" : undefined,
            }}
          >
            {node.label}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-4">
        {projectNodes.map((node) => (
          <button
            key={node.key}
            data-node-key={node.key}
            data-cursor="project"
            onMouseEnter={() => setHovered(node.key)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(node.key)}
            onBlur={() => setHovered(null)}
            onClick={() => node.projectId && onSelectProject(node.projectId)}
            className="rounded-lg border px-5 py-3 text-left transition-all"
            style={{
              opacity: isRelated(node.key) ? 1 : 0.3,
              borderColor:
                hovered === node.key ? "var(--color-accent)" : "var(--color-border-strong)",
              background: hovered === node.key ? "var(--color-accent-dim)" : "transparent",
            }}
          >
            <span className="font-display text-base text-fg sm:text-lg">
              {node.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
