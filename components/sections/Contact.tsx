import { Mail, FileText } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/icons";
import { site } from "@/data/site";

const CHANNELS = [
  { label: "EMAIL", href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "GITHUB", href: site.links.github, icon: GithubMark, external: true },
  { label: "LINKEDIN", href: site.links.linkedin, icon: LinkedinMark, external: true },
  { label: "RESUME", href: site.links.resume, icon: FileText, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-32 sm:px-8 md:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-accent"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
          06 / OPEN CHANNEL
        </span>
        <h2 className="mt-6 text-balance font-display text-4xl leading-[1.05] font-medium text-fg sm:text-6xl md:text-7xl">
          Have something worth building?
        </h2>
        <p className="mt-6 font-mono text-sm tracking-[0.1em] text-fg-muted">
          LET&apos;S TALK.
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              data-cursor={channel.external ? "external" : "hover"}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2.5 rounded-full border border-border-strong px-6 py-3 font-mono text-xs tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <channel.icon size={14} />
              {channel.label}
            </a>
          ))}
        </div>
      </div>

      <footer className="relative mx-auto mt-32 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 font-mono text-[10px] tracking-[0.12em] text-fg-dim sm:flex-row">
        <span>{site.name.toUpperCase()} — SYSTEM STATUS: ONLINE</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
