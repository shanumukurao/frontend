import axios from "axios";

export default async function fetchProducts() {
  try {
    const response = await axios.get(
      // "http://localhost:5050/api/products/products"
      "https://backend-cq6j.onrender.com/api/products/products"
    );
    console.log("Data fetched:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}