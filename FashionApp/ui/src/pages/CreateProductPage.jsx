import React, { useState } from 'react';

const CreateProductPage = () => {
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quality, setQuality] = useState('');
  const [supplyDate, setSupplyDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      productId,
      type,
      quantity,
      quality,
      supplyDate,
      origin,
      supplierName,
    };

    addProduct(newProduct);
  };

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('/api/createproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const result = await res.json();

      if (result.success) {
        setMessage(result.message); // Display success message
        // Reset form fields after successful submission
        setProductId('');
        setType('');
        setQuantity('');
        setQuality('');
        setSupplyDate('');
        setOrigin('');
        setSupplierName('');
      } else {
        setMessage(`Error: ${result.message}`); // Display error message
      }
    } catch (error) {
      setMessage(`Error while creating the product: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <p className="mb-6">This is the Create Product page where suppliers can add new raw materials.</p>

      <form onSubmit={submitForm}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="productId">
            Raw Material ID
          </label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="quality">
            Quality
          </label>
          <input
            type="text"
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="supplyDate">
            Supply Date
          </label>
          <input
            type="date"
            id="supplyDate"
            value={supplyDate}
            onChange={(e) => setSupplyDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="origin">
            Origin
          </label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="supplierName">
            Supplier Name
          </label>
          <input
            type="text"
            id="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default CreateProductPage;
