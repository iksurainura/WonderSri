import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left">
        {/* Main Text */}
        <p className="text-gray-600 text-sm">
          Booking.com part of Booking Holdings Inc., the world leader in online travel and related services.{" "}
          <span className="text-gray-600">
            Booking.com © 1996-2025 Booking.com™ All rights reserved.
          </span>
        </p>

        {/* Links with Colored Dots */}
        <div className="flex items-center space-x-4 mt-2 sm:mt-0 sm:ml-4">
          <a
            href="https://www.booking.com"
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            Booking.com
          </a>
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          <a
            href="https://www.priceline.com"
            className="text-blue-600 font-medium text-sm hover:underline"
            style={{ color: "#FF6200" }} // Priceline orange
          >
            priceline
          </a>
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <a
            href="https://www.kayak.com"
            className="text-blue-600 font-medium text-sm hover:underline"
            style={{ color: "#FFC107" }} // KAYAK yellow
          >
            KAYAK
          </a>
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <a
            href="https://www.agoda.com"
            className="text-blue-600 font-medium text-sm hover:underline"
            style={{ color: "#00C4B4" }} // Agoda teal
          >
            agoda
          </a>
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <a
            href="https://www.opentable.com"
            className="text-blue-600 font-medium text-sm hover:underline"
            style={{ color: "#DA3743" }} // OpenTable red
          >
            OpenTable
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;