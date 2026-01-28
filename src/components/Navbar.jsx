import React, { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-green-700">ShopHub</h2>
          </div>

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
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-green-700 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2L6 9H3L2 22H22L21 9H18L15 2H9Z"/>
              </svg>
              <span className="text-xs mt-1">Cart</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-green-700 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"/>
                <path d="M10 3V8H14V3"/>
                <circle cx="12" cy="11" r="1"/>
                <circle cx="12" cy="15" r="1"/>
              </svg>
              <span className="text-xs mt-1">Login</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-green-700 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-green-700 transition-colors flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 2L6 9H3L2 22H22L21 9H18L15 2H9Z"/>
              </svg>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6L18 18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12H21M3 6H21M3 18H21"/>
                </svg>
              )}
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
              <button className="flex items-center space-x-3 p-2 text-gray-600 hover:text-green-700 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9"/>
                  <path d="M10 3V8H14V3"/>
                  <circle cx="12" cy="11" r="1"/>
                  <circle cx="12" cy="15" r="1"/>
                </svg>
                <span className="text-gray-700">Login</span>
              </button>
              <button className="flex items-center space-x-3 p-2 text-gray-600 hover:text-green-700 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="text-gray-700">Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
