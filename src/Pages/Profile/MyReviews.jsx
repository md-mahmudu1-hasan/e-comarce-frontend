import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/UseAuth";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({
    rating: 0,
    comment: "",
  });
  const axiosInstance = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/reviews?email=${user?.email}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews");
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

  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      // loading alert
      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axiosInstance.delete(`/reviews/${reviewId}`);

      // UI update instantly
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));

      Swal.fire({
        title: "Deleted!",
        text: "Review deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting review:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to delete review",
        icon: "error",
      });
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setEditData({
      rating: review.rating,
      comment: review.comment,
    });
    setEditModal(true);
  };

  const handleUpdateReview = async () => {
    if (!editData.rating || !editData.comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }
    try {
      axiosInstance.patch(`/reviews/${editingReview._id}`, {
        rating: editData.rating,
        comment: editData.comment,
      });
      toast.success("Review updated successfully");
      setReviews(
        reviews.map((review) =>
          review._id === editingReview._id
            ? { ...review, rating: editData.rating, comment: editData.comment }
            : review,
        ),
      );
      setEditModal(false);
      setEditingReview(null);
      setEditData({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${i <= rating ? "text-yellow-400" : "text-gray-300"} ${interactive ? "cursor-pointer hover:text-yellow-500" : ""}`}
          onClick={interactive ? () => onRatingChange(i) : undefined}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
              <div
                key={review._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.productName}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="flex items-center text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl"><FaRegStar /></span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't written any product reviews yet.
              </p>
              <Link to="/all-clothes" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Browse Products
              </Link>
            </div>
          )}

          {/* Edit Modal */}
          {editModal && (
            <div className="modal modal-open">
              <div className="modal-box relative max-w-lg w-full bg-white shadow-2xl">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-5 rounded-t-2xl -m-5 mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FiEdit2 className="w-5 h-5 text-yellow-300" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Edit Review</h2>
                        <p className="text-green-100 text-xs">
                          Update your review
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditModal(false)}
                      className="btn btn-xs btn-circle btn-ghost text-white hover:bg-white/20 border-white/20"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                  {/* Product Info */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700">Product</p>
                    <p className="text-base text-gray-900">
                      {editingReview?.productName}
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700 text-sm">
                        Your Rating
                      </span>
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-yellow-300 transition-colors cursor-pointer">
                      {renderStars(editData.rating, true, (rating) =>
                        setEditData({ ...editData, rating }),
                      )}
                      <p className="text-xs text-center mt-3 text-gray-600">
                        {editData.rating === 0
                          ? "Click on stars to rate"
                          : `${editData.rating} star${editData.rating > 1 ? "s" : ""} selected`}
                      </p>
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700 text-sm">
                        Your Review
                      </span>
                    </label>
                    <textarea
                      value={editData.comment}
                      onChange={(e) =>
                        setEditData({ ...editData, comment: e.target.value })
                      }
                      placeholder="Update your review..."
                      className="textarea textarea-bordered textarea-sm h-24 resize-none border-2 border-green-500 text-gray-700"
                      maxLength={500}
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500 flex items-center justify-between text-xs">
                        <span>💡 Be specific and helpful</span>
                        <span className="font-medium">
                          {editData.comment.length}/500
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-action bg-gray-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditModal(false)}
                      className="btn btn-outline btn-primary btn-sm flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateReview}
                      disabled={!editData.rating || !editData.comment.trim()}
                      className="btn btn-primary btn-sm flex-1 bg-gradient-to-r from-green-600 to-orange-500 border-0 hover:from-green-700 hover:to-orange-600"
                    >
                      Update Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Review Stats */}
          {reviews.length > 0 && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Review Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {reviews.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {(
                      reviews.reduce((acc, r) => acc + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
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
