"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { site } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? -rect.top / total : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
      setCoords({
        x: Math.round((e.clientX / window.innerWidth) * 180 - 90),
        y: Math.round((e.clientY / window.innerHeight) * 180 - 90),
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isTouch]);

  const showCanvas = !reducedMotion;

  return (
    <div ref={wrapperRef} className="relative h-[190vh]">
      <div id="hero" className="sticky top-0 h-screen w-full overflow-hidden">
        {showCanvas && (
          <Suspense fallback={null}>
            <HeroScene
              scrollProgress={scrollProgress}
              mouse={mouse}
              reducedMotion={reducedMotion}
              nodeCount={isTouch ? 90 : 160}
            />
          </Suspense>
        )}
        {!showCanvas && (
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:radial-gradient(circle_at_50%_45%,var(--color-accent-dim),transparent_60%)]"
          />
        )}

        <div
          className="absolute inset-0 flex flex-col justify-between px-5 py-24 sm:px-8 md:py-28"
          style={{
            opacity: 1 - scrollProgress * 1.3,
          }}
        >
          <div className="flex items-start justify-between font-mono text-[10px] tracking-[0.18em] text-fg-dim">
            <span>SYSTEM / 001</span>
            <span className="hidden sm:inline" aria-hidden="true">
              {coords.x >= 0 ? "N" : "S"} {Math.abs(coords.x)}° · {coords.y >= 0 ? "E" : "W"}{" "}
              {Math.abs(coords.y)}°
            </span>
          </div>

          <div className="max-w-4xl">
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent">
              {site.name.toUpperCase()}
            </p>
            <h1 className="font-display text-balance leading-[0.86] font-medium text-fg text-[15vw] sm:text-[10vw] md:text-[7.5vw]">
              SOFTWARE
              <br />
              ENGINEER
            </h1>
            <p className="mt-6 max-w-md font-mono text-xs leading-relaxed tracking-[0.05em] text-fg-muted sm:text-sm">
              BUILDING SOFTWARE. EXPLORING WHAT&apos;S NEXT.
            </p>

            <motion.button
              data-cursor="hover"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group mt-10 inline-flex items-center gap-3 border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              [ EXPLORE SYSTEM ]
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </motion.button>
          </div>

          <div className="flex flex-col gap-3 font-mono text-[10px] tracking-[0.15em] text-fg-dim sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-fg-muted">AVAILABLE FOR </span>
              <span className="text-accent">
                {site.availability.join(" / ")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent" />
              STATUS: ONLINE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
