"use client";
import FluidGradient from "./FluidGradient"; // Make sure this path is correct
import Decorlogo from "../../assets/image/shine-img.png"; // Your star icon
import SliderName from "./SliderName";
import RotatingText from "./RotatingText";
import SectionBorder from "./SectionBorder";

export default function Hero() {
  return (
    <section className="w-full min-h-auto bg-[#121212] text-white pt-20 pb-12 flex flex-col justify-start">
      {/* 1. TOP HEADLINE */}
      <div className="md:flex md:justify-around md:w-full md:pt-4">
        <div className="w-full max-w-350 mx pt-10  pb-12 px-4">
          <h1 className="text-6xl font-normal leading-[1] tracking-tight | md:text-6xl ">
            CREATING <br />
            BEAUTIFUL WEBSITES <br />
            FOR <RotatingText />
          </h1>
        </div>

        {/* 2. THE FLUID GRADIENT CARD */}
        {/* <div className="w-full max-w-350  mx-auto relative px-4"> */}
          {/* <div className="w-full h-auto  rounded-[1rem] overflow-hidden relative border border-white/5"> */}
            {/* The fluid simulation lives inside here */}
            {/* <FluidGradient className=" w-full md:w-64 aspect-square" /> */}
          {/* </div> */}
        {/* </div> */}

        <div className="w-full flex justify-center md:justify-end px-4">
          {/* Adjusted the sizing and border-radius to better match your image */}
          <div className="w-full  md:max-w-[350px] aspect-square rounded-[2rem] overflow-hidden relative border border-white/5">
            <FluidGradient className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* 3. BIG FOOTER NAMES */}
      <SliderName />
      <hr className="border-white opacity-20" />

      <SectionBorder
        leftText="(REF — A.01)"
        primaryText="Web Developer."
        highlightText="Open for Freelance."
        
        secondaryText="Indonesia"
      />
    </section>
  );
}
