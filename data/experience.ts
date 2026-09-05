// TODO(biraj): R.D. International still needs measurable results, team
// size, and tools used (e.g. Canva, Adobe, Meta Ads Manager). Arba
// Solutions needs its remaining ~3 skills and 1-2 more bullet specifics.
// Velox Labs, Technergy Global, and R.D. International are in the exact
// order biraj specified; Arba Solutions and Cybertron Nepal (not part of
// that instruction) are kept after them, in their prior relative order.

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
    company: "Velox Labs Pvt. Ltd.",
    role: "Mid-Level Frontend Developer / Full Stack Developer",
    period: "Nov 2022 - Jun 2025 · 2 yrs 8 mos",
    location: "Kathmandu, Bāgmatī, Nepal · On-site",
    summary:
      "Built and scaled Hajir, an HRMS dashboard adopted by 500+ client companies, along with its biometric integration layer and internal tooling.",
    impact: [
      "Built Hajir Software (HRMS) dashboard, adopted by 500+ client companies.",
      "Developed biometric integration system and custom NPM package for biometric hardware.",
      "Designed a Go-based internal monitoring tool, improving monitoring efficiency by 20%.",
    ],
    stack: ["Next.js", "TypeScript", "Go", "Node.js"],
  },
  {
    id: "technergy-global",
    company: "Technergy Global Pvt. Ltd.",
    role: "Lead Software Engineer",
    period: "Jan 2024 - Sep 2025 · 1 yr 9 mos",
    location: "Kathmandu, Nepal",
    summary:
      "Led development on multiple client platforms end to end — architecture, delivery pipeline, and the developers building it.",
    impact: [
      "Architected 3+ client platforms with 100% on-time delivery.",
      "Optimized CI/CD pipelines with Docker, reducing deployment time by 40%.",
      "Mentored 5 developers, improving team productivity by 15%.",
    ],
    stack: ["Next.js", "Node.js", "Docker", "GitHub Actions"],
  },
  {
    id: "rd-international",
    company: "R.D. International Educational Consultancy",
    role: "Technical Lead",
    period: "Apr 2024 - Aug 2025 · 1 yr 5 mos",
    location: "Koteshwor, Kathmandu, Nepal · Full-time",
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
