"use client";

import { Mail, FileText, Phone } from "lucide-react";
import { motion } from "motion/react";
import { GithubMark, LinkedinMark, MediumMark } from "@/components/icons";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHANNELS = [
  { label: "EMAIL", href: `mailto:${site.email}`, icon: Mail, external: false },
  {
    label: "PHONE",
    href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
    icon: Phone,
    external: false,
  },
  { label: "GITHUB", href: site.links.github, icon: GithubMark, external: true },
  { label: "LINKEDIN", href: site.links.linkedin, icon: LinkedinMark, external: true },
  { label: "MEDIUM", href: site.links.medium, icon: MediumMark, external: true },
] as const;

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

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
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
            <motion.a
              key={channel.label}
              data-cursor={channel.external ? "external" : "hover"}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: EASE }}
              className="flex items-center gap-2.5 rounded-full border border-border-strong px-6 py-3 font-mono text-xs tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <channel.icon size={14} />
              {channel.label}
            </motion.a>
          ))}
          <motion.a
            data-cursor="hover"
            href={site.links.resume}
            download="Biraj-Karki-Resume.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE }}
            className="flex items-center gap-2.5 rounded-full border border-border-strong px-6 py-3 font-mono text-xs tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <FileText size={14} />
            RESUME
          </motion.a>
        </div>
      </motion.div>

      <footer className="relative mx-auto mt-32 flex max-w-6xl flex-col items-center justify-center gap-4 border-t border-border pt-8 font-mono text-[10px] tracking-[0.12em] text-fg-dim sm:flex-row sm:justify-between">
        <span>{site.name.toUpperCase()} — SYSTEM STATUS: ONLINE</span>
        <a
          data-cursor="external"
          href={site.links.githubLegacy}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-fg-muted"
        >
          LEGACY GITHUB ↗
        </a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
