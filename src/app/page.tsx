"use client";

import Header from "@/components/header";
import { Canvas } from "@react-three/fiber";
import Bm13Evo from "@/components/Bm13Evo";
import CameraController from "@/components/cameraController";
import { useState, useEffect } from "react";
import * as THREE from "three";

export default function HomePage() {
  const [camPos, setCamPos] = useState<[number, number, number]>([-7.5, 1.5, 0]);
  const [lookAt, setLookAt] = useState<[number, number, number]>([0, 1, 0]);
  const [showTitle, setShowTitle] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetPage, setTargetPage] = useState(0);

  const pages = [
    { 
      id: 'aboutUsPage', 
      title: 'ABOUT US', 
      number: '01',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/assets/slider/aboutUs.svg'
    },
    { 
      id: 'ourCarsPage', 
      title: 'OUR CARS', 
      number: '02',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '/images/cars.jpg'
    },
    { 
      id: 'newsPage', 
      title: 'NEWS', 
      number: '03',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      image: '/images/news.jpg'
    },
    { 
      id: 'contactPage', 
      title: 'CONTACT', 
      number: '04',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro',
      image: '/images/contact.jpg'
    },
    { 
      id: 'GalleryPage', 
      title: 'GALLERY', 
      number: '05',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      image: '/images/gallery.jpg'
    },
  ];

  useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const heroHeight = window.innerHeight;
        setIsScrolled(window.scrollY > heroHeight * 0.02);

        const container = document.getElementById('maskSliderContainer');
        if (!container) {
          ticking = false;
          return;
        }

        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrollStart = Math.max(0, -rect.top);
        const scrollRange = containerHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));

        setScrollProgress(progress);

        const pageIndex = Math.min(
          Math.floor(progress * pages.length),
          pages.length - 1
        );
        setCurrentPage(pageIndex);
        setTargetPage(pageIndex);

        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, [pages.length]);

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

  const scrollToPage = (index: number) => {
  const container = document.getElementById('maskSliderContainer');
  if (!container) return;

  const containerTop = container.offsetTop;
  const viewportHeight = window.innerHeight;
  const containerHeight = container.offsetHeight;
  
  const pageProgress = index / (pages.length - 1);
  const scrollRange = containerHeight - viewportHeight;
  const targetScroll = containerTop + (scrollRange * pageProgress);
  
  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
  
  setTargetPage(index);
};

  const scrollToSection = () => {
  const container = document.getElementById('maskSliderContainer');
  console.log('Container found:', container);
  console.log('Container offsetTop:', container?.offsetTop);
  if (container) {
    window.scrollTo({
      top: container.offsetTop,
      behavior: 'smooth'
    });
  }
  setTargetPage(0);
};

  return (
    <main className="overflow-x-hidden max-w-full">
      <div className="bg-white relative w-full min-h-screen max-w-full">
        <div className="relative w-full h-full max-w-full">

          {/* HEADER */}
          <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-0 ${isScrolled ? 'bg-[#ffffff]' : 'bg-transparent'}`}>
            <Header />
          </header>

          {/* HERO SECTION */}
          <div id="homePage" className="w-full h-screen relative flex">

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
                  className="text-black min-text-xl sm:text-2xl md:text-7xl lg:text-9xl text-center tracking-wider object-contain"
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
              <button
                onClick={() => handleCameraChange([-7.5, 1.5, 0])}
                className="px-3 py-2 bg-transparent text-white rounded text-sm font-calcio hover:bg-[#6B0000] transition-colors"
              >
                Front
              </button>
              <button
                onClick={() => {
                  handleCameraChange([-5, 0.5, 3]);
                  setLookAt([-1, 1, 0]);
                }}
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
            <div className="relative w-full fade-reveal-in h-screen z-5">
              <Canvas
                shadows={{ type: THREE.PCFSoftShadowMap }}
                camera={{ position: [0, 2, 5], fov: 50 }}
              >
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

                <Bm13Evo
                  scale={0.5}
                  position={[0, 0, 0]}
                  castShadow
                  receiveShadow
                />

                <CameraController
                  targetPosition={camPos}
                  targetLookAt={lookAt}
                />
              </Canvas>  
            </div>

          </div>

          {/* MASK SLIDER SECTION */}
          <div
            id="maskSliderContainer"
            className="relative w-full bg-white"
            style={{ height: `${pages.length * 100}vh`}}
          >

            {/* Sticky viewport - pages reveal through clipping mask */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

              {/* All Pages Stacked with Clip Path */}
              {pages.map((page, index) => {
              
                let clipProgress;
                if (index === 0) {
                  clipProgress = 1;
                } else {
                
                  const pageStartProgress = (index - 1) / (pages.length - 1);
                  const pageEndProgress = index / (pages.length - 1);
                  const pageRange = pageEndProgress - pageStartProgress;

                
                  const progressThroughPage = (scrollProgress - pageStartProgress) / pageRange;
                  clipProgress = Math.max(0, Math.min(1, progressThroughPage));
                }

                return (
                  <div
                    key={page.id}
                    className="absolute inset-0 w-full h-screen flex items-center justify-center bg-white"
                    style={{
                      clipPath: `inset(0 0 ${(1 - clipProgress) * 100}% 0)`,
                      WebkitClipPath: `inset(0 0 ${(1 - clipProgress) * 100}% 0)`,
                      zIndex: index,
                      willChange: 'clip-path',
                    }}
                  >
                    {/* CONTENT */}
                    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-[5vw] pt-[80px] sm:pt-[80px] md:pt-[100px] lg:pt-[130px] pb-8 gap-8 lg:gap-12">

                      {/* LEFT - IMAGE */}
                      <div className="w-full lg:w-[45%] h-[40%] lg:h-full relative flex items-center justify-start">
                        <img
                          src={page.image}
                          alt={page.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* RIGHT - CONTENT */}
                      <div className="relative w-full lg:w-[50%] h-full flex flex-col items-center justify-center pl-[2vw] gap-6 lg:gap-8">
                        
                        {/* Page Markers */}
                        <div className="absolute top-0 left-0 right-0 flex flex-col pl-[2vw] items-center gap-4">
                          <div className="flex items-center justify-between w-full">  
                            {pages.map((pg, idx) => (
                              <button
                                key={pg.id}
                                onClick={() => scrollToPage(idx)}
                                className={`font-monument-extended-regular text-sm sm:text-base lg:text-lg transition-all duration-300 text-left ${
                                  currentPage === idx 
                                    ? 'text-[#CC0100] font-bold scale-110' 
                                    : 'text-[#999999] hover:text-[#CC0100]'
                                }`}
                              >
                                {pg.number}
                              </button>
                            ))}
                          </div>
                          
                          {/* Line Indicator */}
                          <div className="relative w-full h-0.5 bg-gray-300">
                            <div
                              className="absolute top-0 h-full bg-[#CC0100]"
                              style={{
                                width: `${scrollProgress * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-black text-sm sm:text-base lg:text-lg leading-relaxed">
                          {page.description}
                        </p>

                        {/* Button */}
                        <button
                          onClick={() => window.location.href = `/${page.id.replace('Page', '')}`}
                          className="group relative px-8 py-4 bg-transparent border-2 border-[#CC0100] text-[#CC0100] 
                                    font-bold text-sm sm:text-base tracking-wider self-start
                                    hover:text-white transition-all duration-300 overflow-hidden"
                          style={{ fontFamily: 'Monument Extended Regular, Arial, sans-serif' }}
                        >
                          <span className="relative z-10">LEARN MORE</span>
                          <div className="absolute inset-0 bg-[#CC0100] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </button>

                        {/* Tagline */}
                        <p className="absolute bottom-0 right-0 font-bold italic text-[#000000] text-sm sm:text-base lg:text-lg">
                          KEEP ACCELERATING FORWARD.
                        </p>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}