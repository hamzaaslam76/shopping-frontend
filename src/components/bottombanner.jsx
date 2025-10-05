import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMegaphoneOutline } from "react-icons/io5";

const BottomBanner = () => {
  return (
    <div className="bg-black text-white font-roboto flex flex-col sm:flex-row items-center justify-center text-left py-6 px-4 sm:px-10 gap-6">
      
      {/* Free Shipping */}
      <div className="flex items-center gap-5 text-xs sm:text-sm md:text-base">
        <CiDeliveryTruck className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        <span>Free Shipping On Orders Above Rs 3,000 Nationwide!</span>
      </div>

      {/* Discount Offer */}
      <div className="flex items-center gap-5 text-xs sm:text-sm md:text-base">
        <IoMegaphoneOutline className="text-white w-5 h-5 sm:w-6 sm:h-6" />
        <span>Flat 20% OFF On All New Arrivals – Limited Time Only!</span>
      </div>

    </div>
  );
};

export default BottomBanner;
