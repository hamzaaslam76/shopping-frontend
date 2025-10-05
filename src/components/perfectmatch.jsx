import React, { useState } from "react";

const PerfectMatch = () => {
  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  const [selectedSize, setSelectedSize] = useState(38);

  return (
    <div className="relative w-full bg-pink-50 py-12 mb-6 flex flex-col items-center overflow-hidden">
      {/* Top Wavy Line */}
      <svg
        className="absolute top-8 left-10 w-32 h-6 text-pink-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 200 40"
      >
        <path d="M0 20 Q10 0, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" />
      </svg>

      {/* Second Wavy Line Below the First One (Left Side) */}
      <svg
        className="absolute top-20 left-10 w-32 h-6 text-pink-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 200 40"
      >
        <path d="M0 20 Q10 0, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" />
      </svg>

      {/* Bottom Wavy Line */}
      <svg
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 text-pink-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 200 40"
      >
        <path d="M0 20 Q10 0, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" />
      </svg>

      {/* Bigger Lightning Bolt */}
      <svg
        className="absolute top-6 right-8 w-20 h-20 text-pink-200"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13 2 L3 14 H11 L9 22 L21 10 H13 Z" />
      </svg>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-roboto font-semibold text-center mb-3 sm:mb-12 md:mb-20">
        Your Perfect Match
      </h2>

      {/* Sizes */}
      <div className="flex flex-wrap justify-center gap-3 relative z-10">
        {sizes.map((size) => (
          <div key={size} className="relative">
            {/* Button */}
            <button
              onClick={() => setSelectedSize(size)}
              className={`w-16 h-20 flex flex-col items-center justify-center border rounded-lg text-lg  font-roboto font-bold transition
                ${selectedSize === size
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-800 border-gray-300 hover:border-pink-400"
                }`}
            >
              {size}
              <span className="text-xs font-normal">EUR</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfectMatch;
