import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/UseAuth";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const email = data?.email;

    try {
      await resetPassword(email);
      setIsEmailSent(true);
      toast.success("Password reset email sent successfully!");
      setError("");
    } catch (err) {
      const errorMessage = err.message.includes("(")
        ? err.message.split("(")[1].split(")")[0]
        : "Failed to send reset email. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-600 to-orange-600 rounded-full flex items-center justify-center mb-6">
            <FiMail className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Your Password
          </h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {!isEmailSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Reset Email...
                  </div>
                ) : (
                  "Send Reset Email"
                )}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-600 mb-4">
                  We've sent a password reset link to your email address. Please
                  check your inbox and follow the instructions to reset your
                  password.
                </p>
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Try Another Email
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Back to Login Link (for initial state) */}
          {!isEmailSent && (
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="flex items-center justify-center text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
