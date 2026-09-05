"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import {
  FileText,
  Mail,
  Compass,
  Briefcase,
  FlaskConical,
  History,
} from "lucide-react";
import { GithubMark, LinkedinMark, MediumMark } from "@/components/icons";
import { site } from "@/data/site";

const NAV_ITEMS = [
  { label: "Go to About", href: "#about", icon: Compass },
  { label: "Go to Experience", href: "#experience", icon: History },
  { label: "Go to Work", href: "#work", icon: Briefcase },
  { label: "Go to Lab", href: "#lab", icon: FlaskConical },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  const go = useCallback((href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const external = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const download = useCallback((href: string, filename: string) => {
    setOpen(false);
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-[18vh] left-1/2 z-[91] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border border-border-strong bg-bg-elevated shadow-2xl shadow-black/60"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Biraj System command menu</Dialog.Title>
          <Command
            className="flex flex-col"
            filter={(value, search) =>
              value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
            }
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                BIRAJ / SYSTEM
              </span>
            </div>
            <Command.Input
              autoFocus
              placeholder="Type a command..."
              className="w-full bg-transparent px-4 py-3 font-mono text-sm text-fg placeholder:text-fg-dim outline-none"
            />
            <Command.List className="max-h-80 overflow-y-auto px-2 pb-2">
              <Command.Empty className="px-3 py-6 text-center font-mono text-xs text-fg-muted">
                No results.
              </Command.Empty>
              <Command.Group
                heading="NAVIGATE"
                className="px-1 pt-2 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-fg-dim"
              >
                {NAV_ITEMS.map((item) => (
                  <Command.Item
                    key={item.href}
                    onSelect={() => go(item.href)}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-fg data-[selected=true]:bg-accent-dim data-[selected=true]:text-accent-fg"
                  >
                    <item.icon size={14} className="text-fg-dim" />
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group
                heading="CONNECT"
                className="px-1 pt-2 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-fg-dim"
              >
                <Command.Item
                  onSelect={() => external(site.links.github)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-fg data-[selected=true]:bg-accent-dim data-[selected=true]:text-accent-fg"
                >
                  <GithubMark size={14} className="text-fg-dim" />
                  GitHub
                </Command.Item>
                <Command.Item
                  onSelect={() => external(site.links.linkedin)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-fg data-[selected=true]:bg-accent-dim data-[selected=true]:text-accent-fg"
                >
                  <LinkedinMark size={14} className="text-fg-dim" />
                  LinkedIn
                </Command.Item>
                <Command.Item
                  onSelect={() => external(site.links.medium)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-fg data-[selected=true]:bg-accent-dim data-[selected=true]:text-accent-fg"
                >
                  <MediumMark size={14} className="text-fg-dim" />
                  Medium
                </Command.Item>
                <Command.Item
                  onSelect={() => download(site.links.resume, "Biraj-Karki-Resume.pdf")}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-fg data-[selected=true]:bg-accent-dim data-[selected=true]:text-accent-fg"
                >
                  <FileText size={14} className="text-fg-dim" />
                  Download Resume
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
