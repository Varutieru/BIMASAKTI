"use client";

import Header from "@/components/header";
import { Canvas } from "@react-three/fiber";
import Bm13Evo from "@/components/Bm13Evo";
import CameraController from "@/components/cameraController";
import { useState } from "react";
import * as THREE from "three";

export default function HomePage() {
  const [camPos, setCamPos] = useState<[number, number, number]>([-7.5, 1.5, 0]);
  const [lookAt, setLookAt] = useState<[number, number, number]>([0, 1, 0]);
  const [showTitle, setShowTitle] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleCameraChange = (newPos: [number, number, number]) => {
    
    if (newPos[0] !== -7.5 || newPos[1] !== 1.5 || newPos[2] !== 0) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setShowTitle(false);
        setCamPos(newPos);
      }, 500);
    } else {
      
      setCamPos(newPos);
      setShowTitle(true);
      setIsAnimatingOut(false);
    }
  };

  return (
    <main>
      <div className="bg-white relative overflow-hidden min-h-screen">
        <div className="relative w-full h-full">

          {/* HEADER */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <Header />
          </header>

          {/* HERO SECTION */}
          <div className="w-screen h-screen relative flex">

            {/* BIMASAKTI TITLE */}
            {showTitle && (
              <div 
                className={`fixed top-[25vh] left-0 right-0 flex justify-center items-center -translate-y-1/2 text-black z-40 ${
                  isAnimatingOut 
                    ? 'fade-reveal-out' 
                    : 'fade-reveal-in'
                }`}
              >
                <h1 
                  className="text-black text-6xl md:text-8xl lg:text-9xl text-center tracking-wider"
                  style={{ fontFamily: 'Monument Extended Regular, Arial, sans-serif' }}
                >
                  BIMASAKTI
                </h1>
              </div>
            )}

            {/* Camera Control Buttons */}
            <div className="absolute left-[5vw] top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#AE0101] rounded-full py-6 px-3 z-10 max-w-[80px]">
            
              {/* PLACEHOLDER BUTTONS */}
              <button
                onClick={() => handleCameraChange([-7.5, 1.5, 0])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm hover:bg-[#6B0000] transition-colors"
              >
                Front
              </button>
              <button
                onClick={() => handleCameraChange([-5, 1.5, 3])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm hover:bg-[#6B0000] transition-colors"
              >
                Front Left
              </button>
              <button
                onClick={() => handleCameraChange([-2, 8, -2])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm hover:bg-[#6B0000] transition-colors"
              >
                Top
              </button>
              <button
                onClick={() => handleCameraChange([3, 1.5, -2])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm hover:bg-[#6B0000] transition-colors"
              >
                Rear Right
              </button>

            </div>

            {/* 3D MODEL */}
            <div className="relative w-screen h-screen z-5">
              <Canvas
                shadows={{ type: THREE.PCFSoftShadowMap }}
                camera={{ position: [0, 2, 5], fov: 50 }}
              >
                {/* Lighting */}
                <ambientLight intensity={0.4} color="#ffffff" />
                <directionalLight
                  castShadow
                  position={[10, 15, 10]}
                  intensity={8}
                  color="#ffffff"
                  shadow-mapSize={[2048, 2048]}
                  shadow-bias={-0.0001}
                  shadow-camera-left={-30}
                  shadow-camera-right={30}
                  shadow-camera-top={30}
                  shadow-camera-bottom={-30}
                  shadow-camera-near={0.1}
                  shadow-camera-far={50}
                />
                <pointLight position={[-8, 3, 0]} intensity={2} color="#ffffff" />
                <pointLight position={[8, 3, 0]} intensity={2} color="#ffffff" />
                
                {/* Red Spotlight from Above - Highlighting the Car */}
                <spotLight
                  position={[0, 10, 0]}
                  angle={0.5}
                  penumbra={0.3}
                  intensity={100}
                  color="#cc0100"
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                  target-position={[0, 0, 0]}
                />

                {/* Ground Plane */}
                <mesh 
                  rotation={[-Math.PI / 2, 0, 0]} 
                  position={[0, 0.05, 0]} 
                  receiveShadow
                >
                  <planeGeometry args={[30, 200]} />
                    <meshStandardMaterial 
                      color="#ffffff" 
                      metalness={0}
                      roughness={0}
                    />
                </mesh>

                {/* Bimasakti 3D */}
                <Bm13Evo
                  scale={0.5}
                  position={[0, 0, 0]}
                  castShadow
                  receiveShadow
                />

                {/* Camera Control */}
                <CameraController
                  targetPosition={camPos}
                  targetLookAt={lookAt}
                />
              </Canvas>  
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}