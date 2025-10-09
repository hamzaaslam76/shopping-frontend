import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import logo from "../assets/jinn-logo.png";
import cartService from "../services/cartService";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Get initial cart count
    setCartCount(cartService.getCartCount());

    // Listen for cart changes (you can implement a custom event system if needed)
    const interval = setInterval(() => {
      setCartCount(cartService.getCartCount());
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

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
        <Link to="/checkout" className="relative">
          <BsHandbag className="w-5 h-5 cursor-pointer hover:text-pink-600" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
