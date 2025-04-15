import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./css/index.css";

import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새로운 버전이 있습니다. 새로고침할까요?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("PWA가 오프라인에서도 사용할 준비가 되었습니다!");
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
