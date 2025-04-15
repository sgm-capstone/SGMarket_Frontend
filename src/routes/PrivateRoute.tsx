import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ()=>{
    const isLogin = false;
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;