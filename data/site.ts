// Central source of truth for identity, links, and short-form copy.
// TODO(biraj): fields marked TODO below are not present in the supplied
// brief and must be filled in — nothing here is invented.

export const site = {
  name: "Biraj Karki",
  role: "Software Engineer",
  tagline: "I build software, explore systems, and turn complex ideas into things people can use.",
  location: "TODO — not specified in source material", // TODO(biraj)
  email: "birajkarki9849@gmail.com",
  phone: "605-202-0350",
  availability: [
    "SOFTWARE ENGINEERING",
    "PRODUCT",
    "INTERNSHIP",
    "COLLABORATION",
  ],
  links: {
    github: "https://github.com/birajcodes",
    // Legacy account, kept as a secondary link (see Contact footer).
    githubLegacy: "https://github.com/birajkarki",
    linkedin: "https://www.linkedin.com/in/biraj-karki/",
    medium: "https://medium.com/@birajkarki",
    resume: "/resume.pdf",
  },
  identity: {
    statement: "I like building things that make complicated systems feel simple.",
    traits: [
      {
        label: "ENGINEER",
        description:
          "I write production software across the stack — from database schema to the pixels a user touches.",
      },
      {
        label: "BUILDER",
        description:
          "I ship. Hajir went from an idea to software running inside 500+ companies.",
      },
      {
        label: "LEADER",
        description:
          "I've led development teams, architected client platforms, and mentored other engineers.",
      },
      {
        label: "LEARNER",
        description:
          "Machine learning, distributed systems, quantum computing — I study the things that will matter next.",
      },
      {
        label: "EXPLORER",
        description:
          "Completed the IBM Quantum Challenge 2024. I spend real time in Qiskit outside of work.",
      },
    ],
  },
} as const;

export type Site = typeof site;
