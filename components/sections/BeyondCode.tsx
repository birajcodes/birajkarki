import { Users } from "lucide-react";
import { leadership } from "@/data/experience";

export default function BeyondCode() {
  return (
    <section id="beyond" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
      <div className="flex flex-col gap-8 border border-border bg-bg-elevated/30 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
        <div className="flex items-start gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-accent">
            <Users size={16} />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-fg-dim">
              BEYOND CODE
            </span>
            <h3 className="mt-2 font-display text-2xl text-fg sm:text-3xl">
              {leadership.role}, {leadership.organization}
            </h3>
            <div className="mt-1 font-mono text-[10px] tracking-[0.15em] text-fg-dim">
              {leadership.period} · {leadership.location}
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {leadership.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-fg-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            {leadership.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {leadership.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 self-start rounded-full border border-accent/40 bg-accent-dim px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-accent sm:self-center">
          50+ MEMBERS
        </div>
      </div>
    </section>
  );
}
