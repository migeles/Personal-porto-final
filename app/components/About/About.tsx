import ParallaxSplitText from "./ParallaxSplitText";
import Direction from "./Direction";
import SectionBorder from "../Hero/SectionBorder";

export default function About() {
  return (
    <div className='h-auto pb-5 bg-[#121212]'>
      <ParallaxSplitText />

      <div className="xl:grid xl:grid-cols-2 xl:gap-12 xl:items-center">
        <Direction />

        {/* Container for Bio and Button */}
        {/* Added max-w-4xl to keep it readable and aligned with the section above */}
        <div className='pt-10 px-6 '>
          <h1 className='text-white text-xl md:text-3xl font-light tracking-tight leading-relaxed md:leading-snug mb-8'>
            Hey, I’m Migel. I strive to bring the highest level of craftsmanship to every project I take on. Beyond just making things look good, my goal is to help brands forge meaningful connections with their target market. By combining intuitive web design, strategic creative thinking, I build digital experiences that not only capture attention but drive real, measurable results
          </h1>

          <div className='flex justify-start'>
            <button className='group relative px-4 py-1 rounded-full border border-white text-white overflow-hidden transition-all duration-300 hover:bg-[#DBFF12] hover:text-black hover:border-transparent'>
              <span className='relative z-10 text-lg'>About Me</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
