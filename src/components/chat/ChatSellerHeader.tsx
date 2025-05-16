import { FaChevronLeft, FaChartBar, FaHandshake } from "react-icons/fa";

export default function ChatSellerHeader() {
  return (
    <div className="w-full bg-[#101010] border-b border-gray-800 text-white">
      {/* 상단 사용자 정보 */}
      <div className="flex items-center justify-between px-4 py-3">
        <FaChevronLeft className="text-white text-lg" />
        <span className="text-center text-sm text-gray-400 font-bold">
          LV.2 <span className="text-white">좋은 사람</span>
        </span>
        <div className="w-5" />
      </div>

      {/* 상품 정보 + 버튼 */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80"
            alt="product"
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="text-sm font-bold">맥북 프로 2021</p>
            <p className="text-xs text-gray-400">
              10,000,000원 <span className="text-gray-500">(경매 가능)</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-800 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
            <FaChartBar className="text-xs" />
            경매 진행 살펴보기
          </button>
          <button className="bg-gray-800 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
            <FaHandshake className="text-xs" />
            거래하기
          </button>
        </div>
      </div>
    </div>
  );
}
