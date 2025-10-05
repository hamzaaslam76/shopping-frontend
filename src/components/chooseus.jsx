import React from "react";
import { Truck, RotateCcw, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-15 h-15 text-gray-600" />,
    title: "Free Delivery",
    desc: "Enjoy Free Shipping On All Orders Above Rs 3,000.",
  },
  {
    icon: <RotateCcw className="w-15 h-15 text-gray-600" />,
    title: "Easy Returns",
    desc: "Not Satisfied? Hassle-Free Returns & Exchanges Within 7 Days.",
  },
  {
    icon: <CreditCard className="w-15 h-15 text-gray-600" />,
    title: "Secure Payments",
    desc: "Shop Confidently With Safe Payment Options Including COD & Online Methods.",
  },
  {
    icon: <Headphones className="w-15 h-15 text-gray-600" />,
    title: "24/7 Customer Support",
    desc: "Our Team Is Always Available To Help You With Queries Anytime.",
  },
];

const ChooseUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
        WHY CHOOSE US?
      </h2>
      
      {/* 📱 2 icons per row on mobile, 4 on medium screens and above */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-25 h-25 rounded-full bg-pink-100 mb-3">
              {item.icon}
            </div>
            <h3 className="text-xl font-roboto font-bold text-gray-800 mb-5">
              {item.title}
            </h3>
            <p className="text-sm font-lato text-gray-600 max-w-[200px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
