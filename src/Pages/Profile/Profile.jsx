import React, { useState } from 'react';
import MyProfile from './MyProfile';
import MyOrders from './MyOrders';
import MyReviews from './MyReviews';
import useAuth from '../../Hook/UseAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { GiTalk } from 'react-icons/gi';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { SignOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    SignOut();
    navigate("/")
    toast.success("Logout Successfully")
  }

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <CgProfile /> },
    { id: 'orders', label: 'My Orders', icon: <MdOutlineProductionQuantityLimits /> },
    { id: 'reviews', label: 'My Reviews', icon:<GiTalk />}
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <MyProfile />;
      case 'orders':
        return <MyOrders />;
      case 'reviews':
        return <MyReviews />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-green-600 to-orange-600 text-white rounded-lg shadow-lg hover:from-green-700 hover:to-orange-700 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Side Drawer */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${activeSection === item.id
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-gray-200">
            <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
