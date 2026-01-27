"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const originalWords = ["BRANDS", "PEOPLE", "COMMUNITY", "INDIVIDUAL", "YOU"];
const words = [...originalWords, originalWords[0]]; 

export default function RotatingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // CONFIGURATION:
  // 1. This must match the CSS 'leading' and 'height' EXACTLY.
  // If you change the font size, this relative unit (em) keeps it safe.
  const LINE_HEIGHT_EM = 1.0; 

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    const totalWords = words.length - 1; 

    originalWords.forEach((_, index) => {
      const nextIndex = index + 1;
      
      tl.to(containerRef.current, {
        // FIX: Multiply index by the specific line height
        // Example: 1 * 1.0 = -1.0em, 2 * 1.0 = -2.0em
        y: `-${nextIndex * LINE_HEIGHT_EM}em`, 
        duration: 0.8,
        ease: "power3.inOut",
        delay: 1.5, 
      });

      if (nextIndex === totalWords) {
        tl.to(containerRef.current, {
          y: "0em",
          duration: 0,
          delay: 1.5, 
        });
      }
    });
  }, []);

  return (
    <div 
      className="inline-block relative overflow-hidden align-top"
      // 2. Set the masking height here
      style={{ height: `${LINE_HEIGHT_EM}em` }}
    >
      <div ref={containerRef} className="flex flex-col">
        {words.map((word, i) => (
          <span 
            key={i} 
            className="block text-[#ccff00] font-normal"
            // 3. Set the text line-height here
            style={{ lineHeight: `${LINE_HEIGHT_EM}em` }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}