"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const words = ["BRANDS", "PEOPLE", "COMMUNITY", "INDIVIDUAL", "YOU"];

export default function RotatingText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((_, index) => {
      const nextIndex = (index + 1) % words.length;
      const currentLetters = `.word-${index} .letter`;
      const nextLetters = `.word-${nextIndex} .letter`;

      tl.to({}, { duration: 2.0 }) // 1. WAIT 2 seconds
        
        // 2. Move Current Word UP (Exit)
        .to(currentLetters, {
          y: "-100%", 
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.inOut",
        })
        
        // 3. Move Next Word UP (Enter)
        // We don't need "from" y:100% here because CSS already put it there!
        .to(nextLetters, {
            y: "0%", 
            duration: 0.5,
            stagger: 0.03,
            ease: "power2.inOut",
          },
          "<" // Sync with previous animation
        )
        
        // 4. RESET the old word to bottom (y:100%) for the next loop
        .set(currentLetters, { y: "100%" });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative inline-grid align-top text-[#ccff00] font-normal overflow-hidden"
    >
      {/* GHOST WORD (Keeps container width stable) */}
      <span className="invisible col-start-1 row-start-1 pointer-events-none">
        INDIVIDUAL
      </span>

      {/* RENDER WORDS */}
      {words.map((word, wordIndex) => {
        // CSS TRICK:
        // If it's the first word (Index 0), set CSS to 0 (visible).
        // If it's any other word, set CSS to full (hidden at bottom).
        // This prevents the "Flash" or "Skip" because it happens before JS loads.
        const initialY = wordIndex === 0 ? "translate-y-0" : "translate-y-full";

        return (
          <div
            key={wordIndex}
            className={`col-start-1 row-start-1 flex overflow-hidden word-${wordIndex}`}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                // Apply the translate class to the LETTER itself
                className={`inline-block letter ${initialY}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}