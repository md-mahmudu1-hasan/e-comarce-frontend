import React from 'react';

const MyOrders = () => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 2999, image: 'https://via.placeholder.com/100x100/2d7a2d/ffffff?text=Headphones' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 5999, image: 'https://via.placeholder.com/100x100/2d7a2d/ffffff?text=Smart+Watch' }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      items: [
        { name: 'Laptop Backpack', quantity: 1, price: 1299, image: 'https://via.placeholder.com/100x100/2d7a2d/ffffff?text=Backpack' }
      ]
    }
  ];

  const handleCancelOrder = (orderId) => {
    console.log('Cancelling order:', orderId);
    // Handle order cancellation logic here
  };

  const handleAddReview = (orderId) => {
    console.log('Adding review for order:', orderId);
    // Handle review addition logic here
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => handleAddReview(order.id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Review
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>Total Amount:</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{order.items.reduce((total, item) => total + item.price, 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📦</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
