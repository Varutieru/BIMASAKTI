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

      <div className="bg-[ffffff] relative overflow-hidden min-h-screen">
        <div className="relative w-full">

          {/* HERO SECTION */}
          <div className="w-screen min-px-[20px] sm:min-px-[30px] md:min-px-[40px] lg:min-px-[50px] max-h-[1080px] relative flex">

            {/* Camera Control Buttons */}
            <div className="max-w-[6.458vw] md:max-w-[6.458vw] max-h-[760px] lg:min-py-[60px] flex grid-rows-1 gap-auto absolute bg-[#AE0101] rounded-full z-index-10">
              
              <button
              className="mx-[10px]"
              onClick={() => setCamPos([0, 2, 5])}
              >
                <img
                  src="assets/heroButtons/iconMobil.svg"
                  alt="Car Icon"
                >
                </img>
              </button>

              <button
              className="mx-[10px]"
              onClick={() => setCamPos([5, 3, 5])}
              >
                <img
                  src="assets/heroButtons/iconMobil.svg"
                  alt="Car Icon"
                >
                </img>
              </button>
            
            {/* PLACEHOLDER*/}
            <button
              onClick={() => setCamPos([0, 2, 5])}
              className="px-3 py-1 bg-[#AE0101] text-white rounded z-index-11"
            >
              Front
            </button>
            <button
              onClick={() => setCamPos([5, 3, 5])}
              className="px-3 py-1 bg-[#AE0101] text-white rounded z-index-11"
            >
              Side
            </button>
            <button
              onClick={() => setCamPos([0, 8, 0])}
              className="px-3 py-1 bg-[#AE0101] text-white rounded z-index-11"
            >
              Top
            </button>

            </div>

            {/* 3D MODEL*/}
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

              {/* Bimasakti 3D */}
              <Bm13Evo
                scale={0.5}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
              />

              {/* Camera Control */}
              <CameraController targetPosition={camPos} />

            </Canvas>  
            
          </div>

          </div>

        </div>

      </div>

    </main>
  );
}
