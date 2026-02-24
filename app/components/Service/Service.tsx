import ServiceHeader from "./ServiceHeader";
import ServiceCard from "./ServiceCard";

// The data array holding all your text content
const servicesData = [
  {
    number: "01",
    title: "Engineered for Results",
    description:
      "Lightning-fast digital experiences built with purpose. Every design choice and interaction is deliberately crafted to drive action and maximize your ROI.",
    bullets: [
      "Rapid page load speeds",
      "Integrated data tracking",
      "Continuous speed enhancements",
    ],
  },
  {
    number: "02",
    title: "Intuitively Crafted",
    description:
      "Navigation should be effortless. I create logical pathways, prominent calls to action, and frictionless interactions that feel natural on any screen size.",
    bullets: [
      "Purpose-driven UX/UI",
      "Built for usability testing",
      "100% adaptable layouts",
    ],
  },
  {
    number: "03",
    title: "Beyond the Surface Requirements",
    description:
      "A project description is just the starting line. Through deep-dive research and strategic planning, I turn vague ideas into a concrete, actionable roadmap.",
    bullets: [
      "In-depth strategy sessions",
      "Market & competitor research",
      "Actionable project roadmaps",
    ],
  },
  {
    number: "04",
    title: "Rejecting the Ordinary",
    description:
      "The internet is full of average; your brand deserves better. I am committed to delivering standout digital products that exceed expectations. Excellence is the baseline.",
    bullets: [
      "Unwavering standard of excellence",
      "Meticulous craftsmanship",
      "Data-backed success",
    ],
  },
];

export default function Service() {
  return (
    <div className='bg-[#121212] min-h-screen pb-20 w-full'>
      <ServiceHeader />

      {/* The Service List Container */}
      <div className='px-4 md:px-12 flex justify-center mt-8'>
        <div className='w-full max-w-5xl border border-[#DBFF12] rounded-md overflow-hidden bg-[#121212]'>
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              number={service.number}
              title={service.title}
              description={service.description}
              bullets={service.bullets}
              isLast={index === servicesData.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
