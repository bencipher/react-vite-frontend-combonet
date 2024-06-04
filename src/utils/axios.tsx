// src/utils/axios.js
import axios from "axios";
import { useError } from "../errors/ErrorContext";
console.log(import.meta.env.VITE_BACKEND_URL);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Log error for ETL
    console.error("Error in request interceptor: " + error.message, error);
    throw new Error("Error while processing the request: ");
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(JSON.stringify(error, null, 2));
    let errorMessage = "Something unexpected happened";
    if (error.message === "Network Error") {
      errorMessage = "Could not connect to the server";
    }
    throw new Error(errorMessage);
  }
);
export default axiosInstance;
