import axios from "axios";
import React from "react";

export default async function fetchProducts(){
    try{
        const response=await axios.get('http://localhost:5050/api/product/${id}')
        console.log("Product fetched:", response.data);
        return response.data || null;
    }catch(error){
        console.error("Error fetching product:", error.message);
        return {
    }
    }
}