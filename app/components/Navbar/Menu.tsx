import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import star from "../../assets/image/shine-img.webp";

interface MenuProps {
  isMenuOpen: boolean;
}

export default function Menu({ isMenuOpen }: MenuProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(container.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(container.current, {
        x: "100%",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [isMenuOpen]);

  // The links as shown in your design
  const navItems = ["ABOUT", "WORK", "SERVICES", "CONTACT"];

  return (
    <div
      ref={container}
      // Changed background to match your site, added pt-32 so it clears the Navbar
      className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-[#121212] text-white flex flex-col justify-between px-8 md:px-12 pt-32 pb-12 z-40 translate-x-full border-l border-white/5 will-change-transform"
    >
      {/* --- Middle Section: Navigation Links --- */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-6 md:gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="group flex items-center justify-between cursor-pointer"
            >
              <h2 className="text-5xl md:text-6xl font-normal text-white group-hover:text-[#DBFF12] transition-colors duration-300 tracking-wide">
                {item}
              </h2>

              {/* The Imported Star Image */}
              <img
                src={star.src}
                alt="Star"
                className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* --- Bottom Section: Let's Connect --- */}
      <div className="mt-auto border-t border-white/10 pt-8">
        <p className="text-gray-400 text-sm mb-6 font-light">Let's connect</p>

        {/* Button Container - Uses flex-wrap so they stack nicely on small phone screens */}
        <div className="flex flex-wrap gap-4">
          <a
            href="tel:+6287887206610"
            className="inline-flex justify-center items-center px-6 py-3 border border-[#DBFF12] rounded-full text-white text-sm hover:bg-[#DBFF12] hover:text-black transition-colors duration-300"
          >
            +6287887206610
          </a>

          <a
            href="mailto:hello@migelssugiarto.xyz"
            className="inline-flex justify-center items-center px-6 py-3 border border-[#DBFF12] rounded-full text-white text-sm hover:bg-[#DBFF12] hover:text-black transition-colors duration-300"
          >
            hello@migelssugiarto.xyz
          </a>
        </div>
      </div>
    </div>
  );
}
