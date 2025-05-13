import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
  withCredentials: true,
});

// ✅ 모든 요청에 recentToken 자동 포함
axiosInstance.interceptors.request.use((config) => {
  const { recentToken } = useAuthStore.getState();
  if (recentToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${recentToken}`;
  }
  return config;
});

export default axiosInstance;
