import React from 'react'

export default function Products() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">No Product Available</h2>
                <p className="text-gray-600 mt-2">currently unavailable in the moment.</p>
                <button className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Refresh
                </button>
            </div>
        </div>
    )
}