import React, { useState } from 'react';

const CreateDressOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [dressId, setDressId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct order data, ensuring all values are correctly formatted
    const orderData = {
      orderId: String(orderId),
      dressId: String(dressId),
      quantity: parseInt(quantity, 10),
    };

    try {
      // Make API call to place the dress order
      const response = await fetch('/api/orderdress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log("Raw Response:", response);

      // Check if response is JSON-formatted and parse it
      const result = await response.json();
      console.log("Parsed Result:", result);

      // Display success or error message based on the response
      if (response.ok && result.success) {
        setMessage(`Order ${orderId} for dress ${dressId} placed successfully.`);
        setError(''); // Clear any previous errors
      } else {
        setError(result.message || 'Failed to place the order. Please check your input.');
        setMessage(''); // Clear success message on error
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place the order. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Dress Order</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order ID Input */}
        <div>
          <label htmlFor="orderId" className="block text-gray-700">Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Dress ID Input */}
        <div>
          <label htmlFor="dressId" className="block text-gray-700">Dress ID:</label>
          <input
            type="text"
            id="dressId"
            value={dressId}
            onChange={(e) => setDressId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Quantity Input */}
        <div>
          <label htmlFor="quantity" className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
            className="w-full px-3 py-2 border rounded"
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>

      {/* Feedback Messages */}
      {message && <p className="mt-4 text-lg text-green-600 text-center">{message}</p>}
      {error && <p className="mt-4 text-lg text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default CreateDressOrderPage;
