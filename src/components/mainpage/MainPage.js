'use client';

import React, { useEffect, useState } from 'react';
import AddProducts from '../Products/AddProducts';
import { IoCartOutline } from "react-icons/io5";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const MainPage = ({ data, count: initialCount, countries }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(initialCount || 0);

  const router = useRouter();

  const handleClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // ✅ Filter safely
  const filteredData = (data || []).filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price?.toString().includes(searchTerm)
  );
  
  const handleCount = async () => {
  try {
    let newCount;

    // ✅ update state and capture the new value
    setCount((prev) => {
      newCount = prev + 1;
      return newCount;
    });

    // ✅ now use newCount in API call
    const response = await axios.post(
      "http://localhost:5050/api/count/counting",
      { count: newCount },
      {
        headers: {
    "Content-Type": "application/json"
  },
      }
    );

    console.log("Data response:", response.data);
    count.push(response.data.data); // assuming count is an array
    setCount(count); // update state with new count array
  } catch (error) {
    console.error("Error:", error.message);
  }
};


  const handleCart = () => {
    router.push(`/addcart`);
  };

  const getImageSrc = (image) => {
    if (!image || !image.data || !image.data.data) return "";

    const uint8Array = new Uint8Array(image.data.data);
    let binary = '';
    uint8Array.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    const base64String = btoa(binary);
    return `data:${image.contentType};base64,${base64String}`;
  };

  // ✅ Fix handleBuy (send data via query params)
  const handleBuy = (item) => {
    // const imageSrc = getImageSrc(item.image);
    router.push(`/buynow?id=${item._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 p-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl text-white font-bold">Deals</h1>

        {/* Search bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search deals..."
          className="flex-1 max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Add button */}
        <button
          className="border-2 border-transparent bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800"
          onClick={handleClick}
        >
          ADD PRODUCTS
        </button>

        {/* Cart icon */}
        <div className="relative">
          <IoCartOutline
            className="text-3xl text-gray-700 cursor-pointer"
            onClick={handleCart}
          />
          {Array.isArray(count) &&
            count.map((item) => (
              <div key={item._id} className="relative">
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {item.count}
                </span>
              </div>
            ))}
        </div>
      </header>

      {/* Products Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={getImageSrc(item.image)}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-md mb-4"
            />
            <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
            <p className="text-gray-600">₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.brand}</p>

            {/* ✅ Buttons side by side */}
            <div className="mt-4 flex gap-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleCount}
              >
                Add to Cart
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => handleBuy(item)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <select className="text-black bg-white border border-gray-300 rounded-lg p-2 mb-4">
          <option value="">Select Country</option>
          {countries.map((country, id) => (
            <option key={id} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
            <AddProducts onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
