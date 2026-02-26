import React from 'react';

// 1. Prop Types
interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features?: string[];
}

// 2. The Reusable Card Component (Internal to this file)
function ServiceCard({ 
  number, 
  title, 
  description, 
  features = [] 
}: ServiceCardProps) {
  return (
    // Note: If the cards look unaligned in the grid, you might want to remove `mx-4` 
    // and rely entirely on the parent container's `gap` for spacing.
    <div className="flex flex-col h-full px-6 pb-10 pt-6 mx-4 border-1 border-r-0 border-[#ccff0050] | xl:h-auto">
      <div className="w-full text-right text-7xl main-font-medium font-extrabold text-white pb-3">
        {number}
      </div>

      <h3 className="text-[#ccff00] font-bold text-2xl md:text-lg mb-4 w-4/5">
        {title}
      </h3>

      <p className="text-gray-300 text-lg leading-relaxed mb-6 w-11/12 md:w-5/6">
        {description}
      </p>

      <ul className="flex flex-col gap-2">
        {features?.map((feature, index) => (
          <li key={index} className="text-white font-bold text-xl">
            <span className='text-[#ccff00]'>– </span>{feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 3. The Main Section Component (Exported to use in your App)
export default function ServicesSection() {
  const servicesData: ServiceCardProps[] = [
    {
      number: "01",
      title: "Engineered for Results",
      description: "Lightning-fast digital experiences built with purpose. Every design choice and interaction is deliberately crafted to drive action and maximize your ROI.",
      features: [
        "Rapid page load speeds",
        "Integrated data tracking",
        "Continuous speed enhancements"
      ]
    },
    {
      number: "02",
      title: "Intuitively Crafted",
      description: "Navigation should be effortless. I create logical pathways, prominent calls to action, and frictionless interactions that feel natural on any screen size.",
      features: [
        "Purpose-driven UX/UI",
        "Built for usability testing",
        "100% adaptable layouts"
      ]
    },
    {
      number: "03",
      title: "Beyond the Surface Requirements",
      description: "A project description is just the starting line. Through deep-dive research and strategic planning, I turn vague ideas into a concrete, actionable roadmap.",
      features: [
        "In-depth strategy sessions",
        "Market & competitor research",
        "Actionable project roadmaps"
      ]
    },
    {
      number: "04",
      title: "Rejecting the Ordinary",
      description: "The internet is full of average; your brand deserves better. I am committed to delivering standout digital products that exceed expectations. Excellence is the baseline.",
      features: [
        "Unwavering standard of excellence",
        "Meticulous craftsmanship",
        "Data-backed success"
      ]
    }
  ];

  return (
    // ADDED: grid grid-cols-1 xl:grid-cols-2 gap-8
    <div className="bg-[#111111] py-10 xl:w-full xl:h-300 grid grid-cols-1 xl:grid-cols-2 gap-8">
      {servicesData.map((service) => (
        <ServiceCard 
          key={service.number}
          number={service.number}
          title={service.title}
          description={service.description}
          features={service.features}
        />
      ))}
    </div>
  );
}