import { projects } from "@/data/projects";

export type GraphNode = {
  key: string;
  label: string;
  type: "project" | "concept";
  projectId?: string;
};

export type GraphEdge = {
  from: string;
  to: string;
};

// The quantum thread isn't tied to a shipped project — it links out to
// the Lab section instead, exactly as it should: exploration, not delivery.
const QUANTUM_CHAIN = ["QUANTUM", "QISKIT", "VQC"];

export function buildConstellation() {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  for (const project of projects) {
    const projectKey = `project:${project.id}`;
    nodes.set(projectKey, {
      key: projectKey,
      label: project.title.toUpperCase(),
      type: "project",
      projectId: project.id,
    });

    for (const concept of project.constellation.nodes) {
      const conceptKey = `concept:${concept}`;
      if (!nodes.has(conceptKey)) {
        nodes.set(conceptKey, {
          key: conceptKey,
          label: concept.toUpperCase(),
          type: "concept",
        });
      }
      edges.push({ from: projectKey, to: conceptKey });
    }
  }

  QUANTUM_CHAIN.forEach((label, i) => {
    const key = `concept:${label}`;
    nodes.set(key, { key, label, type: "concept" });
    if (i > 0) {
      edges.push({ from: `concept:${QUANTUM_CHAIN[i - 1]}`, to: key });
    }
  });

  const conceptNodes = Array.from(nodes.values()).filter(
    (n) => n.type === "concept"
  );
  const projectNodes = Array.from(nodes.values()).filter(
    (n) => n.type === "project"
  );

  return { nodes, edges, conceptNodes, projectNodes };
}
