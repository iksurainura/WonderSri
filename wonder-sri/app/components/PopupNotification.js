"use client"; // Required for client-side interactivity
import { useState, useEffect } from "react";

export default function PopupNotification() {
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage to determine if the popup should be shown
  useEffect(() => {
    // FOR TESTING: Remove or comment out the next line after testing
    // localStorage.removeItem("hasVisited"); // Clears the "hasVisited" flag on every refresh

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsVisible(true); // Show popup only on the first visit
      localStorage.setItem("hasVisited", "true"); // Mark as visited
    }
  }, []);

  // Function to close the popup
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Popup Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          {/* Popup Container */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in transform transition-all duration-300 hover:scale-105">
            {/* Popup Icon */}
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            {/* Popup Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              Welcome to WonderSri!
            </h2>
            {/* Popup Message */}
            <p className="text-white text-center text-xs mb-6">
              Currently, our services are limited to the{" "}
              <span className="font-semibold">Southern Province</span>. We
              apologize for any inconvenience and appreciate your understanding as
              we work to expand our reach.
            </p>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Close notification" // Accessibility improvement
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
}