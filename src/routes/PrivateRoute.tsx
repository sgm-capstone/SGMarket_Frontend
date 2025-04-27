import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PrivateRoute = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
