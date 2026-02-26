import React from 'react';

// 1. Define the blueprint for the props this component expects
interface WorkProps {
  title: string;
  category: string;
  // Allows both standard URL strings or imported Next.js image objects
  // Made optional so the Call to Action card doesn't strictly require an image
  imageUrl?: string | any; 
  link?: string;
  // ADDED: A flag to switch this card into the "Add Yours" interactive mode
  isCallToAction?: boolean; 
}

// 2. Pass the props into the component's arguments
export default function Work({ 
  title, 
  category, 
  imageUrl, 
  link = "#",
  isCallToAction = false // Defaults to false for normal project cards
}: WorkProps) {
  return (
    <a href={link} className="group flex flex-col gap-4 cursor-pointer w-full">
      
      {/* 3. Conditionally Render the Image OR the Animated Plus Box */}
      {isCallToAction ? (
        
        /* The Call To Action Box (Black with Neon Border) */
        <div className="w-full aspect-square md:aspect-auto md:h-120 rounded-2xl md:rounded-lg border-2 border-[#DBFF12] bg-black flex items-center justify-center transition-all duration-500 group-hover:bg-[#1a1a1a] overflow-hidden">
          <svg 
            className="w-32 h-32 text-white transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:scale-125" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" />
          </svg>
        </div>

      ) : (
        
        /* Standard Image Container with hover zoom */
        <div className="w-full aspect-square md:aspect-auto md:h-120 rounded-2xl md:rounded-lg overflow-hidden bg-[#1e1e1e]">
          {imageUrl && (
            <img
              // safely extracts the URL whether it's a string or a Next.js StaticImageData object
              src={typeof imageUrl === 'string' ? imageUrl : imageUrl?.src}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 scale-101 group-hover:scale-105"
            />
          )}
        </div>

      )}

      {/* Text & Button Container */}
      <div className="flex justify-between items-center px-1 pt-2">
        <div>
          {/* Added a group-hover text color change specifically for the Call to Action state */}
          <h3 className={`text-xl md:text-2xl font-bold transition-colors ${isCallToAction ? 'text-white group-hover:text-[#DBFF12]' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-gray-400 text-sm md:text-base mt-1">{category}</p>
        </div>

        {/* Yellow Circular Arrow Button */}
        <div className="w-12 h-12 rounded-full bg-[#DBFF12] flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110 shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
      
    </a>
  );
}