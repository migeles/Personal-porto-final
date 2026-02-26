import ServiceHeader from "./ServiceHeader";
import ServiceCard from "./ServiceCard";
import SectionBorder from "../Hero/SectionBorder";

// The data array holding all your text content
export default function Service() {
  return (
    <div className='bg-[#121212] h-auto pb-20 w-full '>
      <SectionBorder
        leftText="(REF — A.03)"
        primaryText='My Service'
        highlightText=''
        secondaryText='2025-2026'
      />
      <div className="xl:flex xl:justify-around xl:items-center">
        <ServiceHeader />
        <ServiceCard />
      </div>
    </div>
  );
}
