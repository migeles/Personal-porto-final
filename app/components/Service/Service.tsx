import ServiceHeader from "./ServiceHeader";
import ServiceCard from "./ServiceCard";

// The data array holding all your text content
export default function Service() {
  return (
    <div className='bg-[#121212] h-auto pb-20 w-full'>
      <ServiceHeader />
      <ServiceCard />
    </div>
  );
}
