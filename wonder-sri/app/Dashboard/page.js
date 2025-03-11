"use client"; // Adding this since we're using client-side features

import React from "react";
import Link from "next/link"; // Using Next.js Link for better navigation
import { motion } from "framer-motion";
import AddBoatBooking from "./AddBoatBooking";

function Page() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Booking Link */}
      <div className="p-6">
        <Link href="/Dashboard/Booking">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.03,
              background: "linear-gradient(to right, #6366f1, #9333ea)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
            }}
            transition={{
              duration: 0.4,
              hover: { duration: 0.2 },
            }}
            className="inline-block text-4xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent px-4 py-2 rounded-xl hover:text-white cursor-pointer tracking-tight border border-gray-700/50 hover:border-indigo-500 transition-all duration-200"
          >
            Booking
          </motion.h1>
        </Link>
      </div>

      {/* AddBoatBooking Component */}
      <AddBoatBooking />
    </div>
  );
}

export default Page;
