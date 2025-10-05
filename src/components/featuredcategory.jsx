import React from "react";
import blueShoe from "../assets/blue-shoes.png";
import pinkShoe from "../assets/pink-shoes.png";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Men's Collection",
    image: blueShoe,
    link: "/men-collections",   // 👈 direct category page
  },
  {
    title: "Women's Collection",
    image: pinkShoe,
    link: "/women-collections",   // 👈 direct category page
  },
];

export default function FeaturedCategories() {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-10">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-roboto font-bold text-center mb-20">
        Featured Categories
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.link)} 
            className="relative rounded-2xl shadow-md overflow-hidden bg-white aspect-[4/3] md:aspect-[5/4] cursor-pointer transition hover:shadow-lg"
          >
            {/* Shoe Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-contain scale-110 drop-shadow-2xl"
            />

            {/* Title Top Center */}
            <div className="absolute top-6 inset-x-0 text-center z-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 drop-shadow-md">
                {cat.title}
              </h3>
            </div>

            {/* Button Bottom Left */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-sm md:text-base font-lato font-medium text-gray-800">
              <BsArrowUpRightSquareFill className="text-black text-lg" />
              <span>See Collection</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
