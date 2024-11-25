import React, { useState } from 'react';

const CreateDressPage = () => {
  const [dressId, setDressId] = useState('');
  const [type, setType] = useState('');
  const [productId, setProductId] = useState(''); // Update this field to match your backend's expected `productId`
  const [quality, setQuality] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle the form submission
  const handleCreateDress = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend API endpoint '/api/createdress'
      const response = await fetch('/api/createdress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dressId,          // Dress ID
          type,             // Type of the dress
          productId,        // Raw material or product ID
          quality,          // Quality of the dress
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Display success message
        // Reset form fields after successful submission
        setDressId('');
        setType('');
        setProductId('');
        setQuality('');
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.message}`); // Display error message
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`); // Handle network or API errors
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Dress</h2>
      <form onSubmit={handleCreateDress}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="dressId">Dress ID</label>
          <input
            type="text"
            id="dressId"
            value={dressId}
            onChange={(e) => setDressId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="type">Dress Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="productId">Raw Material ID</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="quality">Quality</label>
          <input
            type="text"
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Dress
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default CreateDressPage;
