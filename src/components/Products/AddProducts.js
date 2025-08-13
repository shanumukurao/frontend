"use client";

import axios from "axios";
import React, { useRef, useState } from "react";

const AddProducts = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("brand", formData.brand);
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      const response = await axios.post(
        // "http://localhost:5050/api/products/AddProducts",
        "https://backend-cq6j.onrender.com/api/products/AddProducts",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "response data");
      setFormData({
        name: "",
        price: "",
        brand: "",
        image: "",
      });

       if (fileInputRef.current) {
         fileInputRef.current.value = "";
       }

      // Close the popup/modal after successful submission
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.log("posting error");
    }
  };

  const fileInputRef = useRef(null);

  return (
    <div className="text-black">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-8"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add Product
        </h2>
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Product Name"
          />
        </div>
        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="text"
            name="price"
            onChange={handleChange}
            value={formData.price}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Product Price"
          />
        </div>
        {/* Brand */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Product Brand"
          />
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Image Upload
          </label>
          <input
            type="file"
            onChange={handleChange}
            name="image"
            ref={fileInputRef}
            className="w-full border border-blue-300 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
          />
        </div>
        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition font-bold text-lg"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;