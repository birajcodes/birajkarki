export type SkillSystem = {
  id: string;
  label: string;
  description: string;
  items: string[];
};

export const skillSystems: SkillSystem[] = [
  {
    id: "frontend",
    label: "FRONTEND",
    description: "Interfaces that hold up in production.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    id: "backend",
    label: "BACKEND",
    description: "Services and APIs underneath them.",
    items: ["Node.js", "Express.js", "Nest.js", "Django", "Go"],
  },
  {
    id: "data",
    label: "DATA",
    description: "Where the state actually lives.",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    description: "Getting software from a laptop into production.",
    items: ["Docker", "CI/CD", "GitHub Actions", "AWS"],
  },
  {
    id: "realtime",
    label: "REAL-TIME",
    description: "Systems that update while you're looking at them.",
    items: ["WebSockets", "FCM"],
  },
  {
    id: "exploration",
    label: "EXPLORATION",
    description: "What I study outside of shipped work.",
    items: ["Qiskit", "Machine Learning", "AI"],
  },
];
