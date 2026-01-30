import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import { RiLoginBoxLine } from 'react-icons/ri';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-green-700">ShopHub</h2>
          </Link>

          {/* Search Box - Hidden on mobile, shown on tablet and up */}
          <div className="hidden md:flex">
            <div className="flex items-center bg-gray-100 rounded-lg w-[500px] overflow-hidden">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              />
              <button className="px-6 py-3 bg-green-700 text-white font-medium hover:bg-green-800 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Icons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-700 transition-colors">
              <IoCartOutline size={28} />
              <span className="text-xs mt-1">Cart</span>
            </Link>
            <Link to="/login" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-700 transition-colors">
              <RiLoginBoxLine size={28} />
              <span className="text-xs mt-1">Login</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-700 transition-colors">
              <FiUser size={24} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="p-2 text-gray-600 hover:text-green-700 transition-colors flex items-center">
             <IoCartOutline size={28} />
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden mt-4">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
            <button className="px-6 py-3 bg-green-700 text-white font-medium hover:bg-green-800 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide down menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/login" className="flex items-center space-x-3 p-2 text-gray-600 hover:text-green-700 transition-colors">
                <RiLoginBoxLine size={24} />
                <span className="text-gray-700">Login</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-3 p-2 text-gray-600 hover:text-green-700 transition-colors">
                <FiUser size={24} />
                <span className="text-gray-700">Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

