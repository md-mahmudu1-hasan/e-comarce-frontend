import React from 'react';
import { NavLink } from 'react-router';
import './SecondaryNavbar.css';

const SecondaryNavbar = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "All Clothes", href: "/all-clothes" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "About Us", href: "/about" }
  ];

  return (
    <nav className="bg-green-800 text-white w-full border-b border-green-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center h-8 sm:h-10 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-6">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                className="text-green-100 hover:text-white hover:bg-green-700 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNavbar;
