// 1. Define the blueprint for the props this component expects
interface WorkProps {
  title: string;
  category: string;
  // Allows both standard URL strings or imported Next.js image objects
  imageUrl: string | any; 
  link?: string;
}

// 2. Pass the props into the component's arguments
export default function Work({ title, category, imageUrl, link = "#" }: WorkProps) {
  return (
    <a href={link} className="group block flex flex-col gap-4 cursor-pointer">
      
      {/* Image Container with hover zoom */}
      <div className="w-full aspect-square md:aspect-video rounded-2xl overflow-hidden bg-[#1e1e1e]">
        <img
          // This safely extracts the URL whether it's a string or a Next.js StaticImageData object
          src={typeof imageUrl === 'string' ? imageUrl : imageUrl?.src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Text & Button Container */}
      <div className="flex justify-between items-center px-1 pt-2">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-bold">{title}</h3>
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