"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Menu from "./Menu";

// --- COMPONENT: Animated Nav Link ---
const AnimatedNavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <a
      href={href}
      className="group relative inline-flex pb-1 cursor-pointer font-medium text-white transition-colors duration-300"
    >
      <span className="relative flex overflow-hidden">
        {title.split("").map((char, index) => (
          <span key={index} className="relative inline-block">
            <span
              className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
              style={{ transitionDelay: `${index * 0.02}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            <span
              className="absolute left-0 top-full inline-block text-[#DBFF12] transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
              style={{ transitionDelay: `${index * 0.02}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DBFF12] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out" />
    </a>
  );
};

// --- COMPONENT: Expandable Animated Logo ---
const AnimatedLogo = () => {
  // 1. Helper for the standard visible letters (M1GEL, ., A, S)
  const renderRollingLetter = (char: string, index: number, baseClass: string, hoverClass: string) => (
    <span key={index} className="relative inline-block overflow-hidden">
      <span
        className={`inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full ${baseClass}`}
        style={{ transitionDelay: `${index * 0.02}s` }}
      >
        {char}
      </span>
      <span
        className={`absolute left-0 top-full inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full ${hoverClass}`}
        style={{ transitionDelay: `${index * 0.02}s` }}
      >
        {char}
      </span>
    </span>
  );

  // 2. Helper for the hidden expanding letters ("t your ", "ervice")
  const renderExpandingText = (text: string, startIndex: number) => {
    return (
      <span className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-500 ease-in-out">
        <span className="overflow-hidden flex whitespace-nowrap min-w-0">
          {text.split("").map((char, i) => {
            const index = startIndex + i;
            return (
              <span key={i} className="relative inline-block overflow-hidden">
                <span
                  className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full opacity-0"
                  style={{ transitionDelay: `${index * 0.02}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
                <span
                  className="absolute left-0 top-full inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full text-white"
                  style={{ transitionDelay: `${index * 0.02}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            );
          })}
        </span>
      </span>
    );
  };

  return (
    <div className="cursor-pointer group flex items-center text-3xl font-bold tracking-normal pb-1">
      {/* 1. M1GEL in solid lime-yellow (Indices 0 to 4) */}
      <span className="flex">
        {"M1GEL ".split("").map((char, i) =>
          renderRollingLetter(char, i, "text-[#DBFF12]", "text-[#DBFF12]")
        )}
      </span>

      {/* 2. The Dot in white outline (Index 5) */}
      <span className="flex">
        {renderRollingLetter(".", 5, "text-transparent [-webkit-text-stroke:1px_white]", "text-transparent [-webkit-text-stroke:1px_white]")}
      </span>

      {/* 3. The animated acronym section */}
      <span className="flex relative">
        {/* Letter: 'A' (Index 6) */}
        {renderRollingLetter("A", 6, "text-[#DBFF12]", "text-[#DBFF12]")}

        {/* Hidden word: 't your ' (Indices 7 to 13) */}
        {renderExpandingText("t your ", 7)}

        {/* Letter: 'S' (Index 14) */}
        {renderRollingLetter("S", 14, "text-[#DBFF12]", "text-[#DBFF12]")}

        {/* Hidden word: 'ervice' (Indices 15 to 20) */}
        {renderExpandingText("ervice :)", 15)}
      </span>
    </div>
  );
};


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const isAnimating = useRef(false);

  const { contextSafe } = useGSAP();

  const handleMenuClick = contextSafe(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setIsMenuOpen((prev) => {
      const newState = !prev;

      gsap.to(line1Ref.current, {
        y: newState ? 5 : 0,
        rotation: newState ? 45 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to(line2Ref.current, {
        y: newState ? -5 : 0,
        rotation: newState ? -45 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      return newState;
    });
  });

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex flex-col justify-start bg-[#121212]">
      <div className="flex justify-between items-center w-full px-8 py-3 h-20 ">
        
        {/* Animated Logo */}
        <AnimatedLogo />

        {/* Nav Links */}
        <div className="hidden md:flex md:flex-row justify-between items-center gap-10 uppercase tracking-widest text-sm">
          <AnimatedNavLink title="Home" href="#home" />
          <AnimatedNavLink title="Work" href="#work" />
          <AnimatedNavLink title="Service" href="#service" />
          <AnimatedNavLink title="Contact" href="#contact" />
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={handleMenuClick}
          className="flex items-center justify-center p-2 text-white group z-50 relative md:hidden"
          aria-label="Toggle Menu"
        >
          <div className="relative w-5 h-[12px] flex flex-col justify-between items-center">
            <span
              ref={line1Ref}
              className="w-full h-[2px] bg-white block rounded-full origin-center"
            />
            <span
              ref={line2Ref}
              className="w-full h-[2px] bg-white block rounded-full origin-center"
            />
          </div>
        </button>
      </div>

      <hr className="border-t border-gray-700 w-full" />
      <Menu isMenuOpen={isMenuOpen} />
    </nav>
  );
}