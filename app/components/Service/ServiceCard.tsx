import React from "react";

// The blueprint for the props
export interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  isLast?: boolean;
}

export default function ServiceCard({ 
  number, 
  title, 
  description, 
  bullets, 
  isLast 
}: ServiceCardProps) {
  return (
    <div className={`relative p-6 md:p-10 flex flex-col gap-4 ${isLast ? "" : "border-b border-[#DBFF12]"}`}>
      
      {/* Background Number */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 text-white text-4xl md:text-5xl font-bold tracking-tighter">
        {number}
      </div>

      {/* Title */}
      <h3 className="text-[#DBFF12] font-bold text-sm md:text-base w-3/4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm md:text-base leading-relaxed w-5/6 md:w-3/4">
        {description}
      </p>

      {/* Bullets List */}
      <ul className="text-white font-bold text-sm md:text-base flex flex-col gap-1 mt-2">
        {bullets.map((bullet, index) => (
          <li key={index}>–{bullet}</li>
        ))}
      </ul>
      
    </div>
  );
}