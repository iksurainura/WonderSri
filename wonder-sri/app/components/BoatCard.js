"use client"; // Add this since we're using client-side features
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Activities() {
  const router = useRouter();
  const [activities, setActivities] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://wondersri-com-backend.onrender.com/api/v1/boats/front-page");
        const data = response.data;

        // Map the API response to your activities structure, including boatId
        const mappedActivities = data.map((boat) => ({
          boatId: boat.id, // Add boatId to the activity object
          title: boat.name,
          description: boat.description,
          duration: "3-Hours", // You can modify this if needed
          originalPrice: "Rs.10000",
          discountedPrice: `Rs. ${boat.price} / for ${boat.capacity} pax`,
          imageUrl: boat.imageUrls[0], // Use the first image URL
          rating: "★★★★☆", // You can modify this if needed
        }));

        setActivities(mappedActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBookNow = (boatId) => {
    // Redirect to the booking page with the boatId as a query parameter
    router.push(`/Booking?boatId=${encodeURIComponent(boatId)}`);
  };

  const handleDetail = (boatId) => {
    // Redirect to the detail page with the boatId as a query parameter
    router.push(`/Detail?boatId=${encodeURIComponent(boatId)}`);
  };

  return (
    <>
      <div className="bg-blue-500 w-full pt-16">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 bg-blue-200 rounded-lg">
          {/* Local Image */}
          <Image
            src="/offer1.png" // Path relative to the public folder
            alt="offer"
            width={1200} // Set width
            height={300} // Set height
            className="mb-6 rounded-lg object-cover"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md bg-white transform transition duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="relative group">
                  {/* External Image */}
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    width={400} // Set consistent width
                    height={300} // Set consistent height
                    className="object-cover w-full h-64 transform transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-white bg-red-600">
                    Flash deal
                  </span>
                </div>
                <div className="p-4 mt-2">
                  <h3
                    className="text-lg font-extrabold text-blue-800 mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {activity.title}
                  </h3>
                  <p
                    className="text-blue-700 text-sm mb-2 line-clamp-2"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {activity.description}
                  </p>
                  <p
                    className="text-blue-600 text-sm mb-2 line-clamp-2"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    <span className="font-medium">Duration:</span>{" "}
                    {activity.duration}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p
                        className="text-gray-500 text-sm line-through"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      >
                        {activity.originalPrice}
                      </p>
                      <p
                        className="text-md font-semibold text-green-700"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {activity.discountedPrice}
                      </p>
                      <p
                        className="text-red-600 text-xs font-medium"
                        style={{ fontFamily: "Open Sans, sans-serif" }}
                      >
                        Limited Time Offer!
                      </p>
                    </div>
                    <span
                      className="text-yellow-500 text-sm"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {activity.rating}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDetail(activity.boatId)}
                      className="flex-1 bg-blue-800 text-white text-sm py-2 px-4 rounded hover:bg-blue-900 transition-colors duration-200"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      More Details
                    </button>
                    <button
                      onClick={() => handleBookNow(activity.boatId)}
                      className="flex-1 bg-blue-400 text-white text-sm py-2 px-4 rounded hover:bg-blue-500 transition-colors duration-200"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}