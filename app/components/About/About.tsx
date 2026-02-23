import ParallaxSplitText from "./ParallaxSplitText";
import Direction from "./Direction";

export default function About() {
  return (
    <div className="h-screen bg-[#121212]">
      <ParallaxSplitText />
      <Direction />
      
      {/* Container for Bio and Button */}
      {/* Added max-w-4xl to keep it readable and aligned with the section above */}
      <div className="pt-10 px-6 md:px-12 max-w-4xl">
        <h1 className="text-white text-xl md:text-3xl font-light tracking-tight leading-relaxed mb-8">
          Hey I’m Migel, I strive to bring the best to every project, helping
          brands to connect with their target market through designs and
          creative thinking.
        </h1>

        <div className="flex justify-start">
          <button className="group relative px-4 py-1 rounded-full border border-white text-white overflow-hidden transition-all duration-300 hover:bg-[#DBFF12] hover:text-black hover:border-transparent">
            <span className="relative z-10 text-lg">About Me</span>
          </button>
        </div>
      </div>
    </div>
  );
}