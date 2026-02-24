"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionBorder from "../Hero/SectionBorder";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceHeader() {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null); // 1. Added a ref for the text

  useGSAP(() => {
    gsap.fromTo(
      progressBarRef.current,
      { width: "0%", backgroundColor: "#ffffff" }, // Explicit starting state
      {
        width: "100%", // Animate to full width
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", 
          end: "center 70%", 
          scrub: 1,
          
          onUpdate: (self) => {
            if (self.progress >= 0.99) {
              // Bar turns yellow
              gsap.to(progressBarRef.current, { 
                backgroundColor: "#DBFF12", 
                duration: 0.2, 
                overwrite: "auto" 
              });
              // Text turns yellow
              gsap.to(textRef.current, {
                color: "#DBFF12",
                duration: 0.2,
                overwrite: "auto"
              });
            } else {
              // Revert Bar to White
              gsap.to(progressBarRef.current, { 
                backgroundColor: "#ffffff", 
                duration: 0.2, 
                overwrite: "auto" 
              });
              // Revert Text to White
              gsap.to(textRef.current, {
                color: "#ffffff",
                duration: 0.2,
                overwrite: "auto"
              });
            }
          }
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='min-h-screen bg-[#121212]'>
      <SectionBorder
        primaryText='My Service'
        highlightText=''
        secondaryText='2025-2026'
      />

      <div className="flex flex-col justify-center px-4 pt-10 md:px-12 max-w-5xl">
        {/* Headline */}
        <h1 className='text-4xl md:text-6xl text-white font-medium leading-tight mb-4'>
          I'll help to <br />
          {/* 2. Attached the ref and set the initial color to white */}
          <span ref={textRef} className="text-white">level up</span> your brand
        </h1>

        {/* The Animated Progress Bar */}
        <div className="w-full">
          {/* The Track (Yellow Outline) */}
          <div className="w-full h-3 md:h-8 border border-[#DBFF12] rounded-full p overflow-hidden">
            {/* The Filler */}
            <div 
              ref={progressBarRef} 
              className="h-full rounded-full w-0" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}