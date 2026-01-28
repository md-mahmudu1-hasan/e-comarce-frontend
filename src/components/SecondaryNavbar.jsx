import React, { useState } from 'react';

const SecondaryNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const links = [
    { name: "Add Product", href: "/add-product" },
    { name: "Help & Support", href: "/help" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track Order", href: "/track" },
    { name: "Wishlist", href: "/wishlist" }
  ];

  return (
    <nav className="bg-green-800 text-white w-full border-b border-green-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center justify-between h-10">
          <div className="flex items-center space-x-6 overflow-x-auto">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-green-100 hover:text-white hover:bg-green-700 px-3 py-2 rounded text-sm font-medium transition-all duration-200 whitespace-nowrap relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden">
          {/* Collapsed State */}
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-4 overflow-x-auto flex-1">
              {links.slice(0, 3).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-green-100 hover:text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-green-100 hover:text-white p-2 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Expanded Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="bg-green-900 border-t border-green-800 py-2">
              <div className="grid grid-cols-2 gap-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-green-100 hover:text-white hover:bg-green-700 px-3 py-2 rounded text-sm font-medium transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tablet View (md screens) - Horizontal Scroll */}
        <div className="hidden md:flex lg:hidden items-center h-10">
          <div className="flex items-center space-x-4 overflow-x-auto flex-1 scrollbar-hide">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-green-100 hover:text-white hover:bg-green-700 px-3 py-2 rounded text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export default SecondaryNavbar;
