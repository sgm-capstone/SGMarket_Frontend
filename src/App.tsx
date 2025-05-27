import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axiosInstance from "./api/axios";
import { useAuthStore } from "./stores/authStore";

import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/LoginPage";
import OpenApp from "./pages/loading/OpenApp";
import Home from "./pages/Home";
import ProductForm from "./components/productForm/ProductForm";
import AuctionDetail from "./pages/Auction/AuctionDetail";
import RegisterUser from "./pages/singup/RegisterUser";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import BidInput from "./pages/BidInput";
import ChatList from "./pages/chat/chatList";
import ChatPage from "./pages/chat/chatPage";
import { getMyInfo } from "./api/member";
import { useMemberStore } from "./stores/memberStore";
import RandomAuction from "./pages/RandomAuction";
import CompleteBid from "./pages/CompleteBid";
import MyPage from "./pages/myPage/MyPage";
import ProfilePage from "./pages/userProFile/Profile";
import LikeListPage from "./pages/myPage/LikeListPage";
import MyAuctionsPage from "./pages/myPage/MyAuctionsPage";
import MyBidListPage from "./pages/myPage/MyBidListPage";

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

        const member = await getMyInfo();
        useMemberStore.getState().setMember(member);
      } catch {
        logout();
        useMemberStore.getState().clearMember();
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
          <Route path="edit/:auctionId" element={<ProductForm />} />
          <Route path="auction/:auctionId" element={<AuctionDetail />} />
          <Route path="bidinput/:auctionId" element={<BidInput />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="chat" element={<ChatList />} />
          <Route path="chat/:roomId" element={<ChatPage />} />
          <Route path="random" element={<RandomAuction />} />
          <Route path="completeBid/:auctionId" element={<CompleteBid />} />
          <Route path="myPage" element={<MyPage />} />
          <Route path="myPage/liked" element={<LikeListPage />} />
          <Route path="myPage/auctions" element={<MyAuctionsPage />} />
          <Route path="myPage/bid" element={<MyBidListPage />} />
          <Route path="profile/:memberId" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
