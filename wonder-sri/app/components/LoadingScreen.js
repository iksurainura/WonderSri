"use client"; // Required for client-side rendering

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 seconds for demo

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed inset-0 z-50 transition-opacity duration-500 ease-in-out`}
    >
      {/* ... rest of your loading screen JSX ... */}
    </div>
  );
}
