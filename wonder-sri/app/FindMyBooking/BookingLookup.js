"use client"; // Ensure this is included if you're using Next.js

import { useState } from "react";
import Image from "next/image";

export default function BookingLookup() {
  const [input, setInput] = useState(""); // Input for booking code or Gmail
  const [booking, setBooking] = useState(null); // Booking data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    if (!input) return;

    setLoading(true); // Start loading

    try {
      // Determine if the input is a Gmail or booking code
      const isGmail = input.includes("@"); // Simple check for "@" to identify Gmail
      const apiUrl = isGmail
        ? `http://localhost:8081/api/bookings/by-email/${input}` // Endpoint for Gmail
        : `http://localhost:8081/api/bookings/${input}`; // Endpoint for booking code

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch booking: ${response.statusText}`);
      }

      const data = await response.json();
      setBooking(data); // Set booking data
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-[url('/boats.png')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg space-y-6 w-full max-w-md">
        <Image
          src="/logo.png"
          alt="WonderSri Logo"
          width={150}
          height={150}
          className="mx-auto"
          priority
        />


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your Booking code or Your Gmail"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded bg-white/90 text-black border border-blue-300/30 focus:border-blue-400 focus:outline-none transition placeholder-gray-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#4096FE] hover:bg-[#2B78FE] text-white py-3 rounded transition duration-200 font-semibold"
            style={{ boxShadow: "0 4px 6px rgba(64, 150, 254, 0.3)" }}
            disabled={!input}
          >
            View Bookings
          </button>
        </form>

        {loading && (
          <div className="text-white text-center font-semibold">Loading...</div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-2 rounded text-center font-semibold">
            {error}
          </div>
        )}

        {booking && (
          <div className="bg-white/95 p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
            <h3 className="text-xl font-bold text-[#2B78FE] mb-4 border-b-2 border-blue-100 pb-2">
              Booking #{booking.bookingCode}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  Boat:
                </span>
                <span className="text-gray-800 font-medium">
                  {booking.boatName}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  Date:
                </span>
                <span className="text-gray-800 font-medium">
                  {booking.bookingDate}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  Time:
                </span>
                <span className="text-gray-800 font-medium">
                  {booking.timeSlot}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  Status:
                </span>
                <span
                  className={`font-medium ${
                    booking.status === "Confirmed"
                      ? "text-green-600"
                      : booking.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  User:
                </span>
                <span className="text-gray-800 font-medium">
                  {booking.userName}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  Email:
                </span>
                <span className="text-gray-800 font-medium">
                  {booking.userEmail}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <span className="text-[#2B78FE] font-semibold min-w-[100px]">
                  Phone:
                </span>
                <span className="text-gray-800 font-medium">
                  {booking.userPhone}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}