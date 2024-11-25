import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    type: '',
    quantity: '',
    price: '',
    supplierName: '',
    orderId: '',
  });

  // State for displaying messages
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/createOrder', formData);
      if (response.data.success) {
        setResponseMessage(response.data.message);
        setIsError(false);
        setFormData({
          type: '',
          quantity: '',
          price: '',
          supplierName: '',
          orderId: '',
        });
      } else {
        setResponseMessage('Failed to create order.');
        setIsError(true);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setResponseMessage('Error creating order. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      <p className="mb-6">This form allows suppliers to create a new order with order details.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
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
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
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
            name="supplierName"
            id="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="orderId">
            Order ID
          </label>
          <input
            type="text"
            name="orderId"
            id="orderId"
            value={formData.orderId}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Order
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default OrderForm;
