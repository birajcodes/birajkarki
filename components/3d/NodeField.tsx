"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  generateFibonacciSphere,
  generateGridTarget,
  generateKnnEdges,
} from "@/lib/fieldGeometry";

const SPHERE_RADIUS = 2.6;

const pointVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aPhase;
  attribute float aSize;
  varying float vPulse;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float pulse = 0.55 + 0.45 * sin(uTime * 0.9 + aPhase * 3.0);
    vPulse = pulse;
    gl_PointSize = aSize * uPixelRatio * (6.0 / -mvPosition.z) * (0.6 + pulse * 0.6);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const pointFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vPulse;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, alpha * uOpacity * (0.5 + vPulse * 0.5));
  }
`;

type NodeFieldProps = {
  scrollProgress: number; // 0..1
  mouse: { x: number; y: number };
  reducedMotion: boolean;
  accentColor?: string;
  nodeCount?: number;
};

export default function NodeField({
  scrollProgress,
  mouse,
  reducedMotion,
  accentColor = "#7c5cff",
  nodeCount = 160,
}: NodeFieldProps) {
  const { viewport } = useThree();

  const sphereNodes = useMemo(
    () => generateFibonacciSphere(nodeCount, SPHERE_RADIUS),
    [nodeCount]
  );
  const gridNodes = useMemo(
    () => generateGridTarget(nodeCount, SPHERE_RADIUS * 2.1),
    [nodeCount]
  );
  const edges = useMemo(
    () => generateKnnEdges(sphereNodes, 3, SPHERE_RADIUS * 0.85),
    [sphereNodes]
  );

  const positions = useMemo(() => new Float32Array(nodeCount * 3), [nodeCount]);
  const phases = useMemo(() => {
    const arr = new Float32Array(nodeCount);
    sphereNodes.forEach((n, i) => (arr[i] = n.phase));
    return arr;
  }, [sphereNodes, nodeCount]);
  const sizes = useMemo(() => {
    const arr = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      // Deterministic pseudo-random spread (no Math.random) so this stays
      // pure across re-renders — a stable per-index hash is enough here.
      const pseudoRandom = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
      arr[i] = 6 + pseudoRandom * 6;
    }
    return arr;
  }, [nodeCount]);

  const linePositions = useMemo(
    () => new Float32Array(edges.length * 2 * 3),
    [edges]
  );

  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const damped = useRef({ x: 0, y: 0, morph: 0 });
  const clock = useRef(0);

  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    clock.current += delta;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = reducedMotion
        ? 0
        : clock.current;
    }

    const targetMorph = scrollProgress;
    damped.current.morph += (targetMorph - damped.current.morph) * 0.06;
    const morph = damped.current.morph;

    for (let i = 0; i < nodeCount; i++) {
      const a = sphereNodes[i].position;
      const b = gridNodes[i].position;
      const jitter = reducedMotion
        ? 0
        : Math.sin(clock.current * 0.6 + phases[i]) * 0.02;

      positions[i * 3] = THREE.MathUtils.lerp(a[0], b[0], morph) + jitter;
      positions[i * 3 + 1] =
        THREE.MathUtils.lerp(a[1], b[1], morph) + jitter * 0.6;
      positions[i * 3 + 2] = THREE.MathUtils.lerp(a[2], b[2], morph);
    }

    if (pointsGeometryRef.current) {
      pointsGeometryRef.current.attributes.position.needsUpdate = true;
    }

    edges.forEach(([from, to], idx) => {
      linePositions[idx * 6] = positions[from * 3];
      linePositions[idx * 6 + 1] = positions[from * 3 + 1];
      linePositions[idx * 6 + 2] = positions[from * 3 + 2];
      linePositions[idx * 6 + 3] = positions[to * 3];
      linePositions[idx * 6 + 4] = positions[to * 3 + 1];
      linePositions[idx * 6 + 5] = positions[to * 3 + 2];
    });
    if (linesGeometryRef.current) {
      linesGeometryRef.current.attributes.position.needsUpdate = true;
    }

    if (groupRef.current) {
      const targetX = reducedMotion ? 0 : mouse.y * 0.28;
      const targetY = reducedMotion ? 0 : mouse.x * 0.36;
      damped.current.x += (targetX - damped.current.x) * 0.04;
      damped.current.y += (targetY - damped.current.y) * 0.04;
      groupRef.current.rotation.x = damped.current.x;
      groupRef.current.rotation.y =
        damped.current.y + (reducedMotion ? 0 : clock.current * 0.03);

      const scale = THREE.MathUtils.lerp(1, 0.55, morph);
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.y = THREE.MathUtils.lerp(0, 0.6, morph);
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
        1,
        0.35,
        morph
      );
    }
    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity = THREE.MathUtils.lerp(0.22, 0.06, morph);
    }
  });

  const pixelRatio =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

  return (
    <group ref={groupRef} scale={Math.min(1, viewport.width / 8) || 1}>
      <points>
        <bufferGeometry ref={pointsGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={pointVertexShader}
          fragmentShader={pointFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uPixelRatio: { value: pixelRatio },
            uColor: { value: color },
            uOpacity: { value: 1 },
          }}
        />
      </points>
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterialRef}
          color={color}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
