"use client";

function HeroSection() {
  return (
    <>
      <div className="bg-blue-500 w-full pt-16">
        {/* Content Container */}
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 relative overflow-hidden">
          {/* Content Layer */}
          <div className="relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 font-sigmar">
              Wonder Sri
            </h2>
            <p className="text-white text-base sm:text-lg md:text-xl mb-6 sigmar-regular">
               Discover Local Deals at the Best Prices
            </p>
          </div>

          {/* Image Positioned Below Text on Mobile */}
          <div className="mt-6 sm:mt-0 sm:absolute top-0 right-0 h-full flex items-center justify-end md:w-1/2 lg:w-2/5 opacity-90">
            <img
              src="./Logo.png"
              alt="Travel destination"
              className="w-full sm:w-auto object-contain max-h-64 sm:max-h-full"
            />
          </div>
        </div>
        <div></div>
        <div>
    </div>
      </div>
    </>
  );
}

export default HeroSection;
