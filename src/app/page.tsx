"use client";

import Header from "@/components/header";
import { Canvas } from "@react-three/fiber";
import Bm13Evo from "@/components/Bm13Evo";
import CameraController from "@/components/cameraController";
import { useState, useEffect, use } from "react";
import * as THREE from "three";
import Image from "next/image";


export default function HomePage() {
  const [camPos, setCamPos] = useState<[number, number, number]>([-7.5, 1.5, 0]);
  const [lookAt, setLookAt] = useState<[number, number, number]>([0, 1, 0]);
  const [showTitle, setShowTitle] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight * 0.02);
    };

    window.addEventListener('scroll', handleScroll);
    return () =>
      window.removeEventListener('scroll', handleScroll);
    }, []);

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

  const scrollToSection = () => {
  const targetElement = document.getElementById('aboutUsPage');
  targetElement?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start' 
  });
  };

  return (
    <main>
      <div className="bg-white relative overflow-hidden max-w-screen min-h-screen">
        <div className="relative w-full h-full">

          {/* HEADER */}
          <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-0 ${isScrolled ? 'bg-[#ffffff]' : 'bg-transparent'}`}>

            <Header />
          </header>

          {/* HERO SECTION */}
          <div id="homePage" className="w-screen h-screen relative flex">

            {/* BIMASAKTI TITLE */}
            {showTitle && (
              <div 
                className={`absolute top-[20vh] left-0 right-0 flex justify-center items-center -translate-y-1/2 text-black z-40 ${
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

            {/* EXPLORE BUTTON */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[10vh] z-40 hover:drop-shadow-[20px_10px_0_rgba(242,1,60,1)] transition-all duration-[340ms]">
                <button
                  onClick={() => {
                  scrollToSection();
                  handleCameraChange([-7.5, 1.5, 0]);
                  }}
                  type="button"
                  className="flex items-center justify-center bg-[#CC0100] w-[18vw] h-[3.125vw]
                            relative overflow-hidden text-white shadow-2xl 
                            transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#050014] 
                            before:transition-all before:duration-[340ms] hover:text-white hover:before:left-0 hover:before:w-full active:before:bg-[#003A6C] active:before:transition-none">
                  <p className="relative z-10 text-auto font-monument-extended-regular font-bold">
                  EXPLORE NOW
                  </p>
              </button>
            </div>

            {/* Camera Control Buttons */}
            <div className="absolute left-[5vw] top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#CC0100] rounded-full py-6 px-3 z-10 max-w-[80px]">
            
              {/* PLACEHOLDER BUTTONS */}
              <button
                onClick={() => handleCameraChange([-7.5, 1.5, 0])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm font-calcio hover:bg-[#6B0000] transition-colors"
              >
                Front
              </button>
              <button
                onClick={() => handleCameraChange([-5, 0.5, 3])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm font-calcio hover:bg-[#6B0000] transition-colors"
              >
                Front Left
              </button>
              <button
                onClick={() => handleCameraChange([3, 8, 0])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm font-calcio hover:bg-[#6B0000] transition-colors"
              >
                Top
              </button>
              <button
                onClick={() => handleCameraChange([3, 1, -2])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm font-calcio hover:bg-[#6B0000] transition-colors"
              >
                Rear Right
              </button>

            </div>

            {/* 3D MODEL */}
            <div className="relative w-screen fade-reveal-in h-screen z-5">
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
                
                {/* Red Spotlight */}
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

          {/* MASK SLIDER SECTION */}
          <div 
            id="aboutUsPage"
            className="w-screen h-screen bg-[#ffffff] flex items-center justify-center pt-[60px] sm:pt-[60px]
                      md:pt-[90px] lg:pt-[120px] gap-10"
          >

            {/* CONTENT */}
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-[5vw]
                            py-8 gap-8 lg:gap-12">

              {/* LEFT - IMAGE */}
              <div className="w-full lg:w-[45%] h-[40%] lg:h-full relative flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/slider/aboutUs.svg"
                    alt="about us image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* RIGHT - DESC */}
              <div className="w-full lg:w-[50%] flex flex-col justify-center gap-6 lg:gap-8">

                {/* DESCRIPTION */}
                <p className="text-black text-sm sm:text-base lg:text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                {/* ABOUT US PAGE */}
                <button
                  onClick={() => window.location.href = '/about'}
                  className="group relative px-8 py-4 bg-transparent border-2 border-[#CC0100] text-[#CC0100] 
                            font-bold text-sm sm:text-base tracking-wider self-start
                             hover:text-white transition-all duration-300 overflow-hidden"
                  style={{ fontFamily: 'Monument Extended Regular, Arial, sans-serif' }}
                >
                  <span className="relative z-10">ABOUT US PAGE</span>
                  <div className="absolute inset-0 bg-[#CC0100] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}