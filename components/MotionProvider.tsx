"use client";

import { MotionConfig } from "motion/react";

// Makes every Framer Motion animation in the app collapse to instant
// transitions for users with prefers-reduced-motion set, without needing
// a reducedMotion check in each component.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
