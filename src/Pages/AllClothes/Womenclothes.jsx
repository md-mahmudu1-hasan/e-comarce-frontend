import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast} from "react-hot-toast";
import useAxios from "../../Hook/useAxios";
import { useParams } from "react-router";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useCart } from "../../Context/CartContext";
import Loader from "../../components/Loader";

const WomenclothesDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [clothesdetails, setClothesdetails] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const axiosInstance = useAxios();

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

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    addToCart(clothesdetails, quantity);
    toast.success("Product added to cart");
  };

  const openSlider = (index) => {
    setSelectedImageIndex(index);
    setIsSliderOpen(true);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const nextImage = () => {
    if (clothesdetails?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % clothesdetails.images.length);
    }
  };

  const prevImage = () => {
    if (clothesdetails?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + clothesdetails.images.length) % clothesdetails.images.length);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    axiosInstance
      .get(`/womenclothes/${id}`)
      .then((res) => {
        setClothesdetails(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link
            to="/"
            className="text-green-700 hover:text-green-800 transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            to="/all-clothes"
            className="text-green-700 hover:text-green-800 transition-colors"
          >
            All Clothes
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">
            {clothesdetails.title}
          </span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg bg-gray-100 relative group">
                <img
                  src={clothesdetails.images[selectedImageIndex]}
                  alt={clothesdetails.title}
                  className="w-full h-full object-fit transition-transform duration-300 hover:scale-105 cursor-pointer rounded-lg"
                  onClick={() => openSlider(selectedImageIndex)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {clothesdetails.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 overflow-hidden rounded-lg border-2 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                      selectedImageIndex === index
                        ? "border-green-700 shadow-lg scale-105"
                        : "border-gray-200 hover:border-green-500 hover:scale-105"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image}
                      alt={`${clothesdetails.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {clothesdetails.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Brand: {clothesdetails.brand}
                  </span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Category: {clothesdetails.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex">{renderStars(clothesdetails.ratings)}</div>
                <span className="text-gray-700 font-medium">
                  {clothesdetails.ratings} out of 5
                </span>
                {/* <span className="text-gray-500 text-sm">
                  ({clothesdetails.reviews.length} reviews)
                </span> */}
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold text-green-700">
                    ₹{clothesdetails.after_discount_price}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      clothesdetails.stock > 10
                        ? "bg-green-100 text-green-800"
                        : clothesdetails.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {clothesdetails.stock > 0
                      ? `${clothesdetails.stock} in stock`
                      : "Out of Stock"}
                  </div>
                </div>
                {clothesdetails.stock > 0 && clothesdetails.stock <= 5 && (
                  <div className="text-orange-600 text-sm font-medium flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Only {clothesdetails.stock} left - Order soon!
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {clothesdetails.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="quantity"
                    className="text-gray-700 font-medium"
                  >
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {[...Array(Math.min(10, clothesdetails.stock))].map(
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={clothesdetails.stock === 0}
                  className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-semibold transition-all ${
                    clothesdetails.stock > 0
                      ? "bg-green-700 hover:bg-green-800 text-white hover:-translate-y-1 shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {clothesdetails.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">
                      Premium quality materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">
                      1 year manufacturer warranty
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-600">
                      Free shipping on orders above ₹999
                    </span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          {/* {clothesdetails.reviews.length > 0 ? (
            <div className="space-y-4">
              {clothesdetails.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {review.user}
                      </h4>
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )} */}
        </div>
      </div>

      {/* Image Slider Modal */}
      {isSliderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeSlider}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
            >
              <AiOutlineClose size={20} />
            </button>

            {/* Slider Content */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
                <img
                  src={clothesdetails.images[selectedImageIndex]}
                  alt={`${clothesdetails.title} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Thumbnails Sidebar */}
              <div className="lg:w-32 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4">
                <div className="space-y-3 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto">
                  {clothesdetails.images?.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "border-green-600 shadow-lg"
                          : "border-gray-200 hover:border-green-400"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${clothesdetails.title} - Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
            >
              <AiOutlineLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
            >
              <AiOutlineRight size={20} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedImageIndex + 1} / {clothesdetails.images?.length || 0}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenclothesDetails;
