import React, { useState } from 'react';

const ValidateDressQualityPage = () => {
  const [dressId, setDressId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleApproveDress = async () => {
    try {
      setMessage('');
      setError('');

      const response = await fetch('/api/approve-dress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dressId }), // Pass dressId in the request body
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error || "Failed to approve dress.");
      }
    } catch (error) {
      setError('An error occurred while approving the dress');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Validate Dress Quality</h1>
      <p>Enter the dress ID to validate and approve its quality.</p>

      <div className="mt-4">
        <label className="block text-gray-700 mb-2" htmlFor="dressId">Dress ID:</label>
        <input
          type="text"
          id="dressId"
          value={dressId}
          onChange={(e) => setDressId(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Enter dress ID"
        />
      </div>

      <button
        onClick={handleApproveDress}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Approve Dress
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ValidateDressQualityPage;
