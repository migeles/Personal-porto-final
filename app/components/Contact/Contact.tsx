"use client";
import React, { useState, useEffect } from "react";
import profilePicture from "../../assets/image/pp.png";

export default function Contact() {
  const [time, setTime] = useState("10:52 AM GMT+7");

  // Optional but cool: Makes the local time dynamic!
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(`${formatter.format(now)} GMT+7`);
    };

    updateClock(); // Set initial time immediately
    const intervalId = setInterval(updateClock, 10000); // Update every 10s

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="contact" className="bg-[#121212] h-full flex flex-col justify-between items-center pt-24 px-0 ">
      
      {/* Top Section: Profile & Call to Action */}
      <div className="flex flex-col items-center w-full  pt-30">
        
        {/* Profile Picture */}
        <img 
          // Safely handles both static string and Next.js Image objects
          src={typeof profilePicture === 'string' ? profilePicture : profilePicture?.src} 
          alt="Migel Profile" 
          className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover mb-8"
        />
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-[6.5rem] font-medium text-center leading-13 xl:leading-28 mb-12 tracking-normal xl:tracking-tight">
          <span className="text-[#DBFF12]">Let’s Create</span>
          <br />
          <span className="text-white">Together</span>
        </h1>

        {/* Contact Buttons */}
        <div className="flex flex-col gap-4 w-full md:w-auto items-center">
          <a 
            href="https://wa.me/6287887206610" 
            className="w-70 md:w-[320px] text-center px-5 py-4 border border-[#DBFF12] rounded-full text-white text-md md:text-base transition-all duration-300 hover:bg-[#DBFF12] hover:text-black"
          >
            +6287887206610
          </a>
          <a 
            href="mailto:hello@migelssugiarto.xyz" 
            className="w-70 md:w-[320px] text-center px-5 py-4 border border-[#DBFF12] rounded-full text-white text-md md:text-base transition-all duration-300 hover:bg-[#DBFF12] hover:text-black"
          >
            hello@migelssugiarto.xyz
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full  mt-32 pb-8 bg-[#121212]">
        
        {/* Mobile Socials (Stacked ABOVE the line, hidden on desktop) */}
        <div className="flex flex-col items-center md:hidden pb-8">
          <span className="text-gray-500 text-sm pb-4">Socials</span>
          <div className="flex gap-6 text-white text-base">
            <a href="https://www.instagram.com/migelss01/reels/" className="hover:text-[#DBFF12] transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/migel-sastrawan-sugiarto/" className="hover:text-[#DBFF12] transition-colors">Linkedin</a>
            <a href="https://wa.me/6287887206610" className="hover:text-[#DBFF12] transition-colors">Whatsapp</a>
          </div>
        </div>

        {/* Subtle Divider Line */}
        <div className="w-full h-[1px] bg-white/10 mb-6"></div>

        {/* Bottom Info Row */}
        <div className="flex flex-row justify-between items-end w-full">
          
          {/* Left Side: Version & Time */}
          <div className="flex justify-between w-full md:w-auto md:gap-32 px-6 ">
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs mb-1">Version</span>
              <span className="text-white text-sm md:text-base font-medium">©2026</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs mb-1">Local Time</span>
              <span className="text-white text-sm md:text-base font-medium">{time}</span>
            </div>
          </div>

          {/* Right Side: Desktop Socials (Hidden on mobile) */}
          <div className="hidden md:flex flex-col items-start md:px-6">
            <span className="text-gray-500 text-xs mb-1">Socials</span>
            <div className="flex gap-8 text-white text-base">
              <a href="https://www.instagram.com/migelss01/reels/" className="hover:text-[#DBFF12] transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/in/migel-sastrawan-sugiarto/" className="hover:text-[#DBFF12] transition-colors">Linkedin</a>
              <a href="https://wa.me/6287887206610" className="hover:text-[#DBFF12] transition-colors">Whatsapp</a>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}