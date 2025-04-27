import { Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/LoginPage";
import OpenApp from "./pages/loading/OpenApp";
import Home from "./pages/Home";
import ProductForm from "./components/productForm/ProductForm";
import AuctionDetail from "./components/AuctionDetail";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="loading" element={<OpenApp />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="create" element={<ProductForm />} />
          <Route path="auction" element={<AuctionDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
