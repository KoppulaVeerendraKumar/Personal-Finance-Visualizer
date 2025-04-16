import axios from "axios";

// Define the base URL for the API
const API_URL = "https://pfv-backend.onrender.com/api/transactions";

// Create an Axios instance with a base URL
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json", // Default header for content type
    // If authentication is required, you can add authorization headers here
    // "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  },
});

// Define the base API URL for dynamic endpoints
export const BASE_API = "https://pfv-backend.onrender.com";

// Optionally, add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response ? error.response.data : error);
    return Promise.reject(error);
  }
);
