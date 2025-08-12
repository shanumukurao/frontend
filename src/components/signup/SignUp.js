'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';


const SignUp = () => {
  const router=useRouter();  
  const [formData,setFormData]=useState({
      email:'',
      password:''
    });
    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:5050/api/auth/register',
      formData
    );
    console.log("Data posted successfully:", response.data);

    // Clear the form after successful submit
    setFormData({
      email: "",
      username: "",
      password: ""
    });
    router.push('/login');
  } catch (err) {
    console.error("Error posting data:", err);
  }
};


    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-80 text-black" onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
         />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp