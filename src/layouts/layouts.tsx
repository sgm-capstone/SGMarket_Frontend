import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  // "/game"로 변경해주어야 올바르게 비교됨
  const showNav =
    location.pathname === "/login" ||
    location.pathname === "/main" ||
    location.pathname === "/game";

  const renderBottmNav = () => {
    if (showNav) {
      return <div>하단 네비게이션</div>;
    } else {
      return null;
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="relative border border-black max-w-[760px] min-w-[320px] w-full h-screen mx-auto flex flex-col overflow-y-auto"
    >
      <div className="flex-1 flex justify-center w-full px-3">
        <Outlet />
      </div>
      {renderBottmNav()}
    </div>
  );
}

export default Layout;
