'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMotionValue, useTransform } from 'framer-motion';
// @ts-ignore - Three.js is a peer dependency
import * as THREE from 'three';

// Main Tooth Component
function Tooth() {
  const ref = useRef<THREE.Group>(null);
  const toothRotation = useMotionValue(0);
  const toothRotationThree = useTransform(toothRotation, (value) => value);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = toothRotation.get() * 0.01;
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Tooth Body */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.6, 1.8, 32]} />
        <meshStandardMaterial
          color="#F5F5F7"
          metalness={0.3}
          roughness={0.2}
          emissive="#E8E8EB"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Tooth Root (darker section) */}


      {/* Rim lighting highlight */}
      <mesh position={[0.8, 0.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#00B4FF"
          transparent
          opacity={0.4}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// Orbiting Blue Liquid Droplets Component
function LiquidOrbitals({ scrollProgress }: { scrollProgress: number }) {
  const orbitRef = useRef<THREE.Group>(null);
  const droplets = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    if (orbitRef.current) {
      // Main orbital rotation synchronized with scroll
      orbitRef.current.rotation.z += 0.0008 + scrollProgress * 0.0015;
    }

    // Individual droplet animations
    droplets.current.forEach((droplet, index) => {
      const time = Date.now() * 0.001;
      const offset = (Math.PI * 2 * index) / droplets.current.length;

      // Pulsing effect
      droplet.scale.setScalar(
        0.8 +
          0.3 * Math.sin(time * 2 + offset) +
          scrollProgress * 0.2
      );

      // Orbital radius expansion with scroll
      const baseRadius = 1.5 + scrollProgress * 0.8;
      const yOffset = 0.4 * Math.sin(time + offset);

      droplet.position.x = Math.cos(time * 0.5 + offset) * baseRadius;
      droplet.position.z = Math.sin(time * 0.5 + offset) * baseRadius;
      droplet.position.y = yOffset;

      // Rotation in its own orbit
      droplet.rotation.x = time * 1.5 + offset;
      droplet.rotation.y = time * 2 + offset;
    });
  });

  return (
    <group ref={orbitRef}>
      {/* Create 5 orbiting droplets */}
      {[0, 1, 2, 3, 4].map((index) => (
        <mesh
          key={index}
          ref={(el: THREE.Mesh) => {
            if (el) droplets.current[index] = el;
          }}
          position={[1.5, 0, 0]}
        >
          <icosahedronGeometry args={[0.25, 4]} />
          <meshPhongMaterial
            color="#0EA5E9"
            emissive="#0EA5E9"
            emissiveIntensity={0.6 + scrollProgress * 0.3}
            shininess={100}
            wireframe={false}
          />
        </mesh>
      ))}

      {/* Additional layered arc particles */}
      {[0, 1, 2].map((arcIndex) => (
        <mesh key={`arc-${arcIndex}`} position={[0, 0, 0]}>
          <torusGeometry
            args={[
              1.2 + arcIndex * 0.4 + scrollProgress * 0.3,
              0.05,
              32,
              100,
            ]}
          />
          <meshBasicMaterial
            color="#0EA5E9"
            transparent
            opacity={0.3 - arcIndex * 0.1 + scrollProgress * 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Canvas Component with Lighting
function ToothSceneContent({
  scrollProgress
}: {
  scrollProgress: number
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 3.5;
    camera.fov = 50;
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      {/* Soft blue ambient light */}
      <ambientLight intensity={0.8} color="#E0F2FE" />

      {/* Key rim light - medical blue */}
      <pointLight
        position={[3, 2, 2]}
        intensity={1.2}
        color="#0EA5E9"
        decay={2}
      />

      {/* Fill light - softer white */}
      <pointLight
        position={[-2, -1, 1]}
        intensity={0.6}
        color="#FFFFFF"
        decay={2}
      />

      {/* Dark rim from behind */}
      <pointLight
        position={[0, 0, -3]}
        intensity={0.3}
        color="#1E293B"
        decay={2}
      />

      {/* Back drop light for depth */}
      <pointLight
        position={[0, 0, -5]}
        intensity={0.4}
        color="#64748B"
        decay={2}
      />

      <Tooth />
      <LiquidOrbitals scrollProgress={scrollProgress} />
    </>
  );
}

// Exported Canvas Component
export default function ToothScene({
  scrollProgress = 0
}: {
  scrollProgress?: number
}) {
  return (
    <Canvas
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <ToothSceneContent scrollProgress={scrollProgress} />
    </Canvas>
  );
}
