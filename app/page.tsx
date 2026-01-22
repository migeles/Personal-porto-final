import Image from "next/image";
import Hero from "./components/Hero";
<<<<<<< HEAD
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="main-font w-full h-screen  bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Navbar />
=======

export default function Home() {
  return (
    <div className="w-full h-screen  bg-zinc-50 font-sans dark:bg-black main-font">
     <Hero/>
>>>>>>> cea5e5115e0512ed73f969a83fda4e72342aab9e
    </div>
  );
}
