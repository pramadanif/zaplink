'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LiquidSphere: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 12000; // Increased density for premium look

  const [positions, initialPositions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 2.4;

    const color1 = new THREE.Color('#FF6500'); // Zap Orange
    const color2 = new THREE.Color('#F6CE71'); // Zap Gold
    const color3 = new THREE.Color('#C40C0C'); // Zap Red

    for (let i = 0; i < count; i++) {
      // Golden ratio spiral for even distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      let x = radius * Math.cos(theta) * Math.sin(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(phi);

      // Add elegant volumetric noise
      const noise = (Math.random() - 0.5) * 0.4;
      x += x * noise;
      y += y * noise;
      z += z * noise;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Color mapping based on Y axis
      const mixedColor = color1.clone().lerp(color2, (y + radius) / (radius * 2));
      // Occasionally spark a red one
      if (Math.random() > 0.95) mixedColor.lerp(color3, 0.8);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return [positions, initialPositions, colors];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const mouseX = (state.pointer.x * 2.5);
    const mouseY = (state.pointer.y * 2.5);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const ix = initialPositions[i3];
      const iy = initialPositions[i3 + 1];
      const iz = initialPositions[i3 + 2];

      // Sophisticated fluid wave math
      const slowTime = time * 0.5;
      const wave = Math.sin(slowTime + ix * 1.5 + iy * 1.5) * Math.cos(slowTime + iz * 1.5) * 0.15;
      
      // Mouse repulsion field
      const dx = positions[i3] - mouseX;
      const dy = positions[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let repulsion = 0;
      if (dist < 1.5) {
        // Inverse square falloff for smoother push
        repulsion = Math.pow(1.5 - dist, 2) * 0.8;
      }

      const ease = 0.03;
      positions[i3] += (ix - positions[i3] + wave + (dx * repulsion)) * ease;
      positions[i3 + 1] += (iy - positions[i3 + 1] + wave + (dy * repulsion)) * ease;
      positions[i3 + 2] += (iz - positions[i3 + 2] + wave) * ease;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.08;
    pointsRef.current.rotation.x = time * 0.12;
    pointsRef.current.rotation.z = Math.sin(time * 0.2) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors={true}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};
