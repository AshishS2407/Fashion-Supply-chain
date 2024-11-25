import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RetailerDashboard = () => {
  const navigate = useNavigate();

  // Navigate to Create Dress Order page
  const handleCreateDressOrder = () => {
    navigate('/create-dress-order');
  };

  // Navigate to Dress History page
  const handleGetDressHistory = () => {
    navigate('/dress-history');
  };

  return (

    <>

    <Navbar/>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Retailer Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Create Dress Order Container */}
        <div className="p-6 border rounded-lg shadow-lg bg-gray-100 text-center">
          <h2 className="text-xl font-semibold mb-4">Create Dress Order</h2>
          <p className="mb-4">
            Start a new order for dresses by specifying details such as type, quantity, and delivery date.
          </p>
          <button
            onClick={handleCreateDressOrder}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go to Create Dress Order
          </button>
        </div>

        
      </div>
    </div>

    </>
  );
};

export default RetailerDashboard;
