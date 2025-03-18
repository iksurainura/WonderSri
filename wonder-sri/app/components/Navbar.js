"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 z-50">
      {/* Container for Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {/* Circular Logo (No White Background) */}
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src="./wondersrilogo.jpg" // Ensure this image has a transparent background
                alt="WonderSri"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Logo Text */}
            <h3 className="text-2xl font-bold text-[#fbfbfb] ml-3">
              WonderSri
            </h3>
          </motion.div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:flex gap-6 items-center"
        >
          <Link
            href="/FindMyBooking"
            className="
              inline-block
              px-6 py-3
              bg-[#4096FE] 
              hover:bg-[#2B78FE] 
              text-white 
              font-medium
              rounded-lg
              shadow-md
              hover:shadow-lg
              transition
              duration-200
              ease-in-out
              transform
              hover:-translate-y-0.5
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
              focus:ring-opacity-50
              playwrite-it-moderna
            "
          >
            Find My Booking
          </Link>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
