import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiTalk } from "react-icons/gi";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import MyProfile from "../Pages/Profile/MyProfile";
import MyOrders from "../Pages/Profile/MyOrders";
import MyReviews from "../Pages/Profile/MyReviews";
import useAuth from "../Hook/UseAuth";
import useAxios from "../Hook/useAxios";
import Loader from "../components/Loader";

const Profilelayout = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { SignOut, user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosInstance
        .get(`/userInfo/by-email/${user?.email}`)
        .then((res) => {
          setData(res?.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const handleLogout = () => {
    SignOut();
    navigate("/");
    toast.success("Logout Successfully");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <CgProfile /> },
    {
      id: "orders",
      label: "My Orders",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    { id: "reviews", label: "My Reviews", icon: <GiTalk /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <MyProfile data={data} />;
      case "orders":
        return <MyOrders data={data}/>;
      case "reviews":
        return <MyReviews />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Beautiful Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Menu button for mobile */}
            <div className="flex items-center">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-green-600 to-orange-600 text-white hover:from-green-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {isDrawerOpen ? (
                  <AiOutlineClose size={20} />
                ) : (
                  <AiOutlineMenu size={20} />
                )}
              </button>
            </div>

            {/* Center - Profile Title */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                My Account
              </h1>
            </div>

            {/* Right side - Home button */}
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-orange-600 text-white rounded-lg hover:from-green-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <AiOutlineHome size={18} />
                <span className="hidden sm:inline font-medium">Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Side Drawer - Enhanced */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Drawer Header - Enhanced */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-orange-50">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {user?.displayName || data?.name}
                  </h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu - Enhanced */}
            <nav className="flex-1 p-4">
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                        ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-green-600 to-orange-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 hover:text-green-700"
                        }
                      `}
                    >
                      <span
                        className={`text-xl ${activeSection === item.id ? "text-white" : "text-green-600"}`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer Footer - Enhanced */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile - Enhanced */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Main Content - Enhanced */}
        <div className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8 max-w-6xl mx-auto">
            {/* Content Area - Enhanced */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-orange-600 p-6 text-white">
                <h2 className="text-2xl font-bold capitalize">
                  {menuItems.find((item) => item.id === activeSection)?.label ||
                    "Profile"}
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <Loader size="large" text="Loading your profile data..." />
                ) : (
                  renderContent()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilelayout;
