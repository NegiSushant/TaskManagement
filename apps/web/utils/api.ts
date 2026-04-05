import axios from "axios";
import { HTTP_BACKEND } from "./config";

// Create a custom Axios instance
const api = axios.create({
  baseURL: HTTP_BACKEND,
});

// Automatically attach the access token to every request
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically catch 401 errors and refresh the token!
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Expired) and we haven't already tried to retry it.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Ask backend for a new access token
        const res = await axios.post(`${HTTP_BACKEND}/auth/refresh`, {
          refreshToken,
        });

        // Save the new token
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the original failed request with the new token and retry it!
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If the REFRESH token is also expired, they must log in again.
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
