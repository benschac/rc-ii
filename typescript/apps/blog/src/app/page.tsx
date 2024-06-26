"use client";
import { H3, Theme, YStack } from "tamagui";
import type * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Logo } from "./_components/Logo";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // @ts-expect-error - `useFrame` is not typed
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
      {/* </group> */}
    </mesh>
  );
}

export default function Home() {
  return (
    <YStack f={1} px="$4">
      <Canvas
        style={{
          zIndex: -1,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
        }}
        gl={{ preserveDrawingBuffer: true }}
        dpr={[1, 1]}
      >
        <Suspense fallback={null}>
          <Box position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </YStack>
  );
}
