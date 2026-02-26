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

  useGSAP(
    () => {
      // 1. Create a matchMedia instance
      let mm = gsap.matchMedia();

      // 2. Define your breakpoints and the logic for them
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          // Extract the conditions so we can use them in ternary operators
          let { isDesktop } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              // 3. Apply responsive start and end values!
              start: isDesktop ? "top 55%" : "top 65%",
              end: isDesktop ? "bottom top" : "bottom 20%",
              scrub: 1,
            },
          });

          // You can also make the animation distances responsive
          // e.g., moving less aggressively on smaller mobile screens
          tl.to(text1.current, { xPercent: isDesktop ? -45 : -25 }, 0);
          tl.to(text2.current, { xPercent: isDesktop ? -35 : -15 }, 0);

          tl.to(text3.current, { xPercent: isDesktop ? 35 : 15 }, 0);
          tl.to(text4.current, { xPercent: isDesktop ? 45 : 25 }, 0);
        },
      ); // End of matchMedia block

      // Note: useGSAP automatically cleans up the matchMedia instance when the component unmounts!
    },
    { scope: containerRef },
  );

  const textStyles =
    "absolute top-1/2 -translate-y-1/2 w-[400%] text-[27vw] xl:text-[10vw] tracking-tighter font-black text-[#DBFF12] text-center whitespace-nowrap leading-none";

  return (
    <div ref={containerRef} className='relative w-full h-auto bg-[#121212]'>
      <div className='sticky top-0 w-full h-60 md:h-100 xl:h-60 flex mb-10'>
        {/* Column 1 */}
        <div className='relative w-1/4 h-full overflow-hidden border-none '>
          <h1 ref={text1} className={`${textStyles} left-0`}>
            <span className='xl:hidden'>ACTION</span>
            <span className='hidden xl:inline'>TRUST THE PROCESS</span>
          </h1>
        </div>

        {/* Column 2 */}
        <div className='relative w-1/4 h-full overflow-hidden border-none'>
          <h1 ref={text2} className={`${textStyles} left-[-100%]`}>
            <span className='xl:hidden'>ACTION</span>
            <span className='hidden xl:inline'>TRUST THE PROCESS</span>
          </h1>
        </div>

        {/* Column 3 */}
        <div className='relative w-1/4 h-full overflow-hidden border-none'>
          <h1 ref={text3} className={`${textStyles} left-[-200%]`}>
            <span className='xl:hidden'>ACTION</span>
            <span className='hidden xl:inline'>TRUST THE PROCESS</span>
          </h1>
        </div>

        {/* Column 4 */}
        <div className='relative w-1/4 h-full overflow-hidden border-none'>
          <h1 ref={text4} className={`${textStyles} left-[-300%]`}>
            <span className='xl:hidden'>ACTION</span>
            <span className='hidden xl:inline'>TRUST THE PROCESS</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
