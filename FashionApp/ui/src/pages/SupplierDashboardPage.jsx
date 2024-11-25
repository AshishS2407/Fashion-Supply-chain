import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RetailerDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    
    <section className="flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Supplier Dashboard</h1>
      <div className="flex flex-wrap gap-8 justify-center">

        {/* Create Product Container */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Create Product</h2>
          <p className="mb-6">Create new raw materials.</p>
          <button 
            onClick={() => navigate('/supplier/create-product')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Create Product
          </button>
        </div>

        {/* Read Product Container */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Read Product</h2>
          <p className="mb-6">View raw material details</p>
          <button 
            onClick={() => navigate('/supplier/product')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Product
          </button>
        </div>

        {/* Match Order Container */}
        {/* <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Match Order</h2>
          <p className="mb-6">Match orders with available products.</p>
          <button 
            onClick={() => navigate('/supplier/match-order')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Match Order
          </button>
        </div> */}

      </div>
      
    </section>

    </>
  );
};

export default RetailerDashboardPage;
