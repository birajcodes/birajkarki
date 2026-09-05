// TODO(biraj): Velox Labs and Technergy Global still need exact employment
// dates/locations. R.D. International also still needs dates (flagged as
// TODO by biraj — not fabricated) plus any measurable results, team size,
// and tools used (e.g. Canva, Adobe, Meta Ads Manager). Arba Solutions
// needs its remaining ~3 skills and 1-2 more bullet specifics. Until those
// are supplied, ordering of Velox Labs / Technergy Global relative to
// R.D. International is a best guess (most-recent-first); the three most
// recently confirmed roles (R.D. International, Arba Solutions, Cybertron
// Nepal) are in the exact order and with the exact dates/locations given.

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
    // TODO(biraj): dates not yet decided — do not fill in without confirming.
    period: "TODO — dates not supplied",
    location: "TODO — location not supplied",
    summary:
      "Managed the entire IT function end to end, spanning technical infrastructure and marketing/creative operations.",
    impact: [
      "Oversaw the company website — content, updates, and coordination with hosting/dev resources.",
      "Led all technical operations — systems, tools, and infrastructure for the organization.",
      "Ran digital marketing across Facebook Ads, Instagram, LinkedIn, and SMS/SSM campaigns.",
      "Owned SEO strategy and execution to grow organic visibility.",
      "Produced graphics and video content for marketing and social media.",
      "Managed social media marketing and content calendars across platforms.",
      "Led design work — branding, promotional creative, and campaign assets.",
      // TODO(biraj): team size, measurable results (traffic/lead/follower
      // growth), and tools used (Canva, Adobe, Meta Ads Manager, etc.) —
      // add once supplied.
    ],
    stack: ["Facebook Ads", "Instagram", "LinkedIn", "SMS/SSM", "SEO"],
  },
  {
    id: "arba-solutions",
    company: "Arba Solutions (Freelance)",
    role: "Software Engineer",
    period: "Apr 2024 - Jul 2024",
    location: "Merrylands, New South Wales, Australia · Remote",
    summary: "Built and shipped a Toast Management System as a freelance software engineer.",
    impact: [
      "Built and shipped a Toast Management System.",
      // TODO(biraj): 1-2 more specifics — stack details beyond React/Next.js,
      // the problem it solved, and any measurable outcome.
    ],
    // TODO(biraj): +3 more skills not yet listed.
    stack: ["React.js", "Next.js"],
  },
  {
    id: "cybertron-nepal",
    company: "Cybertron Nepal",
    role: "Software Engineer Intern",
    period: "Sep 2020 - Oct 2021",
    location: "Kathmandu, Bāgmatī, Nepal · Hybrid",
    summary:
      "Software engineering internship building websites across the stack while developing UI/UX fundamentals.",
    impact: [
      "Built multiple websites using HTML, CSS, JavaScript, React, and PHP.",
      "Collaborated within a team environment, strengthening communication and technical skills.",
      "Explored UI/UX design using Figma.",
    ],
    stack: ["JavaScript", "Web Development", "React", "PHP", "Figma"],
  },
];

export const leadership = {
  organization: "VSN IT Club",
  role: "Founder & Former President",
  period: "Mar 2021 - Nov 2023",
  location: "Kathmandu, Bāgmatī, Nepal · Hybrid",
  summary:
    "Founded and led a student tech community that grew to 50+ members, running coding and technology events and community initiatives.",
  points: [
    "Founded and led a student tech community that grew to 50+ members.",
    "Organized inter-college coding competitions and IT events.",
    "Built a culture of peer mentorship and collaborative learning.",
  ],
  skills: ["Skill Development", "Community Building"],
};
