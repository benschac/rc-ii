"use client";
import { H1, Spacer, XStack, YStack, Text } from "tamagui";
import { SwitchThemeButton } from "./_components/SwitchThemeButton";
import { Link } from "./_components/Link";
import type * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import Script from "next/script";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
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
      {/* <group
        scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        rotation={[0, 0, Math.PI / 4]}
      > */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
      {/* </group> */}
    </mesh>
  );
}

export default function Home() {
  return (
    <YStack f={1} px="$4">
      {/* <YStack bg="red" tag="header">
        <XStack tag="nav">
          <H1>bensch.ac</H1>
          <Spacer flex />
          <Link href="/about">about</Link>
          <Link href="/blog">blog</Link>
          <Link href="/uses">uses</Link>
          <SwitchThemeButton />
        </XStack>
      </YStack>
      <SwitchThemeButton /> */}
      <Canvas
        style={{
          // width: 600,
          // height: 600,
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
      <Script
        async
        defer
        src="https://www.recurse-scout.com/loader.js?t=52b00143745a218ef86c10cc5dc24f55"
      />
    </YStack>
  );
}
