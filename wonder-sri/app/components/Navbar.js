"use client";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 z-50">
      {/* Container for Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <a href="/">
          <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
          >
          <div className="w-10 h-10 bg-[#1f34c1] rounded-full flex items-center justify-center">
            <img src="./Logo.png" alt="WonderSri" className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#fbfbfb] ml-2">WonderSri</h3>
        </motion.div>
        </a> 
        {/* Navigation Links (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:flex gap-6 items-center"
        >
          <a
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
            "
          >
            Find My Booking
          </a>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;