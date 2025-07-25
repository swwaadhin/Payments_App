

import React from 'react';

export const Appbar = () => {
    return (
        <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
            <div className="text-xl font-bold text-gray-800">
                PayMents App
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-md text-gray-700">
                    Hello, <span className="font-semibold">User!</span>
                </div>
                {/* User avatar, potentially clickable for a dropdown */}
                <div className="group relative">
                    <button className="rounded-full h-10 w-10 bg-purple-500 flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:bg-purple-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                        U
                    </button>
                    {/* Example of a dropdown menu (hidden by default) */}
                    {/*
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
};