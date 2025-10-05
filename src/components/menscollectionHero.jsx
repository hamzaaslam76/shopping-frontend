import React from "react";
import mensBanner from "../assets/menscollection.jpeg";
import { useNavigate } from "react-router-dom";

export default function MensCollection({ showHeading = true }) {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white flex flex-col items-center pt-4 pb-8 px-4">
      {/* Title */}
      {showHeading && (
        <h2 className="text-xl sm:text-2xl md:text-4xl font-roboto font-bold text-center mb-8 sm:mb-12 md:mb-20">Men’s Collection</h2>
      )}
      {/* Banner */}
      <div
        className="
          relative w-full max-w-6xl 
          aspect-[1280/670]   
          overflow-hidden shadow-lg 
          flex items-start justify-start text-left"
        style={{
          backgroundImage: `url(${mensBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Content */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-12 font-lato pt-2 sm:pt-8 md:pt-12 lg:pt-16 max-w-full ml-0 md:ml-16 lg:ml-20">
          <div className="mt-0 sm:mt-4 md:mt-6">
            <h3 className="text-xs sm:text-lg md:text-2xl lg:text-4xl font-bold text-black mb-2 lg:mb-4 whitespace-nowrap sm:whitespace-normal">
              Built For Style & Strength
            </h3>
            <p className="text-[10px] sm:text-sm md:text-base lg:text-lg text-black mb-3 lg:mb-6 whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis">
              From Premium Leather Shoes To Everyday Casuals – Discover The Perfect Pair For Every Step.
            </p>
            <button
              onClick={() => navigate("/men-collections")}

              className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium hover:bg-gray-800 transition">
              Shop Men’s Collection
            </button>
          </div>
        </div>


      </div>
    </section>
  );
}                           