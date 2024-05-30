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
    console.error("Error in request interceptor:", error);

    // Throwing a new Response to be caught by ErrorBoundary
    throw new Response("Error in request interceptor: " + error.message, {
      status: 0,
    });
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Response(
            "Unauthorized: Access is denied due to invalid credentials.",
            { status: 401 }
          );
        case 404:
          throw new Response(
            "Not Found: The requested resource could not be found.",
            { status: 404 }
          );
        case 500:
          throw new Response(
            "Server Error: Something went wrong on the server.",
            { status: 500 }
          );
        default:
          throw new Response(error.message, { status: error.response.status });
      }
    } else {
      console.log("couldn't fetch");
      throw new Response("Network Error: technical issues from us inside ", {
        status: 504,
      });
    }
  }
);

export default axiosInstance;
