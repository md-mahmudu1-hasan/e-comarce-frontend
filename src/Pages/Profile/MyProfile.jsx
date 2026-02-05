import React, { useState } from "react";
import useAxios from "../../Hook/useAxios";

const MyProfile = ({ data }) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [personalData] = useState({
    name: data?.name,
    email: data?.email,
  });

  const axiosInstance = useAxios();
  const [addressData, setAddressData] = useState({
    address: data?.address || "",
    phone: data?.phone || "",
  });

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setIsEditingAddress(false);
    let { address, phone } = addressData;
    await axiosInstance.patch("/userinfo", {
      email: data?.email,
      phone: phone,
      address: address,
    });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and address
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Details Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Details
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium text-gray-900">{personalData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900">
                  {personalData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Address
              </h2>
              {!isEditingAddress ? (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="font-medium">{addressData.address || addressData.phone ? "Edit" : "Add"}</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditingAddress(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddressSubmit}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {isEditingAddress ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={addressData.address}
                    name="address"
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={addressData.phone}
                    name="phone"
                    onChange={(e) =>
                      setAddressData({ ...addressData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {addressData.address || addressData.phone ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Delivery Address
                      </p>
                      <p className="font-medium text-gray-900">
                        {addressData.address || "No address provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {addressData.phone || "No phone provided"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">
                      Please add your delivery address
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
