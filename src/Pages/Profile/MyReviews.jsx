import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import useAxios from '../../Hook/useAxios';
import useAuth from '../../Hook/UseAuth';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockReviews = [
          {
            id: 1,
            productName: 'Wireless Headphones',
            productImage: 'https://via.placeholder.com/100x100/2d7a2d/ffffff?text=Headphones',
            rating: 5,
            review: 'Amazing sound quality! The noise cancellation is incredible. Best purchase I\'ve made this year.',
            date: '2024-01-10',
            verified: true
          },
          {
            id: 2,
            productName: 'Smart Watch',
            productImage: 'https://via.placeholder.com/100x100/2d7a2d/ffffff?text=Smart+Watch',
            rating: 4,
            review: 'Great smartwatch with good battery life. The interface is intuitive and the health tracking features are accurate.',
            date: '2024-01-05',
            verified: true
          },
          {
            id: 3,
            productName: 'Laptop Backpack',
            productImage: 'https://via.placeholder.com/100x100/2d7a2d/ffffff?text=Backpack',
            rating: 4,
            review: 'Very spacious and well-made. Fits my 15-inch laptop perfectly. Good value for money.',
            date: '2023-12-28',
            verified: false
          }
        ];
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [user]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
        <p className="text-gray-600">Manage your product reviews and ratings</p>
      </div>

      {loading ? (
        <Loader size="large" text="Loading your reviews..." />
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Review Header */}
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{review.productName}</h3>
                        {review.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{review.review}</p>
                      
                      <div className="flex items-center space-x-4">
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                          Edit Review
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                          Share
                        </button>
                        <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-6">You haven't written any product reviews yet.</p>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Browse Products
              </button>
            </div>
          )}

          {/* Review Stats */}
          {reviews.length > 0 && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {reviews.filter(r => r.verified).length}
                  </div>
                  <div className="text-sm text-gray-600">Verified Purchases</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyReviews;
