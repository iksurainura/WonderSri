"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./card";
import {
  Video as VideoIcon,
  Gift,
  Wrench,
  Users,
  Calendar,
} from "lucide-react";

// Define content object
const content = {
  heroSubtitle: "Discover the Beauty of Sri Lanka with Wonder Sri.",
};

export default function VendorPage() {
  const [language, setLanguage] = useState("sinhala"); // Default language is Sinhala
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Scroll to Features Section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Auto-scroll to features section after 3 seconds on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToFeatures();
    }, 3000); // 3 seconds delay

    // Cleanup timer on unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs only on mount

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.01, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Hero Section with Video */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/1225.mp4" // Ensure this file is in the public folder
          autoPlay
          loop
          muted
          playsInline
          onError={(e) => console.error("Video failed to load:", e)}
        ></video>

        {/* Circle Container */}
        <div className="absolute z-10 flex flex-col items-center justify-center text-center">
          {/* Circle with Cobalt Blue Background */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#0047AB] bg-opacity-50">
            {/* Your Logo in the Background of Circle */}
            <Image
            height={100}
            width={100}
              src="/wondersrilogo.jpg" // Ensure this file is in the public folder
              alt="Logo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Title Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-6 font-montserrat">
            Wonder <span className="text-blue-400">Sri</span>
          </h1>
          <p className="text-white text-lg sm:text-xl mt-4">
            {content.heroSubtitle}
          </p>

          {/* Button to Scroll to Features Section */}
          <button
            onClick={scrollToFeatures}
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all"
          >
            {language === "sinhala" ? "සේවා බලන්න" : "View Our Services"}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features-section"
        className="bg-blue-500 pt-16 "
        ref={ref}
      ></div>
    </div>
  );
}
