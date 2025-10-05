"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  return (
    /* HEADER */
    <header className="w-screen min-h-[60px] sm:min-h=[60px] lg:min-h-[120px] px-[5vw] min-pt-[2.5vw] sm:min-pt-[10px] lg:min-pt-[20px] gap-auto flex justify between items-end box-border">

      <div className="flex justify-between items-center w-full">
      {/* LOGO */}
      <div className="min-w-[17.813vw] sm:min-w-[17.813vw] lg:min-w-[5.885vw] min-h-[40px] sm:min-h-[40px] lg:min-h-[80px] relative">
        <Image
          src={"assets/Header/logobimsakblack.svg"}
          alt="Bimasakti Logo"
          fill
          className="object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {/* NAVBAR */}
      <nav
        aria-label = "Primary Navigation"
        className = "hidden: md:flex md:min-w-[65vw] md:h-[60px] items-center justify-between md:gap-auto"
      >
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
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