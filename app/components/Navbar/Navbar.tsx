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
  
  // New refs for the hamburger lines
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

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

    // Toggle State using a callback to ensure we have the latest state
    setIsMenuOpen((prev) => {
      const newState = !prev;

      // Animate top line (moves down and rotates 45deg)
      gsap.to(line1Ref.current, {
        y: newState ? 5 : 0,
        rotation: newState ? 45 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Animate bottom line (moves up and rotates -45deg)
      gsap.to(line2Ref.current, {
        y: newState ? -5 : 0,
        rotation: newState ? -45 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Unlock it when the hamburger animation finishes
          isAnimating.current = false;
        },
      });

      // Existing Shine Animation (Wrapped in a null check just in case it isn't rendered yet)
      if (shineRef.current) {
        gsap.to(shineRef.current, {
          rotation: "+=360",
          duration: 1,
          ease: "power2.inOut",
          keyframes: {
            scale: [1, 1.5, 1],
          },
        });
      }

      return newState;
    });
  });

  return (
    <nav className='fixed top-0 left-0 z-50 w-full flex flex-col justify-start bg-[#121212]'>
      <div className='flex justify-between items-center w-full px-4 py-3 h-20'>
        <div className='cursor-pointer text-white'>
          {/* <img
            ref={logoRef}
            src={decorlogo.src}
            alt='Brand Logo'
            className='w-12 h-12 object-contain'
          /> */}
          <h1 className="text-[#DBFF12] text-3xl">
            Migel's <span className="text-white">Portofolio</span>
          </h1>
        </div>

        <button
          onClick={handleMenuClick}
          className='flex items-center justify-center p-2 text-white group z-50 relative'
          aria-label="Toggle Menu"
        >
          {/* Hamburger Icon Container */}
          <div className="relative w-5 h-[12px] flex flex-col justify-between items-center">
            {/* Top Line */}
            <span 
              ref={line1Ref} 
              className="w-full h-[2px] bg-white block rounded-full origin-center" 
            />
            {/* Bottom Line */}
            <span 
              ref={line2Ref} 
              className="w-full h-[2px] bg-white block rounded-full origin-center" 
            />
          </div>
        </button>
      </div>
      
      {/* The standard HTML way (better for accessibility) */}
      <hr className='border-t border-gray-700' />
      <Menu isMenuOpen={isMenuOpen} />
    </nav>
  );
}