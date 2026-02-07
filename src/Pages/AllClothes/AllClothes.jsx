import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../Hook/useAxios";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";

/* ================= Product Card ================= */
const ProductCard = ({ product, name }) => {
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

  const discountPercentage = Math.round(((product.main_price - product.after_discount_price) / product.main_price) * 100);

  return (
    <Link to={`/${name}/${product._id}`} className="block h-full group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 cursor-pointer h-full flex flex-col relative">
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {discountPercentage}% OFF
        </div>
        
        {/* Product Image */}
        <div className="w-full h-40 overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
          <img 
            src={product.images[0]} 
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
                {renderStars(product.ratings)}
              </div>
              <span className="text-gray-600 text-xs font-medium">({product.ratings})</span>
            </div>
          </div>
          
          {/* Price Section */}
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

const ClothesSection = ({ title, products, name, isLoading }) => {
  return (
    <section className="mb-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading 
            ? Array(10).fill(0).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} name={name} />
              ))
          }
        </div>
      </div>
    </section>
  );
};

const AllClothes = () => {
  const [kids, setKids] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kidsLoading, setKidsLoading] = useState(true);
  const [menLoading, setMenLoading] = useState(true);
  const [womenLoading, setWomenLoading] = useState(true);

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchKids = async () => {
      try {
        const res = await axiosInstance.get("/kidsclothes");
        setKids(res.data);
      } catch (error) {
        console.error("Error fetching kids clothes:", error);
      } finally {
        setKidsLoading(false);
      }
    };

    const fetchMen = async () => {
      try {
        const res = await axiosInstance.get("/mensclothes");
        setMen(res.data);
      } catch (error) {
        console.error("Error fetching men clothes:", error);
      } finally {
        setMenLoading(false);
      }
    };

    const fetchWomen = async () => {
      try {
        const res = await axiosInstance.get("/womensclothes");
        setWomen(res.data);
      } catch (error) {
        console.error("Error fetching women clothes:", error);
      } finally {
        setWomenLoading(false);
      }
    };

    fetchKids();
    fetchMen();
    fetchWomen();
  }, [axiosInstance]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-14 text-center">
        <h1 className="text-4xl font-bold mb-3">All Clothes</h1>
        <p className="text-gray-600">
          Complete collection for kids, men and women
        </p>
      </div>

      {/* Sections */}
      <ClothesSection title="Kids Clothes" products={kids} name="kidsclothes" isLoading={kidsLoading} />
      <ClothesSection title="Men's Clothes" products={men} name="mensclothes" isLoading={menLoading} />
      <ClothesSection title="Women's Clothes" products={women} name="womensclothes" isLoading={womenLoading} />
    </div>
  );
};

export default AllClothes;
