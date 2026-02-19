"use client";
import FluidGradient from "./FluidGradient"; // Make sure this path is correct
import Decorlogo from "../../assets/image/shine-img.png"; // Your star icon
import SliderName from "./SliderName";
import RotatingText from "./RotatingText";

export default function Hero() {
  return (
    <section className='w-full min-h-screen bg-[#0a0a0a] text-white md:px-10 pt-24 pb-12 flex flex-col justify-start'>
      {/* 1. TOP HEADLINE */}
      <div className='w-full max-w-350 mx-auto mb-5 px-4'>
        <h1 className='text-4xl md:text-7xl font-normal leading-[1] tracking-tight'>
          CREATING <br />
          BEAUTIFUL <br />
          WEBSITES <br />
          FOR <RotatingText />
        </h1>
      </div>

      {/* 2. THE FLUID GRADIENT CARD */}
      <div className='w-full max-w-350  mx-auto relative px-4'>
        <div className='w-full h-auto md:h-120 rounded-[1rem] overflow-hidden relative border border-white/5'>
          {/* The fluid simulation lives inside here */}
          <FluidGradient className=' w-full aspect-square' />
        </div>
      </div>

      {/* 3. BIG FOOTER NAMES */}
      <SliderName />
      <div>
        <hr className='border-white opacity-20 ' />
        <div className="flex w-full text-sm justify-between pt-3 pb-1 p-4 p">
          <h1 className="font-light yel">Web Developer. <span className="font-bold text-[#DBFF12]">Open for Freelance.</span></h1>
          <h1>Indonesia</h1>
        </div>
        <hr className='opa border-white opacity-20' />


      </div>
    </section>
  );
}
