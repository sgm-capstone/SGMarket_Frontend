import {
  FaHome,
  FaThumbsUp,
  FaChartLine,
  FaComments,
  FaBars,
} from "react-icons/fa";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[760px] bg-[#3E3E3E] text-white rounded-t-xl">
      <ul className="flex justify-around items-center h-[72px]">
        {[
          { icon: <FaHome size={24} />, label: "홈" },
          { icon: <FaThumbsUp size={24} />, label: "랜덤경매" },
          { icon: <FaChartLine size={24} />, label: "My경매" },
          { icon: <FaComments size={24} />, label: "채팅" },
          { icon: <FaBars size={24} />, label: "메뉴" },
        ].map((item, idx) => (
          <li
            key={idx}
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
