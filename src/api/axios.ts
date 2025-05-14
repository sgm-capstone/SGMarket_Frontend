import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.url?.includes("/auth/access-token")) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;
