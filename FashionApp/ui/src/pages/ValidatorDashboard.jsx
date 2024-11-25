import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ValidatorDashboard = () => {
  const navigate = useNavigate();

  return (
    <>

    <Navbar/>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Validator Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Validate Dress Quality Container */}
        <div className="border p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Validate Dress Quality</h2>
          <p className="text-gray-700 mb-6 text-center">
            Access the quality assessment page to validate dress quality based on standards.
          </p>
          <button
            onClick={() => navigate('/validate-dress-quality')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go to Validate Quality
          </button>
        </div>

        {/* Get Dress History Container */}
        <div className="border p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Get Dress History</h2>
          <p className="text-gray-700 mb-6 text-center">
            View the history of dresses to track changes and check previous validations.
          </p>
          <button
            onClick={() => navigate('/get-dress-history')}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Go to Dress History
          </button>
        </div>
      </div>
    </div>

    </>
  );
};

export default ValidatorDashboard;
