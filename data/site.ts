// Central source of truth for identity, links, and short-form copy.
// TODO(biraj): fields marked TODO below are not present in the supplied
// brief and must be filled in — nothing here is invented.

export const site = {
  name: "Biraj Karki",
  role: "Software Engineer",
  tagline: "I build software, explore systems, and turn complex ideas into things people can use.",
  location: "TODO — not specified in source material", // TODO(biraj)
  email: "birajkarki9849@gmail.com",
  availability: [
    "SOFTWARE ENGINEERING",
    "PRODUCT",
    "INTERNSHIP",
    "COLLABORATION",
  ],
  links: {
    github: "#", // TODO(biraj): add GitHub profile URL
    linkedin: "#", // TODO(biraj): add LinkedIn profile URL
    resume: "#", // TODO(biraj): add /resume.pdf to /public and point here
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
