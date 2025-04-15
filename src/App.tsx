import { Route, Routes } from "react-router";
import Layout from "./layouts/layouts";
import LoginPage from "./pages/login/LoginPage";
import OpenApp from "./pages/loading/OpenApp";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="loading" element={<OpenApp />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}
