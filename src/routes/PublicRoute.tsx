import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PublicRoute = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  return isLogin ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
