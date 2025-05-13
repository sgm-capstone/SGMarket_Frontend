import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
  const setRecentToken = useAuthStore((s) => s.setRecentToken);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // 1) 리프레시 토큰 쿠키로 액세스 토큰 재발급
        const { data } = await axiosInstance.post<{ accessToken: string }>(
          "/auth/access-token"
        );
        // 2) 스토어에 저장 + 로그인 상태 업데이트
        setRecentToken(data.accessToken);
        login();
      } catch {
        logout();
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, [setRecentToken, login, logout]);

  if (checkingAuth) {
    // 인증 확인 중엔 로딩 화면
    return <OpenApp />;
  }

  const isLogin = useAuthStore.getState().isLogin;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 루트로 접근 시 로그인 여부로 분기 */}
        <Route
          index
          element={<Navigate to={isLogin ? "/home" : "/login"} replace />}
        />

        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          {/* /loading 경로가 필요하다면 추가 */}
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
