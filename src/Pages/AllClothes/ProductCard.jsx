import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product, name }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-yellow-400">★</span>);
    if (hasHalfStar) stars.push(<span key="half" className="text-yellow-400 relative">★</span>);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    return stars;
  };

  const discountPercentage = Math.round(((product.main_price - product.after_discount_price) / product.main_price) * 100);

  return (
    <Link to={`/${name}/${product._id}`} className="block h-full group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 cursor-pointer h-full flex flex-col relative">
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {discountPercentage}% OFF
        </div>
        <div className="w-full h-40 overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-sm text-gray-900 font-semibold mb-2 line-clamp-2 leading-5 h-8 group-hover:text-orange-600 transition-colors duration-300">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                {renderStars(product.ratings)}
              </div>
              <span className="text-gray-600 text-xs font-medium">({product.ratings})</span>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                ₹{product.after_discount_price}
              </span>
              <span className="text-sm lg:text-base text-gray-400 line-through">
                ₹{product.main_price}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
