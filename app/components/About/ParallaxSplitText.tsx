"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSplitText() {
  const containerRef = useRef(null);
  
  // Refs for the text inside each column
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 55%", 
        end: "bottom top",   
        scrub: 1, // Smooth catch-up effect
      },
    });

    // Animate the text INSIDE the stationary columns.
    tl.to(text1.current, { xPercent: -45 }, 0); 
    tl.to(text2.current, { xPercent: -35 }, 0);  
    
    tl.to(text3.current, { xPercent: 35 }, 0);   
    tl.to(text4.current, { xPercent: 45 }, 0);  

  }, { scope: containerRef });

  // CHANGED: text-white -> text-[#DBFF12]
  // CHANGED: text-[15vw] -> text-[23vw] to make it span the entire width
  // ADDED: tracking-tighter to pull the letters slightly closer together for a bolder look
  const textStyles = "absolute top-1/2 -translate-y-1/2 w-[400%] text-[27vw] tracking-tighter font-black text-[#DBFF12] text-center whitespace-nowrap leading-none";

  return (
    <div ref={containerRef} className="relative w-full h-auto bg-[#121212]">
      
      <div className="sticky top-0 w-full h-64 flex">
        
        {/* Column 1 */}
        <div className="relative w-1/4 h-full overflow-hidden border-none">
          <h1 ref={text1} className={`${textStyles} left-0`}>
            ACTION
          </h1>
        </div>

        {/* Column 2 */}
        <div className="relative w-1/4 h-full overflow-hidden border-none">
          <h1 ref={text2} className={`${textStyles} left-[-100%]`}>
            ACTION
          </h1>
        </div>

        {/* Column 3 */}
        <div className="relative w-1/4 h-full overflow-hidden border-none">
          <h1 ref={text3} className={`${textStyles} left-[-200%]`}>
            ACTION
          </h1>
        </div>

        {/* Column 4 */}
        <div className="relative w-1/4 h-full overflow-hidden border-none">
          <h1 ref={text4} className={`${textStyles} left-[-300%]`}>
            ACTION
          </h1>
        </div>

      </div>
    </div>
  );
}