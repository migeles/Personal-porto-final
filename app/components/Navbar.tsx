import shine from "../assets/image/shine-img.png"
import decorlogo from "../assets/image/decor-logo-img.png"

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-6 py-6">
            {/* Left: Brand Logo */}
            <div className="cursor-pointer">
                <img 
                    src={decorlogo.src} 
                    alt="Brand Logo" 
                    className="w-12 h-12 object-contain" 
                />
            </div>

            {/* Right: Menu Trigger */}
            <button className="flex items-center gap-3 text-white group">
                <img 
                    src={shine.src} 
                    alt="Menu Icon" 
                    className="w-4 h-4 object-contain group-hover:rotate-45 transition-transform duration-300" 
                />
                <span className="text-lg font-light tracking-wide">Menu</span>
            </button>
        </nav>
    );
}