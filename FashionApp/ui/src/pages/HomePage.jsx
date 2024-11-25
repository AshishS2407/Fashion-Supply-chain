import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-gradient-to-br from-gray-100 via-blue-50 to-white min-h-screen text-gray-800">
            {/* Navbar */}
            <nav className="bg-blue-600 p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold tracking-wide">Fashion Supply Chain</h1>
                    <div className="space-x-6">
                        <Link to="/" className="text-white font-medium hover:underline">Home</Link>
                        <Link to="/about" className="text-white font-medium hover:underline">About Us</Link>
                        <Link to="/contact" className="text-white font-medium hover:underline">Contact Us</Link>
                    </div>
                </div>
            </nav>

            {/* Project Name */}
            <header className="flex items-center justify-center h-72 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <h2 className="text-5xl font-extrabold">
                    Welcome to Fashion Supply Chain
                </h2>
            </header>

            {/* Organizers List */}
            <section className="container mx-auto py-12 px-6">
                <h3 className="text-4xl font-bold text-center mb-12 text-blue-800">Our Participants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Manufacturer */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-blue-500">
                        <h4 className="text-2xl font-semibold text-blue-700">Manufacturer</h4>
                        <p className="text-gray-600 mt-3">Creates quality garments with dedication to detail and sustainability.</p>
                        <Link to="/manufacturer">
                            <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                                Manufacturer Login
                            </button>
                        </Link>
                    </div>

                    {/* Retailer */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-green-500">
                        <h4 className="text-2xl font-semibold text-green-700">Retailer</h4>
                        <p className="text-gray-600 mt-3">Brings fashion to customers through various outlets and online stores.</p>
                        <Link to="/retailer">
                            <button className="mt-6 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200">
                                Retailer Login
                            </button>
                        </Link>
                    </div>

                    {/* Supplier */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-purple-500">
                        <h4 className="text-2xl font-semibold text-purple-700">Supplier</h4>
                        <p className="text-gray-600 mt-3">Provides high-quality raw materials essential for fashion creation.</p>
                        <Link to="/supplier">
                            <button className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200">
                                Supplier Login
                            </button>
                        </Link>
                    </div>

                    {/* Validator */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-red-500">
                        <h4 className="text-2xl font-semibold text-red-700">Validator</h4>
                        <p className="text-gray-600 mt-3">Ensures the quality and authenticity of each product in the chain.</p>
                        <Link to="/validator">
                            <button className="mt-6 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200">
                                Validator Login
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
