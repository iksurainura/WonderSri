"use client"; // Add this since we're using client-side features
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Activities() {
  const router = useRouter();

  const activities = [
    {
      title: "Madu River Safari",
      description:
        "Explore the serene beauty of the Madu River with an unforgettable safari experience.",
      duration: "3-Hours",
      originalPrice: "Rs. 10,000",
      discountedPrice: "Rs. 9,000 / for 12 pax",
      imageUrl:
        "https://www.trawell.in/admin/images/upload/116283209Madu_River_Safari.jpg",
      rating: "★★★★☆",
    },
    {
      title: "Fish Therapy",
      description:
        "Experience the unique sensation of fish nibbling at your feet, a natural exfoliation therapy.",
      duration: "1-Hour",
      originalPrice: "Rs. 2,000",
      discountedPrice: "Rs. 1,500 / per person",
      imageUrl:
        "https://maduriversafari.lk/wp-content/uploads/2023/09/129675053348_61528087558_1657785626_n.jpg",
      rating: "★★★☆☆",
    },
    {
      title: "Temple Visit",
      description:
        "Visit ancient temples and immerse yourself in the spiritual and cultural heritage.",
      duration: "4-Hours",
      originalPrice: "Rs. 5,000",
      discountedPrice: "Rs. 4,000 / for 10 pax",
      imageUrl:
        "https://www.travels-tastes.com/data/images/barefoot.width-800.jpg",
      rating: "★★★★★",
    },
  ];

  const handleBookNow = (title) => {
    // Redirect to the booking page with the activity title as a query parameter
    router.push(`/Booking?title=${encodeURIComponent(title)}`);
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
                      className="flex-1 bg-blue-800 text-white text-sm py-2 px-4 rounded hover:bg-blue-900 transition-colors duration-200"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      More Details
                    </button>
                    <button
                      onClick={() => handleBookNow(activity.title)}
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