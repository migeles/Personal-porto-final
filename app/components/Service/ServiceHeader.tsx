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
  const textRef = useRef(null);

  useGSAP(() => {
    // 1. Create a timeline attached to the ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", 
        end: "top 10%",  
        scrub: 1,
      }
    });

    // 2. Animate the bar's width AND background color smoothly
    tl.fromTo(
      progressBarRef.current,
      { width: "0%", backgroundColor: "#ffffff" },
      { width: "100%", backgroundColor: "#DBFF12", ease: "none" },
      0 // The '0' tells it to start at the very beginning of the timeline
    )
    // 3. Animate the text color simultaneously
    .fromTo(
      textRef.current,
      { color: "#ffffff" },
      { color: "#DBFF12", ease: "none" },
      0 // Also starts at '0' so it perfectly syncs with the bar
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='min-h-auto bg-[#121212]'>
      

      <div className="flex flex-col justify-center px-4 pt-10 md:px-12 max-w-5xl">
        {/* Headline */}
        <h1 className='text-4xl md:text-6xl text-white font-medium leading-tight mb-4'>
          I'll help to <br />
          <span ref={textRef} className="text-white">level up</span> your brand
        </h1>

        {/* The Animated Progress Bar */}
        <div className="w-full">
          {/* The Track (Yellow Outline) */}
          <div className="w-full h-3 md:h-8 border border-[#DBFF12] rounded-full overflow-hidden">
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