"use client";

import { useRouter } from "next/navigation";
// Import Heroicons
import {
  UserGroupIcon,
  ClockIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

function Vendor() {
  const router = useRouter();

  const handleViewMore = () => {
    router.push("/Vendor");
  };

  return (
    <div
      className="bg-blue-500 w-full py-20 relative overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }} // Added font family
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0,_transparent_70%)]"></div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side: Image and Stats */}
          <div className="lg:w-1/2">
            <img
              src="/vendor.png"
              alt="Vendor Digitalization"
              className="w-full h-auto rounded-lg shadow-lg mb-6 transform hover:scale-102 transition-transform duration-300"
            />
            {/* Quick Stats with Icons */}
            <div className="grid grid-cols-2 gap-4 text-white text-center">
              <div className="flex flex-col items-center">
                <UserGroupIcon className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">1000+</p>
                <p className="text-sm">Happy Vendors</p>
              </div>
              <div className="flex flex-col items-center">
                <ClockIcon className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm">Support</p>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 playwrite-it-moderna">
              Go Digital With Us
            </h2>
            <p className="text-lg mb-6 leading-relaxed playwrite-it-moderna">
              We help you grow your business with free support—social media,
              customer service, and technical guidance—until you gain customers.
              Let’s make your services thrive online! Our team provides
              comprehensive digital transformation solutions tailored to your
              unique business needs.
            </p>

            {/* Features List with Icons */}
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <GlobeAltIcon className="h-6 w-6 text-white" />
                <span>Free website setup and optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                <span>Social media marketing strategies</span>
              </li>
              <li className="flex items-center gap-3">
                <RocketLaunchIcon className="h-6 w-6 text-white" />
                <span>Dedicated technical support</span>
              </li>
            </ul>

            {/* Enhanced Button with Icon */}
            <button
              onClick={handleViewMore}
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-blue-50 transition-all text-base shadow-md flex items-center gap-2"
            >
              <span>View More</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>

            {/* Additional CTA with Icon */}
            <p className="mt-4 text-sm flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Questions?{" "}
              <a
                href="/Vendor"
                className="underline hover:text-blue-200 transition-colors"
              >
                Contact us today!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
