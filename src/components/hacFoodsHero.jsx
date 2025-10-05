import React from "react";
import mensBanner from "../assets/hacfoods.png";

export default function hacFoods({ showHeading = true }) {
  return (
    <section className="w-full bg-white flex flex-col items-center pt-2 pb-6 px-4">
      {/* Title */}
      {showHeading && (
        <h2 className="text-xl sm:text-2xl md:text-4xl font-roboto font-bold text-center mb-8 sm:mb-12 md:mb-20">
          Dairy's  Items
        </h2>
      )}

      {/* Banner */}
      <div
        className="
          relative w-full max-w-6xl 
          aspect-[1280/670]   
          overflow-hidden shadow-lg 
          flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${mensBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Content */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-12 font-lato max-w-full">
          <h3 className="text-xs sm:text-lg md:text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
            Taste The Goodness Of Dairy
          </h3>
          <p className="text-[10px] sm:text-sm md:text-base lg:text-lg text-white mb-3 lg:mb-6">
            From our Farm To Your Table
          </p>
        </div>
      </div>
    </section>
  );
}
