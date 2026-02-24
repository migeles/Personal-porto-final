import SectionBorder from "../Hero/SectionBorder";
import Work from "./Work"; // This is your reusable card component
import qroThumbnail from "../../assets/image/qrothumbnail.png";
import kartuasThumbnail from "../../assets/image/kartuasthumbnail.png";
import bantenkThumbnail from "../../assets/image/bantenkthumbnail.png";

export default function FeaturedWork() {
  // 1. Create an array of your projects to easily map through them
  const projects = [
    {
      title: "Soda Bantenk",
      category: "Web Development and Design",
      imageUrl: bantenkThumbnail,
      link: "#",
    },
    {
      title: "Kartuas Brandy",
      category: "Web Development and Design",
      imageUrl: kartuasThumbnail,
      link: "#",
    },

    {
      title: "Q'RO", 
      category: "Web Development and Design",
      imageUrl: qroThumbnail,
      link: "#",
    },
  ];

  return (
    // Changed h-screen to min-h-screen so it can expand dynamically
    <div className='bg-[#121212] min-h-screen w-full'>
      <SectionBorder
        primaryText='Featured Work'
        highlightText=''
        secondaryText='2025-2026'
      />

      {/* 2. The Grid Container */}
      <div className='px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto'>
        {/* 3. Map through the projects array and render a <Work /> component for each */}
        {projects.map((project, index) => (
          <Work
            key={index}
            title={project.title}
            category={project.category}
            imageUrl={project.imageUrl.src || project.imageUrl} // .src handles Next.js image imports if applicable
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
