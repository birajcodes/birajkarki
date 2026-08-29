// TODO(biraj): exact employment dates and locations were not included in
// the supplied brief. Roles are ordered as listed in source material
// (most-recent-first assumed) — please confirm ordering and fill in
// `period`/`location` for each entry.

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  impact: string[];
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "velox-labs",
    company: "Velox Labs",
    role: "Mid-Level Frontend Developer",
    period: "TODO — dates not supplied",
    location: "TODO — location not supplied",
    summary:
      "Built Hajir, an HRMS dashboard that went on to be adopted by 500+ companies, and the biometric layer that feeds it real attendance data.",
    impact: [
      "Built the Hajir Software HRMS dashboard, later adopted by 500+ companies.",
      "Built the biometric integration connecting hardware devices to the HRMS.",
      "Authored a custom JavaScript NPM package used across internal projects.",
      "Designed Go-based internal tooling for the team.",
      "Worked on performance and monitoring improvements across the platform.",
    ],
    stack: ["Next.js", "TypeScript", "Go", "Node.js"],
  },
  {
    id: "technergy-global",
    company: "Technergy Global",
    role: "Lead Software Developer",
    period: "TODO — dates not supplied",
    location: "TODO — location not supplied",
    summary:
      "Led development on multiple client platforms end to end — architecture, delivery pipeline, and the developers building it.",
    impact: [
      "Architected 3+ client platforms.",
      "Optimized Docker CI/CD pipelines.",
      "Mentored developers on the team.",
    ],
    stack: ["Next.js", "Node.js", "Docker", "GitHub Actions"],
  },
  {
    id: "rd-international",
    company: "R.D. International Educational Consultancy",
    role: "Technical Lead",
    period: "TODO — dates not supplied",
    location: "TODO — location not supplied",
    summary: "TODO — role details beyond title not supplied in source material.",
    impact: [],
    stack: [],
  },
  {
    id: "arba-solutions",
    company: "Arba Solutions",
    role: "Software Engineer",
    period: "TODO — dates not supplied",
    location: "TODO — location not supplied",
    summary: "TODO — role details beyond title not supplied in source material.",
    impact: [],
    stack: [],
  },
  {
    id: "coderscave",
    company: "CodersCave",
    role: "Data Science Intern",
    period: "TODO — dates not supplied",
    location: "TODO — location not supplied",
    summary: "TODO — role details beyond title not supplied in source material.",
    impact: [],
    stack: ["Python"],
  },
];

export const leadership = {
  organization: "VSN IT Club",
  role: "Founder / Former President",
  summary:
    "Founded and led a student IT club that grew to 50+ members, running coding and technology events and community initiatives.",
  points: [
    "Grew the club to 50+ members.",
    "Organized coding and IT events for the student community.",
    "Ran community initiatives beyond scheduled events.",
    "Also involved in youth leadership work outside the club.",
  ],
};
