// Procedural generation for the hero "node field" — a fibonacci-sphere
// point distribution with k-nearest-neighbor edges, used to fake a
// computational / systems-like structure rather than a generic sphere mesh.

export type FieldNode = {
  position: [number, number, number];
  phase: number;
  radius: number;
};

export type FieldEdge = [number, number];

export function generateFibonacciSphere(count: number, radius: number): FieldNode[] {
  const nodes: FieldNode[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    nodes.push({
      position: [x * radius, y * radius, z * radius],
      phase: (i / count) * Math.PI * 2,
      radius,
    });
  }

  return nodes;
}

export function generateKnnEdges(
  nodes: FieldNode[],
  k: number,
  maxDistance: number
): FieldEdge[] {
  const edges: FieldEdge[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const [ax, ay, az] = nodes[i].position;
      const [bx, by, bz] = nodes[j].position;
      const d = Math.hypot(ax - bx, ay - by, az - bz);
      if (d <= maxDistance) distances.push({ j, d });
    }
    distances.sort((a, b) => a.d - b.d);
    for (const { j } of distances.slice(0, k)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }

  return edges;
}

// A secondary "grid" target shape the field morphs toward as the user
// scrolls — reinforces the idea that this is a system, not decoration.
export function generateGridTarget(count: number, spread: number): FieldNode[] {
  const nodes: FieldNode[] = [];
  const side = Math.ceil(Math.sqrt(count));
  const step = spread / side;

  for (let i = 0; i < count; i++) {
    const col = i % side;
    const row = Math.floor(i / side);
    const x = (col - side / 2) * step;
    const y = (row - side / 2) * step;
    const z = Math.sin(col * 0.6) * Math.cos(row * 0.6) * spread * 0.08;

    nodes.push({
      position: [x, y, z],
      phase: (i / count) * Math.PI * 2,
      radius: spread,
    });
  }

  return nodes;
}
