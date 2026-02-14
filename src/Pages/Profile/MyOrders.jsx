import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import useAuth from "../../Hook/UseAuth";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiShoppingCart,
  FiStar,
  FiX,
  FiCalendar,
  FiTrendingUp,
  FiSend,
} from "react-icons/fi";
import toast from "react-hot-toast";
import useAxios from "../../Hook/useAxios";

const MyOrders = ({ data }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
    productId: "",
  });

  console.log(reviewData);
  
  const [submittingReview, setSubmittingReview] = useState(false);
  const axiosInstance = useAxios();
  const { user } = useAuth();

  // Status configuration with colors and icons
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "pending":
        return {
          color: "yellow",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200",
          icon: FiClock,
          label: "Pending",
        };
      case "confirmed":
        return {
          color: "green",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200",
          icon: FiCheckCircle,
          label: "Confirmed",
        };
      case "canceled":
      case "cancelled":
        return {
          color: "red",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          icon: FiXCircle,
          label: "Canceled",
        };
      default:
        return {
          color: "gray",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          icon: FiPackage,
          label: status || "Unknown",
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        await axiosInstance.get(`/orders?email=${user?.email}`).then((res) => {
          setOrders(res.data);
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCancelOrder = (orderId) => {
    console.log("Cancelling order:", orderId);
    // Handle order cancellation logic here
  };

  const handleAddReview = (order) => {
    // const productId = order.products.map(item => item.title == )
    setSelectedOrder(order);
    setReviewData({
      rating: 0,
      comment: "",
      productId: "",
    });
    setReviewModal(true);
  };

  const handleCloseModal = () => {
    setReviewModal(false);
    setSelectedOrder(null);
    setReviewData({
      rating: 0,
      comment: "",
      productId: "",
    });
  };

  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewPayload = {
        orderId: selectedOrder._id,
        productId: reviewData.productId,
        userId: data?._id,
        userName: data?.name,
        rating: reviewData.rating,
        comment: reviewData.comment,
        userEmail: data?.email,
      };
     await axiosInstance.post("/reviews", reviewPayload);
      toast.success("Review submitted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-all duration-200 transform hover:scale-110"
          >
            <FiStar
              className={`w-8 h-8 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FiPackage className="mr-3 text-green-600" />
            My Orders
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {loading ? (
          <Loader size="large" text="Loading your orders..." />
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={order._id}
                      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${statusConfig.borderColor}`}
                    >
                      <div className="p-6">
                        {/* Order Header with Status */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                          <div className="mb-4 lg:mb-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <div
                                className={`px-3 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} text-sm font-medium flex items-center`}
                              >
                                <StatusIcon className="mr-2 w-4 h-4" />
                                {statusConfig.label}
                              </div>
                              <span className="text-sm text-gray-500">
                                Order #{order._id?.slice(-8)}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiCalendar className="mr-2 w-4 h-4" />
                              Placed on {formatDate(order.createdAt)}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {order.status?.toLowerCase() === "pending" && (
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                              >
                                <FiX className="mr-2 w-4 h-4" />
                                Cancel Order
                              </button>
                            )}
                            {order.status?.toLowerCase() === "confirmed" && (
                              <button
                                onClick={() => handleAddReview(order)}
                                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                              >
                                <FiStar className="mr-2 w-4 h-4" />
                                Add Review
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <FiShoppingCart className="mr-2 w-4 h-4" />
                            Order Items ({order.products?.length || 0})
                          </h4>
                          <div className="space-y-3">
                            {order.products?.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <FiPackage className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      Quantity: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-900">
                                    ৳{item.price}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    ৳{item.price} × {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Footer */}
                        <div className="border-t border-gray-100 mt-4 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <FiTrendingUp className="mr-2 w-4 h-4" />
                              Total Amount
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                              ৳{order.totalAmount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <FiPackage className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No orders yet
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here.
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-lg hover:from-green-700 hover:to-orange-600 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl">
                  <FiShoppingCart className="mr-3 w-5 h-5" />
                  Start Shopping
                </button>
              </div>
            )}
          </>
        )}

        {/* Review Modal */}
        {reviewModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FiStar className="mr-3 text-yellow-400 w-6 h-6" />
                    Write a Review
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Share your experience with this order
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Order Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="font-semibold text-gray-900">
                    #{selectedOrder?._id?.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedOrder?.products?.length || 0} items • ৳
                    {selectedOrder?.totalAmount}
                  </p>
                </div>

                {/* Product Selection */}
                {selectedOrder?.products?.length > 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Product to Review
                    </label>
                    <select
                      value={reviewData.productId}
                      onChange={(e) =>{
                        setReviewData({
                          ...reviewData,
                          productId: e.target.value,
                        })
                      }
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {selectedOrder.products.map((product, index) => (
                        <option
                          key={product._id || index}
                          value={product._id || index}
                        >
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Rating
                  </label>
                  <StarRating
                    rating={reviewData.rating}
                    onRatingChange={(rating) =>
                      setReviewData({ ...reviewData, rating })
                    }
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {reviewData.rating === 0
                      ? "Click on stars to rate"
                      : `${reviewData.rating} star${reviewData.rating > 1 ? "s" : ""}`}
                  </p>
                </div>

                {/* Review Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {reviewData.comment.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={
                    submittingReview ||
                    !reviewData.rating ||
                    !reviewData.comment.trim()
                  }
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-lg hover:from-green-700 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submittingReview ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2 w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
