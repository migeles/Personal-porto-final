import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="main-font w-full h-screen  bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Navbar />
    </div>
  );
}
