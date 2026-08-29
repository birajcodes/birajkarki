// Add a new project by adding an entry to this array — nothing else
// needs to change for it to appear in Work, the constellation, and search.
//
// TODO(biraj): screenshots/diagrams, live URLs, and repo links are not
// in the supplied brief. `image` fields point at /public/projects/*
// placeholders — drop real assets in and the UI picks them up.

export type Project = {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  oneLiner: string;
  description: string;
  role: string;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  image: string;
  github?: string;
  live?: string;
  caseStudy: {
    problem: string;
    idea: string;
    role: string;
    architecture: string;
    technology: string;
    hardPart: string;
    result: string;
  };
  constellation: {
    // Concept/technology nodes this project connects to in the graph.
    nodes: string[];
  };
};

export const projects: Project[] = [
  {
    id: "hajir",
    title: "Hajir Software",
    category: "Human Resource Management System",
    featured: true,
    oneLiner: "An HRMS running inside 500+ companies.",
    description:
      "Hajir is a Human Resource Management System covering attendance, shift management, and reporting, built on Next.js and deployed to production at scale.",
    role: "Mid-Level Frontend Developer, Velox Labs",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js"],
    metrics: [{ label: "Companies using Hajir", value: "500+" }],
    image: "/projects/hajir.png",
    caseStudy: {
      problem:
        "Companies needed a single system to track attendance, manage shifts, and generate reporting — reliably enough to run payroll-adjacent decisions on.",
      idea:
        "Build an HRMS dashboard on Next.js that could scale from a handful of pilot customers to hundreds of companies without a rewrite.",
      role: "Built the Hajir dashboard as a frontend developer on the Velox Labs team.",
      architecture:
        "A Next.js dashboard architecture designed for scalable, production deployment, feeding attendance data captured through a separate biometric integration layer (see Biometric Integration System).",
      technology: "Next.js, TypeScript, React, Tailwind CSS, Node.js.",
      hardPart:
        "Keeping the dashboard architecture scalable and production-stable as adoption grew — this is the platform behind Hajir's growth to 500+ companies.",
      result: "Adopted by 500+ companies in production.",
    },
    constellation: { nodes: ["Next.js", "React", "TypeScript"] },
  },
  {
    id: "biometric-integration",
    title: "Biometric Integration System",
    category: "Hardware-to-Cloud Integration",
    featured: true,
    oneLiner: "Device to HRMS, through a custom-built local layer.",
    description:
      "An Electron-based system that bridges physical biometric devices to Hajir's HRMS backend, including a custom JavaScript NPM package for the integration layer.",
    role: "Mid-Level Frontend Developer, Velox Labs",
    technologies: ["Electron", "JavaScript", "Node.js", "NPM"],
    image: "/projects/biometric.png",
    caseStudy: {
      problem:
        "Hajir's attendance data needed to originate from physical biometric hardware, not manual entry — which meant bridging local devices to a cloud HRMS.",
      idea:
        "Ship an Electron desktop application that talks to the biometric device locally and forwards verified attendance events up to the HRMS API.",
      role: "Built the Electron application and the integration layer connecting it to Hajir.",
      architecture:
        "Device → local Electron application → biometric integration layer → HRMS API → Hajir dashboard.",
      technology: "Electron, JavaScript, Node.js — packaged as a custom NPM package for reuse.",
      hardPart:
        "Building a reliable local-to-cloud bridge: a custom JavaScript NPM package that could be reused as the integration layer across the device and the HRMS backend.",
      result: "Live biometric data flowing into Hajir, in production use across Hajir's customer base.",
    },
    constellation: { nodes: ["Electron", "JavaScript", "Node.js"] },
  },
  {
    id: "laliguras",
    title: "Laliguras",
    category: "Multi-Vendor E-Commerce Platform",
    featured: true,
    oneLiner: "Real-time commerce across 100+ vendors.",
    description:
      "A multi-vendor e-commerce platform supporting 100+ vendors with real-time pickup and delivery, WebSocket-driven live updates, and push notifications.",
    role: "TODO — exact role/employer not specified for this project in source material",
    technologies: ["WebSockets", "FCM", "Docker", "CI/CD"],
    metrics: [{ label: "Vendors on the platform", value: "100+" }],
    image: "/projects/laliguras.png",
    caseStudy: {
      problem:
        "A multi-vendor marketplace needs live coordination — vendors, pickup, and delivery all need to see state change in real time, not on a page refresh.",
      idea:
        "Use WebSockets for live state and Firebase Cloud Messaging for push notifications, so pickup and delivery status updates reach every party immediately.",
      role: "TODO — not specified in source material.",
      architecture:
        "A WebSocket layer drives real-time state across vendor, pickup, and delivery flows, with FCM handling push notifications outside the active session.",
      technology: "WebSockets, FCM, Docker, containerized CI/CD.",
      hardPart:
        "Coordinating real-time pickup/delivery state across 100+ vendors reliably, at the concurrency a live WebSocket system demands.",
      result: "A production multi-vendor platform running 100+ vendors with real-time logistics.",
    },
    constellation: { nodes: ["WebSockets", "Real-Time", "Docker"] },
  },
  {
    id: "studio-management",
    title: "Studio Management System",
    category: "Studio Operations Platform",
    featured: false,
    oneLiner: "Booking, mapping, and automated communication for an Australian studio client.",
    description:
      "A studio management platform for an Australian client, built with Next.js and Express, including map integration and automated email workflows.",
    role: "TODO — not specified in source material",
    technologies: ["Next.js", "Express", "Docker", "Maps API", "Email Automation"],
    image: "/projects/studio-management.png",
    caseStudy: {
      problem:
        "An Australian studio client needed a system to manage operations with location-aware booking and automated client communication.",
      idea:
        "Pair a Next.js frontend with an Express backend, adding map integration for location context and automated email workflows for client communication.",
      role: "TODO — not specified in source material.",
      architecture:
        "Next.js frontend, Express backend, containerized with Docker, integrating a maps API and automated email workflows.",
      technology: "Next.js, Express, Docker, Maps API.",
      hardPart: "TODO — not specified in source material.",
      result: "Delivered a production system for an Australian client.",
    },
    constellation: { nodes: ["Next.js", "Express", "Docker"] },
  },
];

export const projectCategories = Array.from(
  new Set(projects.map((p) => p.category))
);
