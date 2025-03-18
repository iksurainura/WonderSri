"use client"; // Ensure this is a Client Component

import { Suspense } from "react"; // Import Suspense
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "next/navigation";

const today = new Date("2025-03-07");

function BookingPageContent() {
  const searchParams = useSearchParams(); // Get query parameters
  const activityTitle = searchParams.get("title") || ""; // Get the activity title from URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pax: 1,
    date: "",
    timeSlot: "",
    activity: activityTitle, // Add activity title to form data
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [months, setMonths] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const generateMonths = () => {
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const monthsData = [
        {
          name: new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" }),
          days: new Array(new Date(currentYear, currentMonth + 1, 0).getDate())
            .fill(null)
            .map((_, i) => i + 1),
          startDay: new Date(currentYear, currentMonth, 1).getDay(),
        },
        {
          name: new Date(currentYear, currentMonth + 1).toLocaleString("default", { month: "long", year: "numeric" }),
          days: new Array(new Date(currentYear, currentMonth + 2, 0).getDate())
            .fill(null)
            .map((_, i) => i + 1),
          startDay: new Date(currentYear, currentMonth + 1, 1).getDay(),
        },
      ];
      setMonths(monthsData);
    };
    generateMonths();
  }, []);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (selectedDate) {
        try {
          const [month, day, year] = selectedDate.split(" ");
          const dateStr = `${year}-${new Date(`${month} 1, ${year}`).toLocaleString("default", { month: "2-digit" })}-${day.padStart(2, "0")}`;
          const response = await axios.get(`/api/available-slots?date=${dateStr}`);
          setAvailableTimeSlots(response.data.slots || ["9:00 AM", "12:00 PM", "3:00 PM"]);
          setFormData((prevData) => ({ ...prevData, date: selectedDate }));
        } catch (error) {
          console.error("Error fetching available time slots:", error);
          setAvailableTimeSlots(["9:00 AM", "12:00 PM", "3:00 PM"]);
        }
      }
    };
    fetchAvailableTimeSlots();
  }, [selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "pax" ? parseInt(value, 10) : value,
    }));
  };

  const handlePaxChange = (direction) => {
    setFormData((prevData) => {
      let newPax = prevData.pax;
      if (direction === "increment" && newPax < 20) newPax += 1;
      else if (direction === "decrement" && newPax > 1) newPax -= 1;
      return { ...prevData, pax: newPax };
    });
  };

  const handleDateSelect = (month, day) => {
    const [monthName, year] = month.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    const selected = new Date(parseInt(year, 10), monthIndex, day).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setSelectedDate(selected);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }
    try {
      const response = await axios.post("/api/bookings", { // Changed endpoint to /api/bookings
        ...formData,
        recaptchaToken,
      });
      if (response.data.success) {
        console.log("Booking Submitted:", formData);
        alert("Booking submitted successfully!");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
    recaptchaRef.current?.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-black mb-6">Book Your Activity: {activityTitle}</h2>

        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between mb-4">
            <button className="text-black hover:text-gray-600" aria-label="Previous Months">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-600" aria-label="Next Months">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {months.map((month) => (
              <div key={month.name} className="flex-1 border border-gray-300 rounded-lg p-4 bg-white">
                <h2 className="text-lg font-semibold text-black text-center mb-3">{month.name}</h2>
                <div className="grid grid-cols-7 gap-2 text-center text-black font-medium">
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-2 mt-3 text-center">
                  {Array(month.startDay).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2"></div>
                  ))}
                  {month.days.map((day) => {
                    const isSelected = selectedDate === new Date(
                      parseInt(month.name.split(" ")[1], 10),
                      new Date(`${month.name.split(" ")[0]} 1, ${month.name.split(" ")[1]}`).getMonth(),
                      day
                    ).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
                    return (
                      <div
                        key={day}
                        onClick={() => handleDateSelect(month.name, day)}
                        className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${
                          isSelected ? "bg-blue-500 text-white font-bold" : "text-black hover:bg-gray-200"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-black text-sm">I don’t know my dates yet</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold text-black mb-6">Complete Your Booking</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="pax" className="block text-sm font-medium text-black mb-1">
                  Number of Pax
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handlePaxChange("decrement")}
                    disabled={formData.pax <= 1}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      formData.pax <= 1 ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white hover:bg-gray-200"
                    }`}
                  >
                    -
                  </button>
                  <div className="w-16 text-center px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black font-medium">
                    {formData.pax}
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePaxChange("increment")}
                    disabled={formData.pax >= 20}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      formData.pax >= 20 ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white hover:bg-gray-200"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Selected Date</label>
                <p className="text-black px-4 py-2 bg-gray-50 rounded-lg border border-gray-300">
                  {selectedDate || "No date selected"}
                </p>
              </div>
              <div>
                <label htmlFor="timeSlot" className="block text-sm font-medium text-black mb-1">
                  Select Time Slot
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  required
                >
                  <option value="">Select a time slot</option>
                  {availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot} className="text-black">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LfWUfYqAAAAAHMl0Z0GAoZbAjNfJKiIkMtudqki" // Replace with your actual site key
                  onChange={handleRecaptchaChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold"
                >
                  Submit Booking
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}