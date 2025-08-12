'use client'

import React, { useState } from 'react';
import AddProducts from '../Products/AddProducts'; // Adjust path if needed

const MainPage = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

const [searchTerm,setSearchTerm]=useState("");

const filteredData=data.filter((item)=>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
item.price.toString().includes(searchTerm)
);



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 p-4 flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold">Deals</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="Search deals..."
          className="px-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className='border-2 bg-black p-2 rounded-2xl' onClick={handleClick}>ADD PRODUCTS</button>
      </header>

      {/* Page Content */}
      <main className="p-6">
        <p className="text-gray-700">Welcome to the deals page!</p>
      </main>

      {/* Products Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`http://localhost:5050${item.image}`}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
            <p className="text-gray-600">₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.brand}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal Popup for AddProducts */}
      {showModal && (
        <div className="fixed inset-96  bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-black rounded-xl shadow-lg p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <AddProducts onClose={handleClose}  />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;