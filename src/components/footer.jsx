import React from "react";
import logo from "../assets/logo.png";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white font-lato font-semibold">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-start gap-6">
        {/* Logo + Text Wrapper */}
        <div className="flex flex-col md:flex-row items-center md:items-start w-full">
          <img
            src={logo}
            alt="Jinn Store Logo"
            className="w-[175px] h-[109px] object-contain"
          />

          {/* Paragraph */}
          <div className="mt-4 md:mt-12 md:ml-4 text-white text-sm max-w-xl md:max-w-2xl lg:max-w-3xl">
            <p className="font-lato text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left whitespace-normal md:whitespace-nowrap">
              Your Trusted Destination For Quality Footwear.
              Shop With Confidence, Enjoy Secure Payments, And Get Doorstep <br /> Delivery Every Time.
            </p>
          </div>
        </div>
      </div>


      <hr className="bg-[#C1C7CD] w-1,280px h-1px  md:w-[90%] mx-auto" />

      {/* Middle Section */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}

        <div>
          <h3 className="font-sora font-bold mb-6 uppercase">Quick Links</h3>
          <ul className="font-inter space-y-2 text-white text-sm">
            <li>
              <Link to="/" className="hover:text-pink-500 cursor-pointer">
                New Arrival
              </Link>
            </li>
            <li>
              <Link to="/men-collections" className="hover:text-pink-500 cursor-pointer">
                Men's Collection
              </Link>
            </li>
            <li>
              <Link to="/women-collections" className="hover:text-pink-500 cursor-pointer">
                Women's Collection
              </Link>
            </li>
            <li>
              <Link to="/hacfoods" className="hover:text-pink-500 cursor-pointer">
                Hac Foods
              </Link>
            </li>
          </ul>
        </div>
        {/* Information */}
        <div>
          <h3 className=" font-sora font-bold mb-6 uppercase">Information</h3>
          <ul className="font-inter space-y-2 text-white text-sm">
            <li className="hover:text-pink-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-pink-500 cursor-pointer">Return & Exchange</li>
            <li className="hover:text-pink-500 cursor-pointer">Terms & Condition</li>
            <li className="hover:text-pink-500 cursor-pointer">FAQ’s</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-sora font-bold mb-3 uppercase">Let’s Get In Touch</h3>
          <p className="font-inter text-sm text-white mb-3">
            Sign up for our newsletter for updates and offers.
          </p>
          <div className="flex w-full">
            <div className="relative w-full">
              {/* Search Icon inside input */}
              <span className="absolute inset-y-0 left-3 flex items-center text-black">
                <FiSearch />
              </span>

              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full bg-white pl-10 pr-3 py-2 text-gray-800 focus:outline-none text-sm"
              />
            </div>

            <button className="bg-pink-600 px-4 py-2 hover:bg-pink-700 text-sm">
              Search
            </button>
          </div>

          {/* Join Us */}
          <div className="w-[479px] h-auto flex flex-col gap-2 mt-8">
            <p className="font-inter text-sm text-white">Join Us</p>
            <div className="flex gap-4 text-white text-lg">
              <FaYoutube className="hover:text-white cursor-pointer" />
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
              <FaLinkedinIn className="hover:text-white cursor-pointer" />
            </div>
          </div>

        </div>
      </div>
      <hr className="bg-[#C1C7CD] w-full h-px md:w-[90%] mx-auto" />

      {/* Bottom Section */}
      <div className="container mx-auto px-6  py-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>
          Jinn Store © 2025. All rights reserved. Powered By:{" "}
          <span className="text-pink-500 cursor-pointer">Altcode Technologies</span>
        </p>
        <ul className="flex gap-4  text-white md:mt-0">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">Help Center</li>
          <li className="hover:text-white cursor-pointer">About</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
