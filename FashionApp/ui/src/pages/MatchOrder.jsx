import React, { useState } from 'react';
import axios from 'axios';

const MatchOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Assuming you have an API endpoint for matching orders with products
      const response = await axios.post('/api/retailer/match-order', {
        orderId,
        productId,
      });
      setMessage(`Order ${orderId} successfully matched with Product ${productId}`);
    } catch (err) {
      setError('Failed to match order with product. Please check the IDs and try again.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match Order</h1>
      <p className="mb-4">Enter the Order ID and Product ID to match them.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={handleOrderIdChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Match Order
        </button>
      </form>

      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default MatchOrderPage;
