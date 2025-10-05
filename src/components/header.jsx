import React from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import logo from "../assets/jinn-logo.png";

const Header = () => {
  return (
    <nav className="container mx-auto px-6 md:px-8 flex justify-between items-center py-2 sm:py-4">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src={logo}
            alt="Jinn Store Logo"
            className="w-10 h-10 object-contain"
          />
        </Link>
        <Link to="/" className="font-bold text-xl font-lato text-gray-900">
          JINN STORE
        </Link>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-bold font-lato">
        <li>
          <Link to="/" className="hover:text-pink-600">
            New Arrival
          </Link>
        </li>
        <li>
          <Link to="/men-collections" className="hover:text-pink-600">
            Men's Collection
          </Link>
        </li>
        <li>
          <Link to="/women-collections" className="hover:text-pink-600">
            Women's Collection
          </Link>
        </li>
        <li>
          <Link to="/hacfoods" className="hover:text-pink-600">
            Hac Foods
          </Link>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4 text-gray-700">
        <IoIosHeartEmpty className="w-5 h-5 cursor-pointer hover:text-pink-600" />
 <Link to="/checkout">
    <BsHandbag className="w-5 h-5 cursor-pointer hover:text-pink-600" />
  </Link>      </div>
    </nav>
  );
};

export default Header;
