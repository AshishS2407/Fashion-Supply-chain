import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
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
    );
};

export default Navbar;
