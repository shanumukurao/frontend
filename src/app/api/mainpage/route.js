import axios from "axios";

export async function fetchProducts() {
  try {
    const response = await axios.get(
      "http://localhost:5050/api/product/getProducts",
      // "https://backend-cq6j.onrender.com/api/product/getProducts"
    );
    console.log("Data fetched:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

export async function fetchCount() {
  try {
    const response = await axios.get("http://localhost:5050/api/count/getCounting");
    console.log("Count fetched:", response.data);

    return response.data.data || []; // return full array
  } catch (error) {
    console.error("Error fetching count:", error.message);
    return [];
  }
}

export async function fetchCountries(){
  try{
    const response=await axios.get('http://localhost:5050/api/countries');
    console.log("Countries fetched:", response.data);
    return response.data.data || [];
  }catch(error){
    console.error("Error fetching countries:", error.message);
    return [];
  }
}