"use client";

import { Canvas } from "@react-three/fiber";
import NodeField from "./NodeField";

type HeroSceneProps = {
  scrollProgress: number;
  mouse: { x: number; y: number };
  reducedMotion: boolean;
  nodeCount?: number;
};

export default function HeroScene({
  scrollProgress,
  mouse,
  reducedMotion,
  nodeCount,
}: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      className="!absolute inset-0"
    >
      <NodeField
        scrollProgress={scrollProgress}
        mouse={mouse}
        reducedMotion={reducedMotion}
        nodeCount={nodeCount}
      />
    </Canvas>
  );
}
