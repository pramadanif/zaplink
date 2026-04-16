'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LiquidSphere: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 5000;

  const [positions, initialPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const radius = 2;

    for (let i = 0; i < count; i++) {
      // Golden ratio spiral for even distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Add some noise
      const noiseX = (Math.random() - 0.5) * 0.2;
      const noiseY = (Math.random() - 0.5) * 0.2;
      const noiseZ = (Math.random() - 0.5) * 0.2;

      positions[i * 3] = x + noiseX;
      positions[i * 3 + 1] = y + noiseY;
      positions[i * 3 + 2] = z + noiseZ;

      initialPositions[i * 3] = x + noiseX;
      initialPositions[i * 3 + 1] = y + noiseY;
      initialPositions[i * 3 + 2] = z + noiseZ;
    }

    return [positions, initialPositions];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Mouse interaction
    const mouseX = (state.pointer.x * 2);
    const mouseY = (state.pointer.y * 2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const ix = initialPositions[i3];
      const iy = initialPositions[i3 + 1];
      const iz = initialPositions[i3 + 2];

      // Wave effect
      const wave = Math.sin(time * 2 + ix + iy) * 0.1;
      
      // Mouse repulsion
      const dx = positions[i3] - mouseX;
      const dy = positions[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let repulsion = 0;
      if (dist < 2) {
        repulsion = (2 - dist) * 0.5;
      }

      // Return to initial position with some noise
      positions[i3] += (ix - positions[i3] + wave + (dx * repulsion)) * 0.05;
      positions[i3 + 1] += (iy - positions[i3 + 1] + wave + (dy * repulsion)) * 0.05;
      positions[i3 + 2] += (iz - positions[i3 + 2] + wave) * 0.05;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#F6CE71"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
};
