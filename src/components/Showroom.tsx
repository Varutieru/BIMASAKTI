"use client";

import { Box, Plane } from "@react-three/drei";

export default function Showroom() {
  return (
    <>
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshPhysicalMaterial
            color="#eeeeee"
            roughness={0.2}
            metalness={0.6}
        />

      </Plane>

      {/* Walls */}
      <Box args={[20, 10, 0.5]} position={[0, 5, -10]} receiveShadow>
        <meshStandardMaterial color="#eeeeee" />
      </Box>
      <Box args={[20, 10, 0.5]} position={[0, 5, 10]} receiveShadow>
        <meshStandardMaterial color="#eeeeee" />
      </Box>
      <Box args={[0.5, 10, 20]} position={[-10, 5, 0]} receiveShadow>
        <meshStandardMaterial color="#eeeeee" />
      </Box>
      <Box args={[0.5, 10, 20]} position={[10, 5, 0]} receiveShadow>
        <meshStandardMaterial color="#eeeeee" />
      </Box>
    </>
  );
}
