import React from "react";

const links = [
  { name: "ABOUT", href: "#" },
  { name: "WORK", href: "#" },
  { name: "SERVICES", href: "#" },
  { name: "CONTACT", href: "#" },
];

export default function Direction() {
  return (
    <section className="w-full bg-[#121212] px-3 flex flex-col justify-center">
    
      {/* Menu Links Container */}
      {/* max-w-3xl keeps the arrows relatively close to the text like in your image */}
      <div className="flex flex-col w-full">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="group flex items-center justify-between py-0 cursor-pointer"
          >
            {/* Link Text */}
            <span className="text-white text-5xl md:text-8xl leading-none uppercase tracking-tight transition-colors duration-300 main-font-light group-hover:text-[#DBFF12]">
              {link.name}
            </span>

            {/* Geometric Arrow */}
            {/* CHANGED: transition-transform -> transition-all */}
            {/* ADDED: xl:opacity-0 xl:group-hover:opacity-100 */}
            <span className="text-[#DBFF12] text-5xl md:text-7xl transition-all duration-300 xl:opacity-0 xl:group-hover:opacity-100 group-hover:translate-x-3 group-hover:-translate-y-3">
              <svg 
                width="1em" 
                height="1em" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="miter"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </a>
        ))}
      </div>
      
    </section>
  );
}