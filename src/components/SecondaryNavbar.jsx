import React from 'react';
import { NavLink } from 'react-router';
import './SecondaryNavbar.css';

const SecondaryNavbar = () => {
  const links = [
    { name: "All Clothes", href: "/all-clothes" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "About Us", href: "/about" }
  ];

  return (
    <nav className="bg-green-800 text-white w-full border-b border-green-900">
      <div className="max-w-7xl flex justify-center mx-auto px-4">
        {/* Desktop View */}
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-6 overflow-x-auto">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                className="text-green-100 hover:text-white hover:bg-green-700 px-3 py-2 rounded text-sm font-medium transition-all duration-200 whitespace-nowrap relative group"
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
