import React from "react";
import sneakers from "../assets/shoesHero.jpeg";

const Hero = () => {
  return (
  <section className="container mx-auto px-8 md:px-10 flex flex-col md:flex-row items-center md:items-center pt-8 md:pt-16 pb-16 bg-white">

      
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          New Arrivals <br /> Just Dropped
        </h1>
        <p className="mt-6 text-gray-600 text-base md:text-lg">
          Fresh Styles, Premium Comfort – Grab Them <br /> Before They’re Gone.
        </p>
        <div className="mt-8 flex justify-center md:justify-start gap-6">
          <button className="bg-pink-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-pink-700 transition">
            Shop Now
          </button>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition">
            View All
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 flex justify-center md:justify-start mt-0">
        <img
          src={sneakers}
          alt="Hero Sneakers"
          className="w-full max-w-[500px] md:w-[480px] lg:w-[500px] rounded-xl object-contain 
                     drop-shadow-[0_15px_40px_rgba(236,72,153,0.6)]"
        />
      </div>
    </section>
  );
};

export default Hero;
