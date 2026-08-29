"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", num: "01", label: "ABOUT" },
  { id: "experience", num: "02", label: "EXPERIENCE" },
  { id: "work", num: "03", label: "WORK" },
  { id: "lab", num: "04", label: "LAB" },
  { id: "contact", num: "05", label: "CONTACT" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 240);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-transform duration-500 sm:px-8",
          hidden && !open && "-translate-y-full"
        )}
      >
        <button
          data-cursor="hover"
          onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
          className="font-mono text-[11px] tracking-[0.2em] text-fg-muted transition-colors hover:text-fg"
        >
          BIRAJ <span className="text-accent">/</span> SYSTEM
        </button>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-bg-elevated/70 px-1.5 py-1.5 backdrop-blur-md md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                data-cursor="hover"
                onClick={() => go(s.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors",
                  active === s.id
                    ? "bg-accent-dim text-accent"
                    : "text-fg-muted hover:text-fg"
                )}
              >
                <span className="opacity-50">{s.num}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          data-cursor="hover"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-fg transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-fg transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>

        <div className="hidden font-mono text-[10px] tracking-[0.15em] text-fg-dim md:flex md:items-center md:gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent" />
          ONLINE
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bg px-8 md:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className={cn(
                "flex items-baseline gap-4 py-3 text-left font-display text-4xl",
                active === s.id ? "text-accent" : "text-fg"
              )}
            >
              <span className="font-mono text-sm text-fg-dim">{s.num}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
