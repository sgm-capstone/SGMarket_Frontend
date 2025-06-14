import { useEffect, useRef } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useSSEPolyfill } from "../hooks/useSSE";
import ToastStack from "../components/ToastStack";

function Layout() {
  const location = useLocation();
  const showNav =
    location.pathname === "/home" ||
    location.pathname === "/chat" ||
    location.pathname === "/mypage" ||
    location.pathname === "/random" ||
    matchPath("/mypage/:random", location.pathname) ||
    matchPath("/profile/:memberId", location.pathname);

  const renderBottmNav = () => {
    if (showNav) {
      return <BottomNav />;
    } else {
      return null;
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-screen mx-auto flex flex-col">
      {/* ✔️ 토스트 스택은 레이아웃 맨 위에 */}
      <ToastStack />
      <div
        ref={scrollContainerRef}
        className="relative border border-black max-w-[760px] min-w-[320px] w-full h-screen mx-auto flex flex-col overflow-y-auto"
      >
        <div className="flex-1 flex justify-center w-full font-MapleLight">
          <Outlet />
        </div>
        {renderBottmNav()}
      </div>
    </div>
  );
}

export default Layout;
