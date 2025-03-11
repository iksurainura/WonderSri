"use client"; // Required for client-side interactivity
import { useState, useEffect } from "react";

export default function PopupNotification() {
  const [isVisible, setIsVisible] = useState(false);

  // Check if popup should be shown (only for new users, with testing override)
  useEffect(() => {
    console.log("Checking if popup should be shown..."); // Debug log

    // TESTING OVERRIDE: Uncomment the next line and comment the 'hasVisited' logic below after testing
    // This ensures the popup reappears on every refresh during development
     setIsVisible(true); // TESTING: Remove or comment this line after testing

    // PRODUCTION LOGIC: Show only for new users (comment this during testing)
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      console.log("No previous visit detected, showing popup");
      setIsVisible(true); // Show popup only on the first visit
      localStorage.setItem("hasVisited", "true"); // Mark as visited
    } else {
      console.log("User has visited before, hiding popup");
    }

  }, []);

  // Function to close the popup
  const handleClose = () => {
    console.log("Closing popup"); // Debug log
    setIsVisible(false);
  };

  // Text content in both languages
  const content = {
    en: {
      title: "Welcome to WonderSri!",
      message:
        "Currently, our services are limited to the <span className='font-semibold'>Southern Province</span>. We apologize for any inconvenience and appreciate your understanding as we work to expand our reach.",
      button: "Got it, thanks!",
    },
    si: {
      title: "වන්ඩර්ස්රි වෙත ඔබව සාදරයෙන් පිළිගනිමු!",
      message:
        "  දැනට අපගේ සේවාවන<span className='font-semibold'> දකුණු පළාතට</span> පමණක් සීමා වී ඇත. ඇතිව අපහසුතාවයකට අපි සමාව ඉල්ලා සිටිමු,",
      button: "හරි, තුති!",
    },
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
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                {content.en.title}
              </h2>
              <h2 className="text-xl font-bold text-white mt-1">
                {content.si.title}
              </h2>
            </div>

            {/* Popup Message */}
            <div className="text-center text-xs mb-6">
              <p
                className="text-white"
                dangerouslySetInnerHTML={{ __html: content.en.message }}
              />
              <p
                className="text-white mt-2"
                dangerouslySetInnerHTML={{ __html: content.si.message }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Close notification"
            >
              <span className="flex justify-center space-x-2">
                <span>{content.en.button}</span>
                <span>{content.si.button}</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};