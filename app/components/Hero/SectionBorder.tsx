// 1. Define the blueprint for your props
interface InfoBannerProps {
  leftText: string; // Added for "Jakarta, Indonesia"
  primaryText: string; // "Creative Developer."
  highlightText?: string; // "Open for Freelance."
  secondaryText: string; // "(REF — A.01)"
}

// 2. Attach the blueprint to your component
export default function SectionBorder({
  leftText,
  primaryText,
  highlightText,
  secondaryText,
}: InfoBannerProps) {
  return (
    <div className="w-full">
      {/* Responsive Grid: 
        - grid-cols-1: Stacks items vertically on small screens (mobile)
        - md:grid-cols-3: Splits into 3 equal columns on medium+ screens (desktop)
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full text-sm pt-10 pb-2 px-3 items-center">
        {/* Left Column */}

        <h1 className="font-light text-[#a1a1a1] main-font-light text-left">
          {primaryText}{" "}
          {/* Only render the highlight span if highlightText is provided */}
          {highlightText && (
            <span className="font-bold text-[#DBFF12]">{highlightText}</span>
          )}
        </h1>
        
        <div className="hidden md:block">

        </div>
        
        <div className="text-[#a1a1a1] main-font-light text-left hidden md:block">
          {leftText}
        </div>

        {/* Middle Column */}

        {/* Right Column (Pushed to the right on desktop) */}
        <h1 className="text-[#a1a1a1] main-font-light text-right md:text-right">
          {secondaryText}
        </h1>
      </div>
      <hr className="border-white opacity-20" />
    </div>
  );
}
