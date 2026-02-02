import React from 'react';
import { Link } from 'react-router';
import { FiArrowLeft, FiShoppingBag, FiUsers, FiAward, FiTruck, FiHeadphones, FiHeart, FiTarget, FiTrendingUp } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white font-medium mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopHub</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Your trusted online shopping destination for quality products at great prices. 
            We're committed to making your shopping experience simple, secure, and enjoyable.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-700 max-w-none">
              <p className="mb-4">
                Founded in 2024, ShopHub began with a simple mission: to create an online shopping platform 
                that puts customers first. What started as a small team of passionate individuals has grown 
                into a thriving e-commerce destination serving thousands of satisfied customers.
              </p>
              <p className="mb-4">
                We noticed that many online shopping platforms were either too complicated or lacked the 
                personal touch that makes shopping enjoyable. That's why we built ShopHub with a focus on 
                user experience, quality products, and exceptional customer service.
              </p>
              <p>
                Today, ShopHub offers a curated selection of products across various categories, all 
                carefully selected to meet our high standards for quality, value, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center mb-4">
                <FiTarget className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide customers with a seamless online shopping experience by offering quality products 
                at competitive prices, backed by exceptional customer service and a user-friendly platform 
                that makes shopping enjoyable and stress-free.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center mb-4">
                <FiTrendingUp className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become the most trusted and preferred online shopping destination in Bangladesh, 
                known for our commitment to quality, customer satisfaction, and innovation in e-commerce.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">
                Every decision we make is guided by what's best for our customers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                We never compromise on quality and only offer products we'd use ourselves.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600 text-sm">
                We deliver on our promises and ensure a consistent, dependable experience.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                We build lasting relationships with our customers and partners.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose ShopHub?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FiShoppingBag className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Selection</h3>
                <p className="text-gray-600">
                  Thousands of carefully curated products across multiple categories.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FiTruck className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick and reliable delivery to your doorstep with real-time tracking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FiHeadphones className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer service team is always here to help you with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Our dedicated team works tirelessly to bring you the best shopping experience possible.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">JD</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                <p className="text-gray-600">Founder & CEO</p>
                <p className="text-sm text-gray-500 mt-2">
                  Leading our vision to revolutionize online shopping in Bangladesh.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">JS</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Jane Smith</h3>
                <p className="text-gray-600">Head of Operations</p>
                <p className="text-sm text-gray-500 mt-2">
                  Ensuring smooth operations and exceptional customer service.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">MJ</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Mike Johnson</h3>
                <p className="text-gray-600">Tech Lead</p>
                <p className="text-sm text-gray-500 mt-2">
                  Building and maintaining our cutting-edge e-commerce platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
