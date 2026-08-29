"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Result = [0 | 1, 0 | 1] | null;

export default function QuantumCircuit() {
  const [h, setH] = useState(true);
  const [entangle, setEntangle] = useState(true);
  const [result, setResult] = useState<Result>(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    window.setTimeout(() => {
      let outcome: Result;
      if (h && entangle) {
        outcome = Math.random() < 0.5 ? [0, 0] : [1, 1];
      } else if (h) {
        const q0 = Math.random() < 0.5 ? 0 : 1;
        outcome = [q0, 0];
      } else {
        outcome = [0, 0];
      }
      setResult(outcome);
      setRunning(false);
    }, 550);
  };

  const readout = !result
    ? "Toggle the gates, then run the circuit."
    : h && entangle
      ? "Superposition + entanglement — the two outcomes are correlated on every run."
      : h
        ? "Superposition on qubit 0 — outcome is random, but qubit 1 stays independent."
        : "No superposition applied — the outcome is deterministic.";

  return (
    <div className="border border-border bg-bg-elevated/40 p-6 sm:p-10">
      <svg
        viewBox="0 0 520 140"
        className="h-auto w-full"
        role="img"
        aria-label="Two-qubit circuit diagram with a Hadamard gate and a controlled-NOT gate"
      >
        <line x1="70" y1="35" x2="480" y2="35" stroke="var(--color-border-strong)" strokeWidth="1" />
        <line x1="70" y1="105" x2="480" y2="105" stroke="var(--color-border-strong)" strokeWidth="1" />

        <text x="30" y="40" className="font-mono" fontSize="15" fill="var(--color-fg-muted)">|0⟩</text>
        <text x="30" y="110" className="font-mono" fontSize="15" fill="var(--color-fg-muted)">|0⟩</text>

        <g
          onClick={() => setH((v) => !v)}
          className="cursor-pointer"
          data-cursor="hover"
        >
          <rect
            x="130"
            y="18"
            width="34"
            height="34"
            rx="4"
            fill={h ? "var(--color-accent-dim)" : "var(--color-bg-elevated-2)"}
            stroke={h ? "var(--color-accent)" : "var(--color-border-strong)"}
          />
          <text
            x="147"
            y="40"
            textAnchor="middle"
            className="font-mono"
            fontSize="15"
            fontWeight={600}
            fill={h ? "var(--color-accent)" : "var(--color-fg-dim)"}
          >
            H
          </text>
        </g>

        <g
          onClick={() => setEntangle((v) => !v)}
          className="cursor-pointer"
          data-cursor="hover"
        >
          <line
            x1="280"
            y1="35"
            x2="280"
            y2="105"
            stroke={entangle ? "var(--color-accent)" : "var(--color-border-strong)"}
            strokeWidth="1.5"
          />
          <circle
            cx="280"
            cy="35"
            r="6"
            fill={entangle ? "var(--color-accent)" : "var(--color-fg-dim)"}
          />
          <circle
            cx="280"
            cy="105"
            r="13"
            fill="none"
            stroke={entangle ? "var(--color-accent)" : "var(--color-border-strong)"}
            strokeWidth="1.5"
          />
          <line x1="272" y1="105" x2="288" y2="105" stroke={entangle ? "var(--color-accent)" : "var(--color-border-strong)"} strokeWidth="1.5" />
          <line x1="280" y1="97" x2="280" y2="113" stroke={entangle ? "var(--color-accent)" : "var(--color-border-strong)"} strokeWidth="1.5" />
        </g>

        {[35, 105].map((y) => (
          <rect
            key={y}
            x="420"
            y={y - 17}
            width="34"
            height="34"
            rx="4"
            fill="var(--color-bg-elevated-2)"
            stroke="var(--color-border-strong)"
          />
        ))}
        <text x="437" y="40" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--color-fg-muted)">M</text>
        <text x="437" y="110" textAnchor="middle" className="font-mono" fontSize="13" fill="var(--color-fg-muted)">M</text>

        <AnimatePresence>
          {result && (
            <>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x="465"
                y="40"
                className="font-mono"
                fontSize="15"
                fontWeight={600}
                fill="var(--color-accent)"
              >
                {result[0]}
              </motion.text>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x="465"
                y="110"
                className="font-mono"
                fontSize="15"
                fontWeight={600}
                fill="var(--color-accent)"
              >
                {result[1]}
              </motion.text>
            </>
          )}
        </AnimatePresence>
      </svg>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            data-cursor="hover"
            onClick={() => setH((v) => !v)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.12em] transition-colors",
              h ? "border-accent text-accent" : "border-border-strong text-fg-dim"
            )}
          >
            H · SUPERPOSITION {h ? "ON" : "OFF"}
          </button>
          <button
            data-cursor="hover"
            onClick={() => setEntangle((v) => !v)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.12em] transition-colors",
              entangle ? "border-accent text-accent" : "border-border-strong text-fg-dim"
            )}
          >
            CNOT · ENTANGLE {entangle ? "ON" : "OFF"}
          </button>
        </div>
        <button
          data-cursor="hover"
          onClick={run}
          disabled={running}
          className="rounded-full bg-accent px-6 py-2.5 font-mono text-[10px] tracking-[0.15em] text-accent-fg transition-opacity disabled:opacity-50"
        >
          {running ? "MEASURING..." : "[ RUN CIRCUIT ]"}
        </button>
      </div>

      <p className="mt-6 font-mono text-xs leading-relaxed text-fg-muted">
        {readout}
      </p>
    </div>
  );
}
