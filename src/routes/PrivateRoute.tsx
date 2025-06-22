import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PrivateRoute = () => {
  const isLogin = useAuthStore((s) => s.isLogin);
  const isAuthChecked = useAuthStore((s) => s.isAuthChecked);

  if (!isAuthChecked) return null;
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
