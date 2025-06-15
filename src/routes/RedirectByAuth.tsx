// src/routes/RedirectByAuth.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function RedirectByAuth() {
  const isLogin = useAuthStore((s) => s.isLogin);

  return <Navigate to={isLogin ? "/home" : "/login"} replace />;
}
