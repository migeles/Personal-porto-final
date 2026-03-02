import SectionBorder from "../Hero/SectionBorder";
import Work from "./Work"; // This is your reusable card component
import InfiniteSliderGimick from "./InfiniteSliderGimik";
import qroThumbnail from "../../assets/image/qrothumbnail.webp";
import kartuasThumbnail from "../../assets/image/kartuasthumbnail.webp";
import bantenkThumbnail from "../../assets/image/bantenkthumbnail.webp";

export default function FeaturedWork() {
  // 1. Create an array of your projects to easily map through them
  const projects = [
    {
      title: "Soda Bantenk",
      category: "Web Development and Design",
      imageUrl: bantenkThumbnail,
      link: "https://sodabantenkgroup.com",
    },
    {
      title: "Kartuas Brandy",
      category: "Web Development and Design",
      imageUrl: kartuasThumbnail,
      link: "https://kartuasgroup.com",
    },

    {
      title: "Q'RO",
      category: "Web Development",
      imageUrl: qroThumbnail,
      link: "https://qrospirit.com/",
    },
    {
      title: "Start Your Project", // Or "Add Yours"
      category: "Let's build something exceptional together",
      link: "#contact",
      isCallToAction: true, // This triggers the new UI!
    },
  ];

  return (
    // Changed h-screen to min-h-screen so it can expand dynamically
    <div id="work" className="bg-[#121212] min-h-screen w-full">
      <SectionBorder
        leftText="(REF — A.02)"
        primaryText="Featured Work"
        highlightText=""
        secondaryText="2025-2026"
      />

      {/* 2. The Grid Container */}
      <div className="px-6 md:px- py-12 grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto | md:gap-7 ">
        {/* 3. Map through the projects array and render a <Work /> component for each */}
        {projects.map((project, index) => (
          <Work
            key={index}
            title={project.title}
            category={project.category}
            imageUrl={project.imageUrl}
            link={project.link}
            isCallToAction={project.isCallToAction} // Pass the flag down
          />
        ))}
      </div>
      <InfiniteSliderGimick />
    </div>
  );
}
