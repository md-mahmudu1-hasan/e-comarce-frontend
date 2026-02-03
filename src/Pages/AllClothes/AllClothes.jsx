import React, { useState } from "react";
import { Link } from "react-router";
import {
  kidsClothes,
  mensClothes,
  womensClothes,
} from "../../data/clothingProducts";

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 relative">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>,
      );
    }

    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 cursor-pointer h-full flex flex-col relative">
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {product.discount}% OFF
        </div>

        {/* Product Image */}
        <div className="w-full h-40 overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            {/* Product Title */}
            <h3 className="text-sm text-gray-900 font-semibold mb-2 line-clamp-2 leading-5 h-8 group-hover:text-orange-600 transition-colors duration-300">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600 text-xs font-medium">
                ({product.rating})
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                ₹{product.price}
              </span>
              <span className="text-sm lg:text-base text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                In Stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ClothingSection = ({ title, products, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-600 hover:text-green-600"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {renderPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-600 hover:text-green-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-600 hover:text-green-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const AllClothes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Clothes</h1>
          <p className="text-xl opacity-90">
            Discover our complete collection of clothing for everyone
          </p>
        </div>
      </section>

      {/* Kids' Clothes Section */}
      <ClothingSection
        title="Kids' Clothes"
        products={kidsClothes}
        itemsPerPage={10}
      />

      {/* Men's Clothes Section */}
      <ClothingSection
        title="Men's Clothes"
        products={mensClothes}
        itemsPerPage={10}
      />

      {/* Women's Clothes Section */}
      <ClothingSection
        title="Women's Clothes"
        products={womensClothes}
        itemsPerPage={10}
      />
    </div>
  );
};

export default AllClothes;
