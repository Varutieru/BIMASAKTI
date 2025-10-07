"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import path from "path";

/* NAV ITEMS */
const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "OUR CARS", href: "/cars" },
  { label: "NEWS", href: "/news" },
  { label: "CONTACT", href: "/contact" },
  { label: "SPONSORS", href: "/sponsors" },
  { label: "GALLERY", href: "/gallery" },
];


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    /* HEADER */
    <header className="w-screen min-h-[60px] sm:min-h-[60px] md:min-h-[90px] lg:min-h-[120px] px-[5vw] min-pt-[2vw] sm:min-pt-[2vw] lg:min-pt-[2vw] gap-auto flex justify between items-center box-border">

      <div className="flex justify-between items-center w-full">
      {/* LOGO */}
      <div className="min-w-[17.813vw] sm:min-w-[17.813vw] lg:min-w-[5.885vw] min-h-[60px] sm:min-h-[60px] md:min-h-[80px] lg:min-h-[100px] relative">
        <button>
        <Image
          src={"assets/Header/logobimsakblack.svg"}
          alt="Bimasakti Logo"
          fill
          className="object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />
        </button>
      </div>
      

      {/* NAVBAR */}
      <nav
        aria-label = "Primary Navigation"
        className = "hidden: md:flex md:min-w-[65vw] min-h-[100px] md:min-h-[110px] lg:min-h-[120px] items-center justify-between md:gap-auto"
      >
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={item.href === "/" ? handleHomeClick : undefined}
            className="relative rounded-full px-4 md:px-[20px] py-2 md:py-[10px] text-[#AE0101] font-century-gothic-regular transition-all duration-300 overflow-hidden
                before:absolute before:inset-0 before:bg-[#AE0101] before:rounded-full before:w-0 before:h-full before:z-0 before:transition-all before:duration-300
                hover:before:w-full hover:text-white text-xs sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg"
            style={{ zIndex: 1 }}
          >
            <span className="relative z-10">
              {item.label}
            </span>
          </Link>
        ))} 
      </nav>

      
      </div>
    </header>
  );
}

export default Header;