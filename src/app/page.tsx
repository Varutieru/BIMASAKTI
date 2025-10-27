"use client";

import Header from "@/components/header";
import { Canvas } from "@react-three/fiber";
import Bm13Evo from "@/components/Bm13Evo";
import CameraController from "@/components/cameraController";
import { useState, useEffect, Suspense } from "react";
import * as THREE from "three";

export default function HomePage() {
  const [camPos, setCamPos] = useState<[number, number, number]>([-7.5, 1.5, 0]);
  const [lookAt, setLookAt] = useState<[number, number, number]>([-1, 1, 0]);
  const [showTitle, setShowTitle] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetPage, setTargetPage] = useState(0);
  const [isDraggingSilver, setIsDraggingSilver] = useState(false);
  const [silverStartX, setSilverStartX] = useState(0);
  const [silverDragOffset, setSilverDragOffset] = useState(0);

  const pages = [
    { 
      id: 'aboutUsPage', 
      title: 'ABOUT US', 
      number: 'About Us',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/assets/slider/aboutUs.png'
    },
    { 
      id: 'ourCarsPage', 
      title: 'OUR CARS', 
      number: 'Our Cars',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '/assets/slider/news.svg'
    },
    { 
      id: 'newsPage', 
      title: 'NEWS', 
      number: 'News',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      image: '/assets/slider/news.svg'
    },
    { 
      id: 'contactPage', 
      title: 'CONTACT', 
      number: 'Contact',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro',
      image: '/assets/slider/news.svg'
    },
    { 
      id: 'GalleryPage', 
      title: 'GALLERY', 
      number: 'Gallery',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae',
      image: '/assets/slider/news.svg'
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

  const handleSilverMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingSilver(true);
    setSilverStartX(e.pageX);
    e.currentTarget.style.cursor = 'grabbing';
  };

  const handleSilverMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSilver) return;
    e.preventDefault();
    const deltaX = e.pageX - silverStartX;
    setSilverDragOffset(deltaX);
  };

  const handleSilverMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingSilver(false);
    setSilverDragOffset(0);
    e.currentTarget.style.cursor = 'grab';
  };

  const handleSilverMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingSilver) {
      setIsDraggingSilver(false);
      setSilverDragOffset(0);
      e.currentTarget.style.cursor = 'grab';
    }
  };

  return (
     <main>
      <div className="bg-white relative max-w-screen min-h-screen">
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
                  className="text-black min-text-xl sm:text-2xl md:text-7xl lg:text-9xl text-center tracking-wider object-contain"
                  style={{ fontFamily: 'Monument Extended Regular, Arial, sans-serif' }}
                >
                  BIMASAKTI
                </h1>
              </div>
            )}

            {/* EXPLORE BUTTON */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[8vh] sm:bottom-[10vh] z-40 hover:drop-shadow-[10px_5px_0_rgba(242,1,60,1)] sm:hover:drop-shadow-[15px_8px_0_rgba(242,1,60,1)] md:hover:drop-shadow-[20px_10px_0_rgba(242,1,60,1)] transition-all duration-[340ms]">
              <button
                onClick={() => {
                  scrollToSection()
                }}
                type="button"
                className="flex items-center justify-center bg-[#CC0100]
                          w-32 h-10
                          sm:w-40 sm:h-12
                          md:w-48 md:h-14
                          lg:w-56 lg:h-16
                          xl:w-64 xl:h-16
                          relative overflow-hidden text-white shadow-2xl
                          transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#050014]
                          before:transition-all before:duration-[340ms] hover:text-white hover:before:left-0 hover:before:w-full active:before:bg-[#003A6C] active:before:transition-none">
                <p className="relative z-10 text-xs sm:text-sm md:text-base lg:text-lg font-monument-extended-regular font-bold">
                  EXPLORE NOW
                </p>
              </button>
            </div>

            {/* Camera Control Buttons */}
            <div className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 md:gap-4 bg-[#CC0100] rounded-full py-3 px-2 sm:py-4 sm:px-2.5 md:py-5 md:px-3 lg:py-6 lg:px-3 z-10">
              <button
                onClick={() => handleCameraChange([-7.5, 1.5, 0])}
                className="px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 bg-transparent text-white rounded text-xs sm:text-sm md:text-base font-calcio hover:bg-[#6B0000] transition-colors whitespace-nowrap"
              >
                Front
              </button>
              <button
                onClick={() => {
                  handleCameraChange([-5, 0.5, 3]);
                  setLookAt([-1, 1, 0]);
                }}
                className="px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 bg-transparent text-white rounded text-xs sm:text-sm md:text-base font-calcio hover:bg-[#6B0000] transition-colors whitespace-nowrap"
              >
                Front Left
              </button>
              <button
                onClick={() => handleCameraChange([3, 8, 0])}
                className="px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 bg-transparent text-white rounded text-xs sm:text-sm md:text-base font-calcio hover:bg-[#6B0000] transition-colors whitespace-nowrap"
              >
                Top
              </button>
              <button
                onClick={() => handleCameraChange([3, 1, -2])}
                className="px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 bg-transparent text-white rounded text-xs sm:text-sm md:text-base font-calcio hover:bg-[#6B0000] transition-colors whitespace-nowrap"
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

                <Suspense fallback={null}>
                  <Bm13Evo
                    scale={0.5}
                    position={[0, 0, 0]}
                    castShadow
                    receiveShadow
                  />
                </Suspense>

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
            className="relative w-screen bg-white"
            style={{ height: `${pages.length * 100}vh`}}
          >

            {/* Sticky viewport - pages reveal through clipping mask */}
            <div className="sticky top-0 w-screen h-screen flex items-center justify-center overflow-hidden">

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
                    className="absolute inset-0 w-screen h-screen flex items-center justify-center bg-white"
                    style={{
                      clipPath: `inset(0 0 ${(1 - clipProgress) * 100}% 0)`,
                      WebkitClipPath: `inset(0 0 ${(1 - clipProgress) * 100}% 0)`,
                      zIndex: index,
                      willChange: 'clip-path',
                      ...(page.id === 'ourCarsPage' && {
                        backgroundImage: 'url(/assets/slider/bg/ourCars.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'left center',
                        backgroundRepeat: 'no-repeat',
                      }),
                    }}
                  >
                    {/* CONTENT */}
                    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-[5vw] pt-[80px] sm:pt-[80px] md:pt-[100px] lg:pt-[130px] pb-8 gap-8 lg:gap-12 overflow-hidden">

                      {/* LEFT - IMAGE */}
                      <div className="w-full lg:w-[45%] h-[40%] lg:h-full relative flex items-center justify-start overflow-hidden">
                        <img
                          src={page.image}
                          alt={page.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* RIGHT - CONTENT */}
                      <div className="relative w-full lg:w-[50%] h-full flex flex-col items-center justify-center pl-[2vw] overflow-hidden">

                        {/* Glassmorphism Wrapper */}
                        <div className={`w-full p-8 ${
                          page.id === 'ourCarsPage'
                            ? ' bg-black/20 backdrop-blur-md border border-white/20'
                            : ''
                        }`}>

                          {/* Content Group */}
                          <div className="w-full flex flex-col gap-6 lg:gap-8">

                          {/* Page Markers */}
                          <div className="w-full flex flex-col items-center gap-4">
                            <div className="flex items-center justify-between w-full">
                              {pages.map((pg, idx) => {
                                const isOurCarsPage = page.id === 'ourCarsPage';
                                const isActive = currentPage === idx;

                                let buttonClasses = 'font-monument-extended-regular text-[8px] sm:text-xs lg:text-sm transition-all duration-300 text-left';

                                if (isActive) {
                                  buttonClasses += isOurCarsPage
                                    ? ' text-[#FFCA01] font-bold scale-110'
                                    : ' text-[#CC0100] font-bold scale-110';
                                } else if (isOurCarsPage) {
                                  buttonClasses += ' text-white hover:!text-[#FFCA01]';
                                } else {
                                  buttonClasses += ' text-[#999999] hover:!text-[#CC0100]';
                                }

                                return (
                                  <button
                                    key={pg.id}
                                    onClick={() => scrollToPage(idx)}
                                    className={buttonClasses}
                                  >
                                    {pg.number}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Line Indicator */}
                            <div className="relative w-full h-0.5 bg-gray-300">
                              <div
                                className={`absolute top-0 h-full ${
                                  page.id === 'ourCarsPage' ? 'bg-[#FFCA01]' : 'bg-[#CC0100]'
                                }`}
                                style={{
                                  width: `${scrollProgress * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Description */}
                          <p className={`text-sm sm:text-base lg:text-lg font-century-gothic-regular leading-relaxed ${
                            page.id === 'ourCarsPage' ? 'text-white' : 'text-black'
                          }`}>
                            {page.description}
                          </p>

                          {/* Button */}
                          <button
                            onClick={() => window.location.href = `/${page.id.replace('Page', '')}`}
                            className={`group relative w-full px-8 py-4 bg-transparent border-2 font-bold text-sm sm:text-base tracking-wider hover:text-white transition-all duration-300 overflow-hidden ${
                              page.id === 'ourCarsPage'
                                ? 'border-[#FFCA01] text-[#FFCA01]'
                                : 'border-[#CC0100] text-[#CC0100]'
                            }`}
                            style={{ fontFamily: 'Monument Extended Regular, Arial, sans-serif' }}
                          >
                            <span className="relative z-10">LEARN MORE</span>
                            <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${
                              page.id === 'ourCarsPage' ? 'bg-[#FFCA01]' : 'bg-[#CC0100]'
                            }`}></div>
                          </button>

                          {/* Tagline */}
                          <p className={`w-full text-right font-bold italic text-sm sm:text-base lg:text-lg ${
                            page.id === 'ourCarsPage' ? 'text-[#FFCA01]' : 'text-[#000000]'
                          }`}>
                            KEEP ACCELERATING FORWARD.
                          </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        {/* SPONSOR SECTION */}
        <div id="sponsorPage" className="w-screen h-screen bg-white relative overflow-hidden">

          {/* OUR SPONSORS TITLE */}
          <div className="w-screen bg-[#CC0100] flex items-center justify-center py-4 sm:py-5 md:py-6 lg:py-8 mt-[80px] sm:mt-[80px] md:mt-[100px] lg:mt-[130px]">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
              style={{ fontFamily: 'Monument Extended Regular, Arial, sans-serif' }}
            >
              OUR SPONSORS
            </h2>
          </div>

          {/* Sponsors Container */}
          <div className="w-full h-[calc(100vh-80px-2rem)] sm:h-[calc(100vh-80px-2.5rem)] md:h-[calc(100vh-100px-3rem)] lg:h-[calc(100vh-130px-4rem)] flex flex-col justify-center items-center px-4 gap-4 md:gap-6 lg:gap-8">

            {/* EXCLUSIVE */}
            <div className="w-full flex justify-center items-center">
              <img
                src="/assets/sponsors/exclusive/jembo.svg"
                alt="Jembo"
                className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto object-contain"
              />
            </div>

            {/* PLATINUM */}
            <div className="w-full flex justify-center items-center gap-6 md:gap-8 lg:gap-12 flex-wrap">
              <img
                src="/assets/sponsors/platinum/qualis.svg"
                alt="Quails"
                className="h-14 sm:h-16 md:h-24 lg:h-28 w-auto object-contain"
              />
              <img
                src="/assets/sponsors/platinum/kissoft.svg"
                alt="Kissoft"
                className="h-14 sm:h-16 md:h-24 lg:h-28 w-auto object-contain"
              />
            </div>

            {/* GOLD */}
            <div className="w-full flex justify-center items-center gap-4 md:gap-6 lg:gap-10 flex-wrap">
              <img
                src="/assets/sponsors/gold/caditansys.svg"
                alt="Caditansys"
                className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain"
              />
              <img
                src="/assets/sponsors/gold/bluebird.svg"
                alt="Bluebird"
                className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            {/* SILVER */}
            <div
              className="sponsor-scroll-container cursor-grab select-none"
              onMouseDown={handleSilverMouseDown}
              onMouseMove={handleSilverMouseMove}
              onMouseUp={handleSilverMouseUp}
              onMouseLeave={handleSilverMouseLeave}
            >
              <div
                className={`sponsor-scroll-content sponsor-scroll-content-silver items-center ${isDraggingSilver ? 'paused' : ''}`}
                aria-hidden="true"
                style={isDraggingSilver ? { transform: `translate3d(${silverDragOffset}px, 0, 0)` } : undefined}
              >
                <img src="/assets/sponsors/silver/altium.svg" alt="Altium" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/solidbase.svg" alt="Solidbase" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altiumdes.svg" alt="Altium Designer" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/vale.svg" alt="Vale" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/rapidharness.svg" alt="Rapid Harness" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/motul.svg" alt="Motul" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/ekraf.svg" alt="Ekraf" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altium.svg" alt="Altium" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/solidbase.svg" alt="Solidbase" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altiumdes.svg" alt="Altium Designer" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/vale.svg" alt="Vale" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/rapidharness.svg" alt="Rapid Harness" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/motul.svg" alt="Motul" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/ekraf.svg" alt="Ekraf" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altium.svg" alt="Altium" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/solidbase.svg" alt="Solidbase" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altiumdes.svg" alt="Altium Designer" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/vale.svg" alt="Vale" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/rapidharness.svg" alt="Rapid Harness" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/motul.svg" alt="Motul" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/ekraf.svg" alt="Ekraf" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altium.svg" alt="Altium" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/solidbase.svg" alt="Solidbase" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altiumdes.svg" alt="Altium Designer" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/vale.svg" alt="Vale" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/rapidharness.svg" alt="Rapid Harness" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/motul.svg" alt="Motul" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/ekraf.svg" alt="Ekraf" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altium.svg" alt="Altium" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/solidbase.svg" alt="Solidbase" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altiumdes.svg" alt="Altium Designer" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/vale.svg" alt="Vale" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/rapidharness.svg" alt="Rapid Harness" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/motul.svg" alt="Motul" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/ekraf.svg" alt="Ekraf" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altium.svg" alt="Altium" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/solidbase.svg" alt="Solidbase" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/altiumdes.svg" alt="Altium Designer" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/vale.svg" alt="Vale" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/rapidharness.svg" alt="Rapid Harness" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/motul.svg" alt="Motul" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/silver/ekraf.svg" alt="Ekraf" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain flex-shrink-0" />
              </div>
            </div>

            {/* BRONZE */}
            <div className="sponsor-scroll-container">
              <div className="sponsor-scroll-content items-center" aria-hidden="true">
                <img src="/assets/sponsors/bronze/badaklng.svg" alt="Badak LNG" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/pln.svg" alt="PLN" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/swaragama.svg" alt="Swaragama" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/rekind.svg" alt="Rekind" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakus.svg" alt="Cakra Kus" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakem.svg" alt="Cakra Kem" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/jbl.svg" alt="JBL" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/medco.svg" alt="Medco" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/badaklng.svg" alt="Badak LNG" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/pln.svg" alt="PLN" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/swaragama.svg" alt="Swaragama" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/rekind.svg" alt="Rekind" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakus.svg" alt="Cakra Kus" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakem.svg" alt="Cakra Kem" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/jbl.svg" alt="JBL" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/medco.svg" alt="Medco" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/badaklng.svg" alt="Badak LNG" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/pln.svg" alt="PLN" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/swaragama.svg" alt="Swaragama" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/rekind.svg" alt="Rekind" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakus.svg" alt="Cakra Kus" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakem.svg" alt="Cakra Kem" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/jbl.svg" alt="JBL" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/medco.svg" alt="Medco" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/badaklng.svg" alt="Badak LNG" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/pln.svg" alt="PLN" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/swaragama.svg" alt="Swaragama" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/rekind.svg" alt="Rekind" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakus.svg" alt="Cakra Kus" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/cakrakem.svg" alt="Cakra Kem" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/jbl.svg" alt="JBL" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
                <img src="/assets/sponsors/bronze/medco.svg" alt="Medco" className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain flex-shrink-0" />
              </div>
            </div>

            {/* PERSONAL SUPPORT */}
            <div className="w-full flex justify-center items-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
              <img src="/assets/sponsors/personal/desibel.svg" alt="Decibel" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
              <img src="/assets/sponsors/personal/enviro.svg" alt="Enviro" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
              <img src="/assets/sponsors/personal/europe.svg" alt="Europe" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
              <img src="/assets/sponsors/personal/iatm.svg" alt="IATM" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
              <img src="/assets/sponsors/personal/kenes.svg" alt="Kenes" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
              <img src="/assets/sponsors/personal/sgm.svg" alt="SGM" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain" />
            </div>

          </div>
        </div>

        </div>

      </div>

    </main>
  );
}