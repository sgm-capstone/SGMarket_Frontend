// src/pages/ProfilePage.tsx
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProfilePage() {
  const navigate = useNavigate();

  // 임시 mock 데이터
  const products = [
    {
      id: 1,
      title: "맥북프로",
      price: 500000,
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
    },
    {
      id: 2,
      title: "맥북프로",
      price: 500000,
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
    },
    {
      id: 3,
      title: "맥북프로",
      price: 500000,
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
    },
  ];

  return (
    <div className="bg-[#101010] text-white min-h-screen pb-20 w-full max-w-[760px] mx-auto">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          className="absolute left-4 text-lg"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">프로필</h1>
      </div>

      {/* 유저 정보 */}
      <div className="flex items-center px-4 py-5 border-b border-gray-800">
        <img
          src="https://cdn.icon-icons.com/icons2/2428/PNG/512/adidas_black_logo_icon_147146.png"
          alt="profile"
          className="w-12 h-12 rounded-full bg-white"
        />
        <div className="ml-4">
          <p className="font-bold text-lg">데일리 백수 님</p>
          <div className="flex gap-2 mt-2">
            {["노트북", "디지털 기기", "범계"].map((tag, i) => (
              <span
                key={i}
                className={`text-sm px-2 py-1 rounded ${
                  tag === "범계" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 판매 물품 */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[14px] font-bold">
            좋은사람 님의 <span className="text-white">판매 물품 보기</span>
          </p>
          <FaChevronRight className="text-white text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-[#181818] rounded-lg overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-32 object-contain bg-white"
              />
              <div className="p-2">
                <p className="text-[13px] font-bold">{item.title}</p>
                <p className="text-xs text-white">
                  {item.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 구매 물품 */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[14px] font-bold">
            좋은사람 님의 <span className="text-white">구매물품 보기</span>
          </p>
          <FaChevronRight className="text-white text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-[#181818] rounded-lg overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-32 object-contain bg-white"
              />
              <div className="p-2">
                <p className="text-[13px] font-bold">{item.title}</p>
                <p className="text-xs text-white">
                  {item.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
