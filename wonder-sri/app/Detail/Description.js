"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Madu River Boat Safari Balapitiya - Booking",
  description:
    "Book your Madu River Boat Safari in Balapitiya&lsquo;s. Enjoy a 3-4 hour boat ride through the scenic river with free cancellation and flexible booking options.",
};

export default function Description({ boatId = "MADU001" }) {
  const router = useRouter();
  const places = [
    { location: "Maha Gonaduwa", icon: "🏝️" },
    { location: "Meraladuwa", icon: "🌿" },
    { location: "Kuruluduwa", icon: "🐦" },
    { location: "Naiduwa", icon: "🗿" },
    { location: "Kadol Kalle", icon: "🌱" },
    { location: "Dimiduwa", icon: "🌅" },
    { location: "Sathapaheduwa", icon: "🏡" },
    { location: "Mad Duwa", icon: "🏞️" },
    { location: "Kothduwa", icon: "⛩️" },
    { location: "Mahala Duwa", icon: "🧘" },
    { location: "Mimaduwa", icon: "🦋" },
    { location: "Kothduwa Rajamaha Viharaya", icon: "🙏" },
    { location: "Sandya&lsquo;s Juice Bar", icon: "🍹" },
    { location: "Kirala Drink Bar", icon: "🥤" },
    { location: "Madu Ganga Fish Therapy", icon: "🐟" },
    { location: "Madu River estuary (Sea Bath place) END", icon: "🏊" },
  ];

  const handleBookNow = (boatId) => {
    router.push(`/Booking?title=${encodeURIComponent(boatId)}`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Madu River Boat Safari
              </h1>
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                Embark on an unforgettable journey through Sri Lanka&lsquo;s coastal wonders
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {[
                  { icon: "↻", title: "Free Cancellation", desc: "Up to 24 hours before" },
                  { icon: "💳", title: "Reserve Now, Pay Later", desc: "Flexible booking" },
                  { icon: "💸", title: "Best Price Guarantee", desc: "Price match promise" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-blue-600 text-lg sm:text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-base sm:text-lg">{feature.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
                {[
                  { icon: "👶", text: "Ages 2-99" },
                  { icon: "⏳", text: "3-4 hours" },
                  { icon: "🗣️", text: "English Guide" },
                ].map((info, idx) => (
                  <div key={idx} className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-sm">
                    <span className="text-xl sm:text-2xl">{info.icon}</span>
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Places We Are Visiting */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Destinations We&lsquo;re Exploring
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {places.map((place, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 sm:p-5 flex items-center space-x-3 sm:space-x-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full flex items-center justify-center">
                        <span className="text-lg sm:text-2xl">{place.icon}</span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base md:text-lg">{place.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 sticky top-4 sm:top-6">
              <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-4 sm:mb-6">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">For 12 pax Just</h3>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Rs 9000 ($30)</h2>
              </div>
              <button
                onClick={() => handleBookNow(boatId)}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 sm:py-4 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Reserve Now
              </button>
              {/* Map */}
              <div className="mt-4 sm:mt-6">
                <div className="h-48 sm:h-64 rounded-xl overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.391627396648!2d80.04254077502898!3d6.337249193636597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22e2e1f7b8f5b%3A0x7b53b7b2a9f5c5f!2sMadu%20River%20Boat%20Safari!5e0!3m2!1sen!2slk!4v1729812345678!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                  <p>
                    <strong>Location:</strong> 58/2 Panapitiya, Karandeiniya
                  </p>
                  <Link
                    href="https://maps.app.goo.gl/CZVGYgcmyq9U4zyR7"
                    className="text-blue-600 hover:underline"
                  >
                    View Directions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}