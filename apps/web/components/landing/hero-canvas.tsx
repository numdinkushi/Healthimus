"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense } from "react";

const Blob = ({
  color,
  position,
  scale,
}: {
  color: string;
  position: [number, number, number];
  scale: number;
}) => (
  <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.8}>
    <mesh position={position} scale={scale}>
      <icosahedronGeometry args={[1, 8]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.15} />
    </mesh>
  </Float>
);

export const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1.2} position={[3, 3, 2]} />
        <Suspense fallback={null}>
          <Blob color="#22d3ee" position={[-1.8, 0.8, -0.4]} scale={1.6} />
          <Blob color="#2dd4bf" position={[1.7, -0.9, 0]} scale={1.25} />
          <Blob color="#6366f1" position={[0.8, 1.4, -1.2]} scale={0.9} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/70" />
    </div>
  );
};
