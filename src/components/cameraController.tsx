"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect } from "react";

interface CameraControllerProps {
  targetPosition: [number, number, number];
  targetLookAt?: [number, number, number];
}

export default function CameraController({
  targetPosition,
  targetLookAt = [0, 0, 0],
}: CameraControllerProps) {
  const { camera } = useThree();

  // Animate camera position with spring
  const { position } = useSpring({
    position: targetPosition,
    config: { mass: 1, tension: 120, friction: 20 },
  });

  // Update camera each frame using interpolated spring value
  useFrame(() => {
    const pos = position.get();
    camera.position.set(pos[0], pos[1], pos[2]);
    camera.lookAt(...targetLookAt);
  });

  return null;
}
