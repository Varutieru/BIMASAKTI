"use client";

import Header from "@/components/header";
import { Canvas } from "@react-three/fiber";
import Bm13Evo from "@/components/Bm13Evo";
import CameraController from "@/components/cameraController";
import { useState } from "react";

export default function HomePage() {
  const [camPos, setCamPos] = useState<[number, number, number]>([0, 2, 5]);

  return (
    <main>
      {/* HEADER */}
      <Header />

      <div className="bg-white relative overflow-hidden min-h-screen">
        <div className="relative w-full">

          {/* Camera Control Buttons */}
          <div className="absolute z-10 top-4 left-4 flex gap-2">
            <button
              onClick={() => setCamPos([0, 2, 5])}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Front
            </button>
            <button
              onClick={() => setCamPos([5, 3, 5])}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Side
            </button>
            <button
              onClick={() => setCamPos([0, 8, 0])}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Top
            </button>
          </div>

          {/* HERO 3D Model */}
          <div className="relative w-full h-[600px]">
            <Canvas
              shadows
              camera={{ position: [0, 2, 5], fov: 50 }}>

              {/* Lighting */}
              <ambientLight intensity={0.3} />
              <directionalLight
                castShadow
                position={[5, 10, 5]}
                intensity={1.2}
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0005}
              />

              {/* 3D Model BIMSAK */}
              <Bm13Evo
                scale={0.5}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
              />

              {/* Camera Controller */}
              <CameraController targetPosition={camPos} />

            </Canvas>
          </div>

        </div>
      </div>

    </main>
  );
}
