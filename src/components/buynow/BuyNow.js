"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const BuyNow = ({ data }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get product ID from query
  const [backgroundPos, setBackgroundPos] = useState("center");
  const [showZoom, setShowZoom] = useState(false); // ✅ Add state

  const handleMouseMove = (e) => {
   const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  // Find the product
  const selectedItem = data.find((item) => item._id === id);

  if (!selectedItem) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  // Convert buffer to base64
  const base64Image = btoa(
    String.fromCharCode(...new Uint8Array(selectedItem.image.data.data))
  );
  const imageSrc = `data:${selectedItem.image.contentType};base64,${base64Image}`;

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Buy Now</h1>

      {/* Wrapper with card + image */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl items-center gap-8">
        
        {/* Product Image */}
        <div
          className="w-64 h-64 border rounded-lg overflow-hidden cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowZoom(true)}  // ✅ Show on hover
          onMouseLeave={() => setShowZoom(false)} // ✅ Hide on leave
        >
          <img
            src={imageSrc}
            alt={selectedItem.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Zoom Preview (only visible when hovering) */}
        {/* {showZoom && (
          <div
            className="w-64 h-64 border rounded-lg hidden md:block"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "200%", // zoom level
              backgroundPosition: backgroundPos,
            }}
          />
        )} */}

{showZoom && (
        <div
          className="w-64 h-64 border bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: backgroundPos,
            backgroundSize: "200%", // zoom scale
          }}
        />
      )}


        {/* Product Info */}
        <div className="flex flex-col items-start space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedItem.name}
          </h2>
          <h2 className="text-xl text-gray-700">₹{selectedItem.price}</h2>
          <h2 className="text-md text-gray-500">Brand: {selectedItem.brand}</h2>

          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
