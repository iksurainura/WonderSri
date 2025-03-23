import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri"; // For customer service icon

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 to-blue-300 text-center py-6">
      <div className="container mx-auto px-4">
        {/* Butterfly Logo or Icon */}
        <div className="flex justify-center mb-4 ">
          <Image
            width={48}
            height={48}
            src="/wondersrilogo.jpg" // Replace with your butterfly logo
            alt="Wonder Sri Logo"
            className=" object-cover"
          />
        </div>

        <p className="text-sm text-gray-700 mb-4">
          Discover the wonders of Sri Lanka with{" "}
          <span className="font-semibold text-blue-600">Wonder Sri</span>.
        </p>

        {/* Contact Information */}
        <div className="flex flex-col items-center space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <RiCustomerService2Fill className="text-blue-600" />
            <span>Customer Support: 24/7</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaEnvelope className="text-blue-600" />
            <Link
              href="mailto:info@wondersri.com"
              className="hover:text-blue-600"
            >
              wordersri.services@gmail.com
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <FaPhone className="text-blue-600" />
            <Link href="tel:+94112345678" className="hover:text-blue-600">
              0754690501
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <Link
            href="https://www.instagram.com/wonde_rsri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600"
          >
            <FaInstagram className="text-xl" />
          </Link>
          <Link
            href="https://www.tiktok.com/@wondersri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600"
          >
            <FaTiktok className="text-xl" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/wonder-sri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600"
          >
            <FaLinkedin className="text-xl" />
          </Link>
          <Link
            href="https://www.youtube.com/@WonderSri-o5c"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600"
          >
            <FaYoutube className="text-xl" />
          </Link>
        </div>

        {/* Copyright and Legal */}
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            © {new Date().getFullYear()} Wonder Sri. All rights reserved.
          </p>
          <p>
            Part of the <span className="text-blue-600">Wonder Sri Group</span>.
          </p>
          <p>
           Designed and Developed by <span className="text-blue-600">Iksura Wickrmathunga</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
