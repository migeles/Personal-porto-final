"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InfiniteSliderGimick() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the sliding wrappers
  const slider1 = useRef<HTMLDivElement>(null);
  const slider2 = useRef<HTMLDivElement>(null);
  const slider3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    
    // 1. Helper function for bulletproof infinite reversing timelines
    const createMarquee = (target: HTMLDivElement | null, duration: number) => {
      return gsap.to(target, {
        xPercent: -50,
        duration: duration,
        repeat: -1,
        ease: "none",
        onReverseComplete() {
          // If the timeline hits 0 while playing backwards, seamlessly jump it forward by 100 iterations
          this.totalTime(this.totalTime() + duration * 100);
        }
      }).totalTime(duration * 100 + (duration / 2)); 
      // ^ Start exactly halfway through the 100th iteration to give it plenty of immediate reverse runway
    };

    // 2. Create the robust looping timelines
    const tl1 = createMarquee(slider1.current, 50);
    const tl2 = createMarquee(slider2.current, 60);
    const tl3 = createMarquee(slider3.current, 45);

    // 3. Set the default movement directions (1 = Left, -1 = Right)
    tl1.timeScale(-1); // Row 1 moves Right
    tl2.timeScale(1);  // Row 2 moves Left
    tl3.timeScale(-1); // Row 3 moves Right

    let currentDir = 1;

    // 4. Track the global scroll direction
    ScrollTrigger.create({
      onUpdate: (self) => {
        if (self.direction !== currentDir) {
          currentDir = self.direction;
          
          gsap.to(tl1, { timeScale: currentDir === 1 ? -1 : 1, duration: 0.5 });
          gsap.to(tl2, { timeScale: currentDir === 1 ? 1 : -1, duration: 0.5 });
          gsap.to(tl3, { timeScale: currentDir === 1 ? -1 : 1, duration: 0.5 });
        }
      }
    });

  }, { scope: containerRef });

  // --- Helpers to render the repeating text blocks ---
  
  const renderRow1 = () => (
    <div className="flex items-center w-max">
      {[...Array(8)].map((_, i) => (
        <span 
          key={i} 
          className={`text-[14vw] md:text-[8vw] font-light leading-[0.85] tracking-tight px-3 md:px-5 ${i % 4 === 1 ? 'text-[#DBFF12]' : 'text-white'}`}
        >
          CREATIVITY
        </span>
      ))}
    </div>
  );

  const renderRow2 = () => (
    <div className="flex items-center w-max">
      {[...Array(8)].map((_, i) => (
        <span 
          key={i} 
          className={`text-[14vw] md:text-[8vw] font-black leading-[0.85] tracking-tight px-3 md:px-5 ${i % 4 === 2 ? 'text-[#DBFF12]' : 'text-white'}`}
        >
          ACTION
        </span>
      ))}
    </div>
  );

  const renderRow3 = () => (
    <div className="flex items-center w-max">
      {[...Array(8)].map((_, i) => (
        <span 
          key={i} 
          className={`text-[14vw] md:text-[8vw] font-light leading-[0.85] tracking-tight px-3 md:px-5 ${i % 4 === 0 ? 'text-[#DBFF12]' : 'text-white'}`}
        >
          INTEGRITY
        </span>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[#121212] overflow-hidden py-20 w-full flex flex-col gap-1 md:gap-2">

      {/* Slider 1 */}
      <div className="relative flex whitespace-nowrap">
        <div ref={slider1} className="flex w-fit">
          {renderRow1()}
          {renderRow1()}
        </div>
      </div>

      {/* Slider 2 */}
      <div className="relative flex whitespace-nowrap">
        <div ref={slider2} className="flex w-fit">
          {renderRow2()}
          {renderRow2()}
        </div>
      </div>

      {/* Slider 3 */}
      <div className="relative flex whitespace-nowrap">
        <div ref={slider3} className="flex w-fit">
          {renderRow3()}
          {renderRow3()}
        </div>
      </div>

    </div>
  );
}