"use client";
import React, { useEffect, useState } from "react";

const DayPicker = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  // Define months dynamically based on the current date
  const getMonths = () => {
    const today = new Date();
    const months = [];
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const monthName = monthDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      const daysInMonth = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0
      ).getDate();
      const startDay = (monthDate.getDay() + 6) % 7; // Adjust to start on Sunday (0-6)
      months.push({ name: monthName, days: Array.from({ length: daysInMonth }, (_, i) => i + 1), startDay });
    }
    return months;
  };

  const months = getMonths();

  useEffect(() => {
    // Fetch available dates and time slots from your API
    fetch("/api/available-dates")
      .then((response) => response.json())
      .then((data) => {
        setAvailableDates(data.dates);
      })
      .catch((error) => console.error("Error fetching available dates:", error));
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Fetch time slots for the selected date
    fetch(`/api/available-times?date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeSlots(data.times);
      })
      .catch((error) => console.error("Error fetching time slots:", error));
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          aria-label="Previous Months"
          onClick={() => {
            // Logic to go to previous months (implement if needed)
            console.log("Previous months not implemented yet");
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="text-gray-500 hover:text-gray-700"
          aria-label="Next Months"
          onClick={() => {
            // Logic to go to next months (implement if needed)
            console.log("Next months not implemented yet");
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {months.map((month) => (
          <div
            key={month.name}
            className="flex-1 border-2 border-white rounded-lg p-2"
          >
            <h2 className="text-lg font-semibold text-white text-center mb-2">
              {month.name}
            </h2>
            <div className="grid grid-cols-7 gap-1 text-center text-white font-medium">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2 text-center">
              {Array(month.startDay)
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}
              {month.days.map((day) => {
                const date = new Date(
                  new Date(`${month.name} 1`).getFullYear(),
                  new Date(`${month.name} 1`).getMonth(),
                  day
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
                const isAvailable = availableDates.includes(date);
                const isSelected = selectedDate === date;
                return (
                  <div
                    key={day}
                    onClick={() => isAvailable && handleDateSelect(date)}
                    className={`p-2 rounded-full cursor-pointer ${
                      isSelected
                        ? "bg-white text-blue-700 font-bold"
                        : isAvailable
                        ? "text-white hover:bg-blue-600"
                        : "text-gray-500 cursor-not-allowed"
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
      <p className="mt-4 text-center text-white">I don’t know my dates yet</p>

      {selectedDate && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white">
            Available Time Slots for {selectedDate}
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {timeSlots.map((timeSlot, index) => (
              <div
                key={index}
                className="p-2 bg-blue-600 text-white rounded-lg text-center"
              >
                {timeSlot}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayPicker;