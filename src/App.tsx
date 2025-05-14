import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axiosInstance from "./api/axios";
import { useAuthStore } from "./stores/authStore";

import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/LoginPage";
import OpenApp from "./pages/loading/OpenApp";
import Home from "./pages/Home";
import ProductForm from "./components/productForm/ProductForm";
import AuctionDetail from "./components/AuctionDetail";
import RegisterUser from "./pages/singup/RegisterUser";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.post<{ accessToken: string }>(
          "/auth/access-token"
        );
        setAccessToken(data.accessToken);
        login();
      } catch {
        logout();
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  if (checkingAuth) {
    return <OpenApp />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="create" element={<ProductForm />} />
          <Route path="auction" element={<AuctionDetail />} />
          <Route path="register" element={<RegisterUser />} />
        </Route>
      </Route>
    </Routes>
  );
}
