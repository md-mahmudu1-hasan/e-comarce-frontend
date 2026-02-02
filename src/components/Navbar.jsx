import React, { useState } from "react";
import { Link } from "react-router";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import useAuth from "../Hook/UseAuth";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-green-600 to-orange-500 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="ShopHub Logo" className="w-35 px-4" />
          </Link>

          {/* Search Box - Hidden on mobile, shown on tablet and up */}
          <div className="hidden md:flex">
            <div className="flex items-center bg-white/90 backdrop-blur rounded-lg w-[500px] overflow-hidden">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Icons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="flex flex-col items-center p-2 text-white hover:text-orange-200 transition-colors"
            >
              <IoCartOutline size={28} />
              <span className="text-xs mt-1">Cart</span>
            </Link>
            <Link
              to="/login"
              className={`flex flex-col items-center p-2 text-white hover:text-orange-200 transition-colors ${user && "hidden"}`}
            >
              <RiLoginBoxLine size={28} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center p-2 text-white hover:text-orange-200 transition-colors ${!user && "hidden"}`}
            >
              <FiUser size={24} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/cart"
              className="p-2 text-white hover:text-orange-200 transition-colors flex items-center"
            >
              <IoCartOutline size={28} />
            </Link>
                <Link
                  to="/login"
                  className={`p-2 text-white hover:text-orange-200 transition-colors flex items-center ${user && "hidden"}`}
                >
                  <RiLoginBoxLine size={24} />
                </Link>
                <Link
                  to="/profile"
                  className={`p-2 text-white hover:text-orange-200 transition-colors flex items-center ${!user && "hidden"}`}
                >
                  <FiUser size={24} />
                </Link>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden mt-4">
          <div className="flex items-center bg-white/90 backdrop-blur rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
