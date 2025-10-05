import React from "react";
import womensShoes from "../assets/womens-collection.jpeg";
import { useNavigate } from "react-router-dom";

export default function WomensCollection({ showHeading = true }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex flex-col items-center pt-4 pb-2 px-4">
      {/* Title above card */}
      {showHeading && (
        <h2 className="text-xl sm:text-2xl md:text-4xl font-roboto font-bold text-center mb-8 sm:mb-12 md:mb-20">
          Women&apos;s Collection
        </h2>
      )}

      {/* Card */}
      <div
        className="
          relative overflow-hidden mb-10 
          w-full max-w-[1120px]
          h-[220px] sm:h-[350px] md:h-[480px] lg:h-[620px]
          bg-contain sm:bg-cover
          bg-transparent sm:bg-[#fce4ec]
        "
        style={{
          backgroundImage: `url(${womensShoes})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/20"></div>

        {/* Text Content */}
        <div
          className="absolute left-3 sm:left-6 md:left-12 
                    bottom-14 sm:bottom-10 md:bottom-16 
                   lg:top-1/3 lg:bottom-auto
                   z-10 max-w-[85%] sm:max-w-sm md:max-w-md text-left
                   "
        >
          <h3 className="text-lg sm:text-2xl md:text-4xl font-Lato font-semibold text-gray-900 leading-snug">
            <span>Your Essentials</span>
            <br />
            <span>For Winning.</span>
          </h3>
          <p className="text-gray-700 font-lato mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
            Discover Your Style With Us.
          </p>
          <button
            onClick={() => navigate("/women-collections")} 
            className="mt-3 sm:mt-5 font-lato bg-pink-500 hover:bg-pink-600 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm md:text-base transition"
          >
            Shop Women&apos;s Collection
          </button>
        </div>
      </div>
    </div>
  );
}
