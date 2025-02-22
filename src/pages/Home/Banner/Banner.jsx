import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-600 via-green-800 to-yellow-600 text-white text-center p-6 rounded-lg shadow-lg h-[60vh]">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">Manage Your Tasks Efficiently</h1>
                <p className="m-8 text-lg md:text-xl text-gray-200 drop-shadow-md">Drag, drop, and organize your workflow seamlessly.</p>
                <Link to="/AddTasks" className="mt-18 px-6 py-3 bg-white text-yellow-600 font-bold text-lg rounded-full shadow-md transition transform hover:scale-105 hover:bg-gray-100">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Banner;