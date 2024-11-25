import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ManufacturerDashboard = () => {
  const navigate = useNavigate();

  return (

    <>
  <Navbar/>
    
    <section className="flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Manufacturer Dashboard</h1>
      <div className="flex flex-wrap gap-8 justify-center">

        {/* Create Order Container */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Create Raw Material</h2>
          <p className="mb-6">Place a new order for raw materials.</p>
          <button
            onClick={() => navigate('/manufacturer/create-order')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Create Order
          </button>
        </div>

        {/* Read Order Container */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Read Raw Material</h2>
          <p className="mb-6">View and track your existing orders.</p>
          <button
            onClick={() => navigate('/manufacturer/read-order')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Read Order
          </button>
        </div>

        {/* Create Dress Container */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Create Dress</h2>
          <p className="mb-6">Add new dress designs to the catalog.</p>
          <button
            onClick={() => navigate('/manufacturer/create-dress')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Create Dress
          </button>
        </div>

        {/* Read Dress Container */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Read Dress</h2>
          <p className="mb-6">View and manage the existing dress designs.</p>
          <button
            onClick={() => navigate('/manufacturer/read-dress')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Read Dress
          </button>
        </div>

      </div>
    </section>

    </>
  );
};

export default ManufacturerDashboard;
