// 1. Define the blueprint for your props
interface InfoBannerProps {
  primaryText: string;
  highlightText?: string; // The '?' makes it optional, in case you don't always want yellow text
  secondaryText: string;
}

// 2. Attach the blueprint to your component
export default function SectionBorder({ 
  primaryText, 
  highlightText, 
  secondaryText 
}: InfoBannerProps) {
  return (
    <div>
      <div className='flex w-full text-sm justify-between pt-10 pb-2 px-3'>
        <h1 className='font-light text-[#a1a1a1] main-font-light'>
          {primaryText}{" "}
          {/* Only render the highlight span if highlightText is provided */}
          {highlightText && (
            <span className='font-bold text-[#DBFF12]'>{highlightText}</span>
          )}
        </h1>
        <h1 className="text-[#a1a1a1]  main-font-light">{secondaryText}</h1>
      </div>
      <hr className='border-white opacity-20' />
    </div>
  );
}