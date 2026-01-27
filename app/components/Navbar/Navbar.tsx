"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import shine from "../../assets/image/shine-img.png";
import decorlogo from "../../assets/image/decor-logo-img.png";
import Menu from "./Menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs
  const logoRef = useRef(null);
  const shineRef = useRef(null);

  // Lock to prevent double-clicking
  const isAnimating = useRef(false);

  const { contextSafe } = useGSAP();

  // 1. Continuous spin for the brand logo
  useGSAP(() => {
    gsap.to(logoRef.current, {
      rotation: -360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  });

  // 2. Click handler with Animation Lock
  const handleMenuClick = contextSafe(() => {
    // If animation is running, stop here (do nothing)
    if (isAnimating.current) return;

    // Lock it
    isAnimating.current = true;

    // Toggle State
    setIsMenuOpen(!isMenuOpen);

    // Run Animation
    gsap.to(shineRef.current, {
      rotation: "+=360",
      duration: 1,
      ease: "power2.inOut",

      keyframes: {
        scale: [1, 1.5, 1],
      },

      // Unlock it when animation finishes
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  });

  return (
    <nav className='fixed top-0 left-0 z-50 w-full flex flex-col justify-start bg-[#121212]'>
      <div className='flex justify-between w-full px-6 py-3 '>
        <div className='cursor-pointer'>
          <img
            ref={logoRef}
            src={decorlogo.src}
            alt='Brand Logo'
            className='w-12 h-12 object-contain'
          />
        </div>

        <button
          onClick={handleMenuClick}
          className='flex items-center gap-3 text-white group z-50 relative'>
          
          <span className='text-lg font-light tracking-wide'>Menu</span>
        </button>
      </div>
      {/* The standard HTML way (better for accessibility) */}
      <hr className='border-t border-gray-700 ' />
      <Menu isMenuOpen={isMenuOpen} />
    </nav>
  );
}
