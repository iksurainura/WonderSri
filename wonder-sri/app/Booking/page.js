"use client";

import { Suspense } from "react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "next/navigation";

const today = new Date("2025-03-22");

function BookingPageContent() {
    const searchParams = useSearchParams();
    const activityTitle = searchParams.get("title") || "";
    const boatId = searchParams.get("boatId") || 1;

    const [formData, setFormData] = useState({
        boatId: boatId,
        userName: "",
        userEmail: "",
        userPhone: "",
        pax: 1,
        bookingDate: "",
        timeSlot: "",
        promoCode: "",
        activity: activityTitle,
    });

    const [selectedDate, setSelectedDate] = useState("");
    const [months, setMonths] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [fullyBookedDates, setFullyBookedDates] = useState(new Set());
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        const generateMonths = () => {
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            const fourDaysFromNow = new Date(today);
            fourDaysFromNow.setDate(today.getDate() + 4);

            const monthsData = [
                {
                    name: fourDaysFromNow.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    }),
                    days: new Array(new Date(currentYear, currentMonth + 1, 0).getDate())
                        .fill(null)
                        .map((_, i) => i + 1)
                        .filter((day) => {
                            const date = new Date(currentYear, currentMonth, day);
                            return date >= fourDaysFromNow;
                        }),
                    startDay: new Date(
                        currentYear,
                        currentMonth,
                        fourDaysFromNow.getDate()
                    ).getDay(),
                },
                {
                    name: new Date(currentYear, currentMonth + 1).toLocaleString(
                        "default",
                        {
                            month: "long",
                            year: "numeric",
                        }
                    ),
                    days: new Array(new Date(currentYear, currentMonth + 2, 0).getDate())
                        .fill(null)
                        .map((_, i) => i + 1),
                    startDay: new Date(currentYear, currentMonth + 1, 1).getDay(),
                },
            ];
            setMonths(monthsData);
        };
        generateMonths();
        fetchAllAvailableSlots();
    }, []);

    const fetchAllAvailableSlots = async () => {
        try {
            const response = await axios.get(
                "https://wondersri-backend-3bpi.onrender.com/api/v1/bookings/available-slots"
            );
            console.log("Fetched available slots:", response.data);
            const slotsData = response.data;
            const fullyBooked = new Set();

            slotsData.forEach(({ date, availableSlots }) => {
                if (availableSlots.length === 0) {
                    fullyBooked.add(
                        new Date(date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })
                    );
                }
            });
            setFullyBookedDates(fullyBooked);
            setAvailableSlots(slotsData);
        } catch (error) {
            console.error("Error fetching available slots:", error.message);
        }
    };

    useEffect(() => {
        const fetchAvailableTimeSlots = () => {
            console.log("Selected Date:", selectedDate);
            console.log("Available Slots:", availableSlots);

            if (!selectedDate || availableSlots.length === 0) {
                console.log("No selected date or available slots, resetting time slots.");
                setAvailableTimeSlots([]);
                return;
            }

            const slotForDate = availableSlots.find((slot) => {
                const apiDate = new Date(slot.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                console.log(`Comparing API Date: ${apiDate} with Selected Date: ${selectedDate}`);
                return apiDate === selectedDate;
            });

            if (slotForDate) {
                console.log("Found slot for date:", slotForDate);
                setFormData((prevData) => ({
                    ...prevData,
                    bookingDate: slotForDate.date,
                }));
                setAvailableTimeSlots(slotForDate.availableSlots);
            } else {
                console.log("No slots found for selected date:", selectedDate);
                setAvailableTimeSlots([]);
            }
        };
        fetchAvailableTimeSlots();
    }, [selectedDate, availableSlots]);

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
        const selected = new Date(
            parseInt(year, 10),
            monthIndex,
            day
        ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        if (!fullyBookedDates.has(selected)) {
            console.log("Date selected:", selected);
            setSelectedDate(selected);
        }
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const slotMapping = {
        "08:00 am -01:00 pm": "SLOT_1",
        "01:00 pm -05:00 pm": "SLOT_2",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        const payload = {
            boatId: formData.boatId,
            userName: formData.userName,
            userEmail: formData.userEmail,
            userPhone: formData.userPhone,
            bookingDate: formData.bookingDate,
            timeSlot: slotMapping[formData.timeSlot],
            promoCode: formData.promoCode.trim() === "" ? null : formData.promoCode,
        };

        console.log("Submitting payload:", payload);

        try {
            const response = await axios.post(
                " https://wondersri-backend-3bpi.onrender.com/api/v1/bookings/save-booking",
                payload
            );
            if (response.status === 201) {
                console.log("Booking Submitted:", payload);
                alert("Booking submitted successfully!");
                setFormData({
                    boatId: boatId,
                    userName: "",
                    userEmail: "",
                    userPhone: "",
                    pax: 1,
                    bookingDate: "",
                    timeSlot: "",
                    promoCode: "",
                    activity: activityTitle,
                });
                setSelectedDate("");
            } else {
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error.message);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                alert(
                    "Booking failed: " +
                    (error.response.data.error ||
                        error.response.data.message ||
                        "Bad Request")
                );
            } else {
                alert("Booking failed: Network error");
            }
        }
        recaptchaRef.current?.reset();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 relative overflow-hidden">
                <h2 className="text-3xl font-extrabold text-blue-600 mb-8">
                    Embark on an Adventure: Book Your Boat Ride
                </h2>

                <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        {months.map((month) => (
                            <div
                                key={month.name}
                                className="flex-1 border border-gray-300 rounded-lg p-4 bg-white"
                            >
                                <h2 className="text-lg font-semibold text-black text-center mb-3">
                                    {month.name}
                                </h2>
                                <div className="grid grid-cols-7 gap-2 text-center text-black font-medium">
                                    <div>S</div>
                                    <div>M</div>
                                    <div>T</div>
                                    <div>W</div>
                                    <div>T</div>
                                    <div>F</div>
                                    <div>S</div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 mt-3 text-center">
                                    {Array(month.startDay)
                                        .fill(null)
                                        .map((_, i) => (
                                            <div key={`empty-${i}`} className="p-2"></div>
                                        ))}
                                    {month.days.map((day) => {
                                        const dateStr = new Date(
                                            parseInt(month.name.split(" ")[1], 10),
                                            new Date(
                                                `${month.name.split(" ")[0]} 1, ${
                                                    month.name.split(" ")[1]
                                                }`
                                            ).getMonth(),
                                            day
                                        ).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                        const isSelected = selectedDate === dateStr;
                                        const isDisabled = fullyBookedDates.has(dateStr);
                                        return (
                                            <div
                                                key={day}
                                                onClick={() =>
                                                    !isDisabled && handleDateSelect(month.name, day)
                                                }
                                                className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${
                                                    isSelected
                                                        ? "bg-blue-500 text-white font-bold"
                                                        : isDisabled
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "text-black hover:bg-gray-200"
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
                    <p className="mt-4 text-center text-black text-sm">
                        Bookings available 4 days in advance
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-black mb-6">
                        Complete Your Booking
                    </h3>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-medium text-black mb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="userEmail"
                                    className="block text-sm font-medium text-black mb-1"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="userEmail"
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="userPhone"
                                    className="block text-sm font-medium text-black mb-1"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="userPhone"
                                    name="userPhone"
                                    value={formData.userPhone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="promoCode"
                                    className="block text-sm font-medium text-black mb-1"
                                >
                                    Promotional Code (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="promoCode"
                                    name="promoCode"
                                    value={formData.promoCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                                    placeholder="Enter promo code (e.g., DISCOUNT10)"
                                />
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="pax"
                                    className="block text-sm font-medium text-black mb-1"
                                >
                                    Number of Pax
                                </label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => handlePaxChange("decrement")}
                                        disabled={formData.pax <= 1}
                                        className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                            formData.pax <= 1
                                                ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                                : "bg-white hover:bg-gray-200"
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
                                            formData.pax >= 20
                                                ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                                : "bg-white hover:bg-gray-200"
                                        }`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Selected Date
                                </label>
                                <p className="text-black px-4 py-2 bg-gray-50 rounded-lg border border-gray-300">
                                    {selectedDate || "No date selected"}
                                </p>
                            </div>
                            <div>
                                <label
                                    htmlFor="timeSlot"
                                    className="block text-sm font-medium text-black mb-1"
                                >
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
                                    {availableTimeSlots.length > 0 ? (
                                        availableTimeSlots.map((slot) => (
                                            <option key={slot} value={slot} className="text-black">
                                                {slot}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No available time slots
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey="6LfWUfYqAAAAAHMl0Z0GAoZbAjNfJKiIkMtudqki"
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