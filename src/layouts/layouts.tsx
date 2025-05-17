import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Layout() {
  const location = useLocation();
  const showNav =
    location.pathname === "/home" ||
    location.pathname === "/chat" ||
    location.pathname === "/myPage";

  const renderBottmNav = () => {
    if (showNav) {
      return <BottomNav />;
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
      <div className="flex-1 flex justify-center w-full ">
        <Outlet />
      </div>
      {renderBottmNav()}
    </div>
  );
}

export default Layout;
