import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { useCart } from '../Context/CartContext';
import { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
  const product = useLoaderData();
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="product-details-container min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400 relative">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(product, quantity);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-green-700 hover:text-green-800 transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/products" className="text-green-700 hover:text-green-800 transition-colors">Products</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-fit transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 overflow-hidden rounded-lg border-2 border-gray-200 cursor-pointer hover:border-green-700 transition-colors">
                    <img 
                      src={product.image} 
                      alt={`${product.title} ${i}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Brand: {product.brand}
                  </span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Category: {product.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-700 font-medium">{product.rating} out of 5</span>
                <span className="text-gray-500 text-sm">({product.reviews.length} reviews)</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold text-green-700">₹{product.price}</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </div>
                </div>
                {product.stock > 0 && product.stock <= 5 && (
                  <div className="text-orange-600 text-sm font-medium flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Only {product.stock} left - Order soon!
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-3">
                  <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity:</label>
                  <select id="quantity" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold transition-all ${
                    product.stock > 0 
                      ? 'bg-green-700 hover:bg-green-800 text-white hover:-translate-y-1 shadow-lg' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">Premium quality materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">1 year manufacturer warranty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">Free shipping on orders above ₹999</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">30-day return policy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map(review => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{review.user}</h4>
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-8">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
