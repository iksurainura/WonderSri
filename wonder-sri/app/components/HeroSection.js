"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
function HeroSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-blue-500 w-full pt-16" ref={ref}>
      <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl text-center md:text-left"
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 playwrite-it-moderna">
            Wonder Sri
          </h2>
          <p className="text-white text-base sm:text-lg md:text-xl mb-6 playwrite-it-moderna">
            Discover Local Deals at the Best Prices
          </p>
        </motion.div>
        <motion.div
          className="mt-6 md:mt-0 flex items-center justify-center md:justify-end w-full md:w-1/2 lg:w-2/5 opacity-90"
          initial="hidden"
          animate={controls}
          variants={imageVariants}
        >
          <Image
            src="./Logo.png"
            alt="Travel destination"
            className="w-3/4 md:w-auto object-contain max-h-64 md:max-h-full"
          />
        </motion.div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default HeroSection;
