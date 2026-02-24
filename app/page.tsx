import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import Service from "./components/Service/Service";

export default function Home() {
  return (
    <div className="main-font w-full h-screen  bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Navbar />
      <About/>
      <FeaturedWork/>
      <Service/>
    </div>
  );
}
