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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", 
        end: "top 10%",  
        scrub: 1,
      }
    });

    tl.fromTo(
      progressBarRef.current,
      { width: "0%", backgroundColor: "#ffffff" },
      { width: "100%", backgroundColor: "#DBFF12", ease: "none" },
      0 
    )
    .fromTo(
      textRef.current,
      { color: "#ffffff" },
      { color: "#DBFF12", ease: "none" },
      0 
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='xl:sticky xl:top-24 min-h-auto bg-[#121212]'>
      <div className="flex flex-col justify-center px-4 pt-10 md:px-4 max-w-full xl:pb-20 xl:pt-20">
        
        <h1 className='text-4xl md:text-6xl text-white font-medium leading-tighter mb-4 h-full'>
          I'll help to <br />
          <span ref={textRef} className="text-white">level up</span> your brand
        </h1>
        
        <div className="w-full">
          <div className="w-full h-3 md:h-3 border border-[#DBFF12] rounded-full overflow-hidden">
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