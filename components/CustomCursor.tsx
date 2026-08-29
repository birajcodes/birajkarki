"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorVariant = "default" | "hover" | "project" | "drag" | "external";

const LABELS: Record<CursorVariant, string> = {
  default: "",
  hover: "",
  project: "OPEN",
  drag: "DRAG",
  external: "",
};

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    if (isTouch) return;

    let x = 0;
    let y = 0;
    let raf = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }
          raf = 0;
        });
      }
    };

    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setVariant((target?.dataset.cursor as CursorVariant) ?? "default");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="system-cursor pointer-events-none fixed top-0 left-0 z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className={[
          "flex items-center justify-center rounded-full bg-white",
          reducedMotion ? "" : "transition-[width,height] duration-200 ease-out",
          variant === "default" && "h-2 w-2",
          variant === "hover" && "h-10 w-10",
          variant === "external" && "h-10 w-10",
          variant === "project" && "h-16 w-16",
          variant === "drag" && "h-16 w-16",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {LABELS[variant] && (
          <span className="font-mono text-[9px] tracking-[0.15em] text-black">
            {LABELS[variant]}
          </span>
        )}
        {variant === "external" && (
          <span className="text-[10px] text-black">↗</span>
        )}
      </div>
    </div>
  );
}
