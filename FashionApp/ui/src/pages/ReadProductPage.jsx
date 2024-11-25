import React, { useState } from 'react';
import axios from 'axios';

const ReadProductPage = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProductData(null);
    try {
      // Make a POST request to fetch the product data
      const response = await axios.post('/api/readproduct', {
        productId: productId,  // Send productId as part of the request body
      });

      if (response.data.success) {
        setProductData(response.data.data);  // Store the product data in state
      } else {
        setError('Product not found or no data returned.');
      }
    } catch (err) {
      setError('Failed to fetch product details. Ensure the product ID is correct.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Read Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Read Product
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {productData && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Product Details</h2>
          <p><strong> Raw Material Type:</strong> {productData.type}</p>
          <p><strong>Quantity:</strong> {productData.quantity}</p>
          <p><strong>Quality:</strong> {productData.quality}</p>
          <p><strong>Supply Date:</strong> {productData.supplyDate}</p>
          <p><strong>Origin:</strong> {productData.origin}</p>
          <p><strong>Status:</strong> {productData.status}</p>
          <p><strong>Owned By:</strong> {productData.ownedBy}</p>
          <p><strong>Asset Type:</strong> {productData.assetType}</p>
        </div>
      )}
    </div>
  );
};

export default ReadProductPage;
