import React, { useState } from 'react';

const ReadDressPage = () => {
  const [dressId, setDressId] = useState('');
  const [dressData, setDressData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setDressId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDressData(null);
    setProductData(null);

    try {
      // Fetch dress details
      const dressResponse = await fetch('/api/readdress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dressId }),
      });
      
      const dressDataResponse = await dressResponse.json();
      
      if (dressResponse.ok && dressDataResponse.success) {
        const dressDetails = dressDataResponse.data;
        setDressData(dressDetails);

        // Fetch product details associated with the dress
        const productResponse = await fetch('/api/readproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: dressDetails.productId }),
        });
        
        const productDataResponse = await productResponse.json();
        
        if (productResponse.ok && productDataResponse.success) {
          setProductData(productDataResponse.data);
        } else {
          setError('Failed to fetch product details.');
        }
      } else {
        setError(dressDataResponse.message || 'Dress not found or no data returned.');
      }
    } catch (error) {
      setError('Failed to fetch dress details. Ensure the dress ID is correct.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Read Dress Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Dress ID:</label>
          <input
            type="text"
            value={dressId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Read Dress Details
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {dressData && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Dress Details</h2>
          <p><strong>Type:</strong> {dressData.type}</p>
          <p><strong>Raw Material ID:</strong> {dressData.productId}</p>
          <p><strong>Quality:</strong> {dressData.quality}</p>
          <p><strong>Status:</strong> {dressData.status}</p>
          <p><strong>Owned By:</strong> {dressData.ownedBy}</p>
          <p><strong>Asset Type:</strong> {dressData.assetType}</p>
        </div>
      )}

      {productData && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Raw Material Details</h2>
          <p><strong>Type:</strong> {productData.type}</p>
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

export default ReadDressPage;
