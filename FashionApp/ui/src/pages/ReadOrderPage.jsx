import React, { useState } from "react";
import axios from "axios";

const GetOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOrderData(null);

    try {
      // Make a POST request to fetch the order data
      const response = await axios.post("http://localhost:5000/getOrder", {
        orderId: orderId,  // Send orderId as part of the request body
      });

      if (response.data.success) {
        setOrderData(response.data.data);  // Store the order data in state
      } else {
        setError("Order not found or no data returned.");
      }
    } catch (err) {
      setError("Failed to fetch order details. Ensure the order ID is correct.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Retrieve Order Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Get Order
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {orderData && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <p><strong>Order ID:</strong> {orderData.orderId}</p>
          <p><strong>Status:</strong> {orderData.status}</p>
          {/* <p><strong>Item List:</strong> {orderData.itemList}</p> */}
          <p><strong>Quantity:</strong> {orderData.quantity}</p>
          {/* <p><strong>Order Date:</strong> {orderData.orderDate}</p>
          <p><strong>Delivery Date:</strong> {orderData.deliveryDate}</p>
          <p><strong>Customer Name:</strong> {orderData.customerName}</p>
          <p><strong>Address:</strong> {orderData.address}</p> */}
        </div>
      )}
    </div>
  );
};

export default GetOrderPage;
