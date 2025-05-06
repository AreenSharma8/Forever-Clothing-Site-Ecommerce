import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Function to load order data
  const loadOrderData = async () => {
    try {
      // Don't fetch if no token
      if (!token) return;

      // Send token in headers for authentication
      const response = await axios.post(
        backendUrl + '/api/order/userorders', 
        {}, // No need to send userId in the body
        {
          headers: { token } // Sending the token in headers for authentication
        }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        // Flattening the order data and adding items to a single array
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        // Set the orders in reverse order (newest first)
        setOrderData(allOrdersItem.reverse());
      } else {
        console.error('Error loading orders:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error.message);
    }
  };

  useEffect(() => {
    loadOrderData(); // Load order data whenever token changes
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'My'} text2={'Orders'} />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found.</p>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={item.image?.[0] || assets.placeholder}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size || 'M'}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Payment: {item.payment} ({item.paymentMethod})
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status || 'Processing'}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-[5px]">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
