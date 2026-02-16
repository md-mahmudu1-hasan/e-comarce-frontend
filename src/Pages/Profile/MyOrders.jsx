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
import Swal from "sweetalert2";

const MyOrders = ({ data }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
    productId: "" || 0,
  });

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

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders?email=${user?.email}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      // loading alert
      Swal.fire({
        title: "Cancelling...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axiosInstance.patch(`/orders/${orderId}`, {
        status: "canceled",
      });

      fetchOrders();

      Swal.fire({
        title: "Canceled!",
        text: "Your order has been canceled.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to cancel order",
        icon: "error",
      });
    }
  };

  const handleAddReview = (order) => {
    // const productId = order.products.map(item => item.title == )
    setSelectedOrder(order);
    setReviewData({
      rating: 0,
      comment: "",
      productId: "" || 0,
    });
    setReviewModal(true);
  };

  const handleCloseModal = () => {
    setReviewModal(false);
    setSelectedOrder(null);
    setReviewData({
      rating: 0,
      comment: "",
      productId: "" || 0,
    });
  };

  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }
    try {
      setSubmittingReview(true);
      const selectedProduct =
        selectedOrder?.products?.find(
          (product) => product._id === reviewData.productId,
        ) || selectedOrder?.products?.[0];

      const reviewPayload = {
        orderId: selectedOrder._id,
        productid: selectedOrder?.products[reviewData.productId]?.productId,
        productName: selectedProduct?.title,
        userId: data?._id,
        userName: data?.name,
        rating: reviewData.rating,
        comment: reviewData.comment,
        userEmail: data?.email,
        createdAt: new Date(),
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
        <div className={`modal ${reviewModal ? "modal-open" : ""}`}>
          <div className="modal-box relative max-w-lg w-full bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-5 rounded-t-2xl -m-5 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FiStar className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Write a Review</h2>
                    <p className="text-green-100 text-xs">
                      Share your experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="btn btn-xs btn-circle btn-ghost text-white hover:bg-white/20 border-white/20"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium mb-1">
                    Order Details
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    #{selectedOrder?._id?.slice(-8)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedOrder?.products?.length || 0} items • ৳
                    {selectedOrder?.totalAmount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiPackage className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              {/* Product Selection */}
              {selectedOrder?.products?.length > 1 && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700 flex items-center text-sm">
                      <FiShoppingCart className="w-3 h-3 mr-2 text-green-600" />
                      Select Product to Review
                    </span>
                  </label>
                  <select
                    value={reviewData.productId}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        productId: e.target.value,
                      })
                    }
                    className="select select-bordered select-sm border-2 focus:border-green-500"
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700 flex items-center text-sm">
                    <FiStar className="w-3 h-3 mr-2 text-yellow-500" />
                    Your Rating
                  </span>
                </label>
                <div className="cursor-pointer bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-yellow-300 transition-colors">
                  <StarRating
                    rating={reviewData.rating}
                    onRatingChange={(rating) =>
                      setReviewData({ ...reviewData, rating })
                    }
                  />
                  <p className="text-xs text-center mt-3 text-gray-600">
                    {reviewData.rating === 0
                      ? "Click on stars to rate"
                      : `${reviewData.rating} star${reviewData.rating > 1 ? "s" : ""} - Great choice!`}
                  </p>
                </div>
              </div>

              {/* Review Comment */}
              <div className="form-control">
                <label className="label m-2">
                  <span className="label-text font-medium text-gray-700 flex items-center text-sm">
                    <FiSend className="w-3 h-3 mr-2 text-blue-600" />
                    Your Review
                  </span>
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  placeholder="Tell us about your experience with this product... What did you like? What could be better?"
                  className="textarea textarea-bordered textarea-sm h-24 resize-none border-2 border-green-500 text-gray-700"
                  maxLength={500}
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500 flex items-center justify-between text-xs">
                    <span>💡 Be specific and helpful</span>
                    <span className="font-medium">
                      {reviewData.comment.length}/500
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-action bg-gray-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
              <div className="flex space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="btn btn-outline btn-primary btn-sm flex-1"
                >
                  <FiX className="w-3 h-3 mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={
                    submittingReview ||
                    !reviewData.rating ||
                    !reviewData.comment.trim()
                  }
                  className="btn btn-primary btn-sm flex-1 bg-gradient-to-r from-green-600 to-orange-500 border-0 hover:from-green-700 hover:to-orange-600 cursor-pointer text-white"
                >
                  {submittingReview ? (
                    <>
                      <span className="loading loading-spinner loading-xs mr-1"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-3 h-3 mr-1" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
