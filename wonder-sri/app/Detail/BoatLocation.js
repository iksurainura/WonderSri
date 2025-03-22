// app/Detail/BoatLocation.js
"use client";

import { Metadata } from "next";

export const metadata = {
  title: "Madu River Boat Safari Balapitiya - Location",
  description: "Find the location of the Madu River Boat Safari in Balapitiya.",
};

export default function BoatLocation() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="max-w-5xl w-full px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Madu River Boat Safari Balapitiya - Location
          </h1>
          <p className="text-gray-600 mt-2">
            Find us on the map and plan your visit to the Madu River Boat Safari
          </p>
        </div>

        {/* Google Maps Iframe */}
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.391627396648!2d80.04254077502898!3d6.337249193636597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22e2e1f7b8f5b%3A0x7b53b7b2a9f5c5f!2sMadu%20River%20Boat%20Safari!5e0!3m2!1sen!2slk!4v1729812345678!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Location Details */}
        <div className="mt-4 text-gray-600">
          <p>
            <strong>Address:</strong> 
            58/2 Panapitiya ,Karandeiniya 
          </p>
          <p>
            <strong>Coordinates:</strong> 6.337249, 80.042540
          </p>
        </div>
      </div>
    </div>
  );
}