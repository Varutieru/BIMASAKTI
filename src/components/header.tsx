"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "OUR CARS", href: "/cars" },
  { label: "NEWS", href: "/news" },
  { label: "SPONSORS", href: "/sponsors" },
  { label: "GALLERY", href: "/gallery" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-screen h-[120px] px-4 md:px-[50px] pt-4 md:pt-[40px] flex items-center box-border">
      <div className="w-full h-[120px] px-4 md:px-[50px] pt-4 md:pt-[40px] flex items-center box-border justify-between">
        {/* LOGO */}
        <div className="relative w-[80px] h-[56px] md:w-[114px] md:h-[80px] flex-shrink-0">
          <Image
            src="/assets/header/logobimsakblack.svg"
            alt="Logo Bimasakti"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* NAVIGATION BARS*/}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex w-auto h-[56px] md:h-[80px] items-center gap-2 md:gap-[24px]"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 md:px-[20px] py-2 md:py-[10px] text-lg md:text-2xl text-[#AE0101] font-century-gothic-regular transition-all duration-300 overflow-hidden
                before:absolute before:inset-0 before:bg-[#AE0101] before:rounded-full before:w-0 before:h-full before:z-0 before:transition-all before:duration-300
                hover:before:w-full hover:text-white"
              style={{ zIndex: 1 }}
            >
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* HAMBURGER MOBILE */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10"
          onClick={() => setOpen(!open)}
          aria-label="Open navigation"
        >
          <span className="block w-6 h-0.5 bg-[#AE0101] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#AE0101] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#AE0101]"></span>
        </button>

        {/* MOBILE MENU */}
        {open && (
          <div className="absolute top-[120px] left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden z-50">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full text-center py-4 text-lg text-[#AE0101] font-century-gothic-regular border-b"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;