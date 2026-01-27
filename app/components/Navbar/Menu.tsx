import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// 1. Define the type for the props
interface MenuProps {
  isMenuOpen: boolean;
}

export default function Menu({ isMenuOpen }: MenuProps) {
    // 2. Define the type for the Ref (it's a Div element)
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(container.current, { 
                x: 0, 
                duration: 0.8, 
                ease: "power3.inOut" 
            });
        } else {
            gsap.to(container.current, { 
                x: "100%", 
                duration: 0.8, 
                ease: "power3.inOut" 
            });
        }
    }, [isMenuOpen]);

    return (
        <div 
            ref={container} 
            className="fixed top-0 right-0 h-screen w-full md:w-112.5 bg-[#1C1D20] text-white flex flex-col justify-between p-12 z-40 translate-x-full will-change-transform"
        >
            
            {/* --- Top Section: Navigation --- */}
            <div className="mt-20">
                <div className="mb-8 border-b border-gray-700 pb-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Navigation</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    {/* Active Link Example */}
                    <div className="group flex items-center gap-4 cursor-pointer">
                        <h2 className="text-5xl font-normal transition-transform hover:translate-x-2 duration-300">
                            Home
                        </h2>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {["Work", "About", "Contact"].map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <h2 className="text-5xl font-normal text-gray-300 hover:text-white transition-all hover:translate-x-2 duration-300">
                                {item}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Bottom Section: Socials --- */}
            <div className="mb-10">
                <div className="mb-6 border-b border-gray-700 pb-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Socials</p>
                </div>

                <div className="flex gap-6 text-sm font-light">
                    {["Awwwards", "Instagram", "Twitter", "LinkedIn"].map((social, index) => (
                        <a 
                            key={index} 
                            href="#" 
                            className="text-white hover:text-gray-400 transition-colors"
                        >
                            {social}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}