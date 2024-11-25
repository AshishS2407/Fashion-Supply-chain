import React, { useState } from 'react';

const GetDressHistoryPage = () => {
  const [dressId, setDressId] = useState('');
  const [dressDetails, setDressDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchDressDetails = async () => {
    try {
      setError('');
      setDressDetails(null);
      setLoading(true);

      const response = await fetch('/api/getDressDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dressId }),
      });

      if (response.ok) {
        const data = await response.json();
        setDressDetails(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred while fetching dress details');
    } finally {
      setLoading(false);
    }
  };

  const safeRender = (value) => {
    return value && typeof value === 'object' ? JSON.stringify(value) : value;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Get Dress History</h1>
      <p>Enter the dress ID to view its complete history, including raw materials and orders.</p>

      <form onSubmit={(e) => { e.preventDefault(); handleFetchDressDetails(); }} className="space-y-4 mt-4">
        <div>
          <label className="block text-gray-700">Dress ID:</label>
          <input
            type="text"
            value={dressId}
            onChange={(e) => setDressId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter dress ID"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Dress Details'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && !error && dressDetails && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Dress Details</h2>
          <div className="mb-4">
            <strong>ID:</strong> {safeRender(dressDetails.dress.dressId)}
          </div>
          <div className="mb-4">
            <strong>Status:</strong> {safeRender(dressDetails.dress.status)}
          </div>
          <div className="mb-4">
            <strong>Quality:</strong> {safeRender(dressDetails.dress.quality)}
          </div>
          <div className="mb-4">
            <strong>Raw Material ID:</strong> {safeRender(dressDetails.dress.productId)}
          </div>
          <div className="mb-4">
            <strong>Owned By:</strong> {safeRender(dressDetails.dress.ownedBy)}
          </div>
          <div className="mb-4">
            <strong>Dress Type:</strong> {safeRender(dressDetails.dress.type)}
          </div>

          {/* <h3 className="text-lg font-semibold mt-4 mb-2">Dress History</h3>
          <ul className="list-disc list-inside">
            {dressDetails.dressHistory && dressDetails.dressHistory.map((entry, index) => (
              <li key={index}>{safeRender(entry)}</li>
            ))}
          </ul> */}

          <h3 className="text-lg font-semibold mt-4 mb-2">Raw Material Details</h3>
          {dressDetails.rawMaterials && dressDetails.rawMaterials.map((material, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold">Raw Material {index + 1}</h4>
              <div><strong>Type:</strong> {safeRender(material.materialDetails.type)}</div>
              <div><strong>Quantity:</strong> {safeRender(material.materialDetails.quantity)}</div>
              <div><strong>Origin:</strong> {safeRender(material.materialDetails.origin)}</div>
              <div><strong>Status:</strong> {safeRender(material.materialDetails.status)}</div>
              <div><strong>Owned By :</strong> {safeRender(material.materialDetails.ownedBy)}</div>
              <div><strong>Asset Type:</strong> {safeRender(material.materialDetails.assetType)}</div>
              <div><strong>Date of Supply:</strong> {safeRender(material.materialDetails.supplyDate)}</div>
            </div>
          ))}

          <h3 className="text-lg font-semibold mt-4 mb-2">Order Details</h3>
{dressDetails.orders && dressDetails.orders.map((order, index) => (
  <div key={index} className="mb-4">
    <h4 className="font-semibold">Order {index + 1}</h4>
    <div><strong>Order ID:</strong> {safeRender(order.Key)}</div>
    <div><strong>Status:</strong> {safeRender(order.Record.status)}</div>
    <div><strong>Quantity:</strong> {safeRender(order.Record.quantity)}</div>
    {/* <div><strong>Retailer Name:</strong> {safeRender(order.Record.retailerName)}</div> */}
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default GetDressHistoryPage;
