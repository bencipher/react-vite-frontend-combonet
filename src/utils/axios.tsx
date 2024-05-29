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
    console.log("Remember to log this properly for ETL, axios error occured");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { setError } = useError();

    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError({
            code: 401,
            message:
              "Unauthorized: Access is denied due to invalid credentials.",
          });
          break;
        case 404:
          setError({
            code: 404,
            message: "Not Found: The requested resource could not be found.",
          });
          break;
        case 500:
          setError({
            code: 500,
            message: "Server Error: Something went wrong on the server.",
          });
          break;
        default:
          setError({ code: error.response.status, message: error.message });
      }
    } else {
      setError({
        code: 0,
        message: "Network Error: Please check your connection.",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
