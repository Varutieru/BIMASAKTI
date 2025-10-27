"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const handleSponsorsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const sponsorSection = document.getElementById('sponsorPage');
      if (sponsorSection) {
        window.scrollTo({
          top: sponsorSection.offsetTop,
          behavior: "smooth"
        });
      }
    } else {
      e.preventDefault();
      router.push("/");
      setTimeout(() => {
        const sponsorSection = document.getElementById('sponsorPage');
        if (sponsorSection) {
          window.scrollTo({
            top: sponsorSection.offsetTop,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "/" && pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else if (href === "/sponsors") {
      if (pathname === "/") {
        const sponsorSection = document.getElementById('sponsorPage');
        if (sponsorSection) {
          window.scrollTo({
            top: sponsorSection.offsetTop,
            behavior: "smooth"
          });
        }
      } else {
        router.push("/");
        setTimeout(() => {
          const sponsorSection = document.getElementById('sponsorPage');
          if (sponsorSection) {
            window.scrollTo({
              top: sponsorSection.offsetTop,
              behavior: "smooth"
            });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="w-full min-h-[20px] sm:min-h-[60px] md:min-h-[90px] lg:min-h-[120px] px-[5vw] min-pt-[2vw] sm:min-pt-[2vw] lg:min-pt-[2vw] gap-auto flex justify-between items-center box-border">

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


          {/* DESKTOP NAVBAR */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex md:min-w-[65vw] min-h-[100px] md:min-h-[110px] lg:min-h-[120px] items-center justify-between md:gap-auto"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={
                  item.href === "/"
                    ? handleHomeClick
                    : item.href === "/sponsors"
                    ? handleSponsorsClick
                    : undefined
                }
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

          {/* HAMBURGER BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50 relative"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-[#AE0101] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#AE0101] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#AE0101] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>

        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <nav
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="flex flex-col h-full pt-24 px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleMobileNavClick(item.href)}
              className="py-4 text-lg text-[#AE0101] font-century-gothic-regular border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Header;