import ServiceHeader from "./ServiceHeader";
import ServiceCard from "./ServiceCard";
import SectionBorder from "../Hero/SectionBorder";

export default function Service() {
  return (
    <div className='bg-[#121212] h-auto pb-20 w-full '>
      <SectionBorder
        leftText="(REF — A.03)"
        primaryText='My Service'
        highlightText=''
        secondaryText='2025-2026'
      />
      {/* ONLY ADDED: xl:items-start */}
      <div className="xl:flex xl:justify-around xl:relative xl:items-start">
        <ServiceHeader />
        <ServiceCard />
      </div>
    </div>
  );
}