import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMemberStore } from "../../stores/memberStore";
import Logo from "../../assets/images/Logo.svg";
import { useAuthStore } from "../../stores/authStore";

export default function MyPage() {
  const navigate = useNavigate();
  const member = useMemberStore((state) => state.member);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  const mainMenus = [
    {
      label: "프로필 수정",
      emoji: "✏️",
      route: `/mypage/edit/${member?.id ?? ""}`,
    },
    { label: "찜한 물품", emoji: "❤️", route: "/mypage/liked" },
    { label: "구매 목록", emoji: "✔️", route: "/mypage/bid" },
    { label: "내 경매 목록", emoji: "🧪", route: "/mypage/auctions" },
  ];

  const serviceMenus = [
    { label: "코인 충전하기", emoji: "💳", route: "/charge" },
    { label: "문의하기", emoji: "💬", route: "/inquiry" },
  ];

  return (
    <div className="bg-[#101010] text-white  pb-20 w-full max-w-[760px] mx-auto flex flex-col">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          className="absolute left-4 text-lg"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">마이페이지</h1>
      </div>

      {/* 내용 영역 */}
      <div className="flex-1">
        {/* 프로필 */}
        <div
          className="px-4 py-4 flex items-center justify-between border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
          onClick={() => navigate(`/profile/${member?.id}`)}
        >
          <div className="flex items-center gap-4">
            <img
              src={member?.profileImageUrl || "/default-profile.png"}
              alt="profile"
              className="w-20 h-20 rounded-full bg-white object-cover"
            />
            <div>
              <p className="font-bold text-lg">{member?.nickname}님</p>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                보유 <img src={Logo} alt="로고" className="w-5 h-5" />
                <span className="ml-1">{member?.coin || 0} 코인</span>
              </p>
            </div>
          </div>
          <FaChevronRight className="text-gray-500" />
        </div>

        {/* 추천 배너 */}
        <div className="px-4 py-4">
          <div className="bg-gray-800 rounded-md p-4 flex items-center gap-3">
            <img
              src="https://emojigraph.org/media/apple/pushpin_1f4cc.png"
              alt="icon"
              className="w-8 h-8"
            />
            <p className="text-sm font-semibold text-gray-300">
              스타일 리쉬한 물품들을 살펴보기.
            </p>
          </div>
        </div>

        {/* 메뉴 */}
        <div className="px-4">
          <h2 className="text-white text-md font-bold mb-2">메뉴</h2>
          <div className="bg-[#171717] rounded-md divide-y divide-gray-800">
            {mainMenus.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center px-4 py-3 text-sm text-white cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                onClick={() => navigate(item.route)}
              >
                <span>
                  {item.emoji} {item.label}
                </span>
                <FaChevronRight className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 구매 및 문의 */}
        <div className="px-4 mt-6">
          <h2 className="text-white text-md font-bold mb-2">구매 및 문의</h2>
          <div className="bg-[#171717] rounded-md divide-y divide-gray-800">
            {serviceMenus.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center px-4 py-3 text-sm text-white cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                onClick={() => navigate(item.route)}
              >
                <span>
                  {item.emoji} {item.label}
                </span>
                <FaChevronRight className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 로그아웃 */}
      <div className="px-4 mt-10">
        <div
          className="flex justify-between items-center bg-[#1b1b1b] rounded-xl border-gray-700 text-lg text-gray-400 cursor-pointer px-4 py-3 hover:bg-gray-800 transition-colors duration-200"
          onClick={handleLogout}
        >
          로그아웃 <FaChevronLeft className="rotate-180" />
        </div>
      </div>
    </div>
  );
}
