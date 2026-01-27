"use client";
import FluidGradient from "./FluidGradient"; // Make sure this path is correct
import Decorlogo from "../../assets/image/shine-img.png"; // Your star icon
import SliderName from "./SliderName";
import RotatingText from "./RotatingText";

export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-[#0a0a0a] text-white px-4 md:px-10 pt-24 pb-12 flex flex-col justify-between">
      
      {/* 1. TOP HEADLINE */}
      <div className="w-full max-w-350 mx-auto mb-5">
        <h1 className="text-4xl md:text-7xl font-normal leading-[1] tracking-tight">
          CREATING <br />
          BEAUTIFUL <br />
          WEBSITES <br />
          FOR <RotatingText/>
        </h1>
      </div>

      {/* 2. THE FLUID GRADIENT CARD */}
      <div className="w-full max-w-350 mx-auto grow relative">
        <div className="w-full h-[50vh] md:h-162.5 rounded-[1rem] overflow-hidden relative border border-white/5">
          {/* The fluid simulation lives inside here */}
          <FluidGradient className="absolute inset-0" />
          
          {/* Optional: Grain overlay if you want extra texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      </div>

      {/* 3. BIG FOOTER NAMES */}
      <SliderName/>

    </section>
  );
}