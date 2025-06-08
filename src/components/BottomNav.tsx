import {
  FaHome,
  FaThumbsUp,
  FaChartLine,
  FaComments,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMemberStore } from "../stores/memberStore";

const BottomNav = () => {
  const navigate = useNavigate();
  const member = useMemberStore((state) => state.member);
  const navItems = [
    { icon: <FaHome size={24} />, label: "홈", path: "/home" },
    { icon: <FaThumbsUp size={24} />, label: "랜덤경매", path: "/random" },
    {
      icon: <FaChartLine size={24} />,
      label: "My경매",
      path: `/profile/${member?.id}`,
    },
    { icon: <FaComments size={24} />, label: "채팅", path: "/chat" },
    { icon: <FaBars size={24} />, label: "메뉴", path: "/mypage" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[760px] bg-[#3E3E3E] font-MapleBold text-white rounded-t-xl">
      <ul className="flex justify-around items-center h-[72px]">
        {navItems.map((item, idx) => (
          <li
            key={idx}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
