"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import decorlogo from "../../assets/image/shine-img.webp";

export default function SliderName() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sliderRef.current, {
        xPercent: -50, // Move exactly half the total width
        repeat: -1, // Infinite loop
        duration: 50, // Speed (higher is slower)
        ease: "none", // Linear movement (no speeding up/slowing down)
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  // Single unit of content
  const ContentItem = () => (
    <div className="flex items-center shrink-0">
      <span className="text-7xl md:text-9xl font-semibold text-white mx-6">
        Migel Sastrawan Sugiarto
      </span>
      <img
        // Safely extracts the string whether the import is a raw URL or a Next.js StaticImageData object
        src={typeof decorlogo === "string" ? decorlogo : decorlogo.src}
        alt="shine"
        className="w-10 h-10 md:w-14 md:h-14 object-contain mx-6"
      />
    </div>
  );

  return (
    <div className="w-full  overflow-hidden pt-16 pb-5">
      <div ref={sliderRef} className="flex w-max">
        {/* Set 1: Covers the screen */}
        <div className="flex">
          <ContentItem />
          <ContentItem />
          <ContentItem />
          <ContentItem />
        </div>
        {/* Set 2: The duplicate for the seamless loop */}
        <div className="flex">
          <ContentItem />
          <ContentItem />
          <ContentItem />
          <ContentItem />
        </div>
      </div>
    </div>
  );
}
