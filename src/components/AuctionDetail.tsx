// AuctionDetail.tsx
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const bidHistory = [
  { date: "25.03.19", price: "105,000,000", user: "데일리 백수" },
  { date: "25.03.19", price: "95,000,000", user: "남남남" },
  { date: "25.03.17", price: "98,000,000", user: "조아요요" },
];

export default function AuctionDetail() {
  const [tab, setTab] = useState("상세정보");
  const [bidTab, setBidTab] = useState("입찰 내역");
  const navigate = useNavigate();
  return (
    <div className="bg-[#101010] text-white w-full max-w-[760px] mx-auto min-h-screen pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-center relative h-[50px] border-b border-gray-700">
        <button className="absolute left-4 text-xl text-white">
          <FaChevronLeft onClick={() => navigate(-1)} />
        </button>
        <h1 className="text-lg font-bold">경매</h1>
      </div>

      {/* 이미지 */}
      <img
        src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000"
        className="w-full object-contain"
        alt="auction"
      />

      {/* 기본 정보 */}
      <div className="px-4 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-extrabold">맥북 프로 2021</h2>
          <div className="flex items-center gap-2">
            <div className="bg-white text-black px-2 py-1 rounded-full text-xs">
              좋은 사람
            </div>
            <FaChevronRight className="text-white text-sm" />
          </div>
        </div>
        <p className="text-xl font-extrabold mt-1">1,000,000원</p>

        <div className="grid grid-cols-3 text-xs text-center mt-4 border-t border-b border-gray-700 divide-x divide-gray-700">
          <div className="py-2">
            <div className="text-gray-400">최근 거래가</div>
            <div className="font-medium">950,000</div>
          </div>
          <div className="py-2">
            <div className="text-gray-400">최대 거래가</div>
            <div className="font-medium">1,200,000</div>
          </div>
          <div className="py-2">
            <div className="text-gray-400">출시년도</div>
            <div className="font-medium">2023</div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex mt-4 border-b border-gray-700 text-[13px] font-bold">
          {["시세", "상세정보"].map((label) => (
            <button
              key={label}
              onClick={() => setTab(label)}
              className={`py-2 px-4 w-1/2 border-b-2 transition-all duration-200 ${
                tab === label
                  ? "border-white text-white"
                  : "border-transparent text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "시세" ? (
          <div className="py-4">
            <p className="text-[15px] font-bold leading-tight mb-1">최근,</p>
            <p className="text-[18px] font-bold mb-2 leading-tight">
              맥북 프로 2021
            </p>
            <div className="bg-white h-[200px] w-full flex items-center justify-center text-black">
              <FaChartLine size={32} /> {/* dummy chart */}
            </div>
          </div>
        ) : (
          <div className="py-4 text-sm leading-relaxed">
            안녕하세요 사기꾼 아닙니다
            <br />
            ~~에 희망합니다.
            <br />
            택배거래 및 직거래 가능할 것 같아요
            <br />
            문의시 DM주세요
          </div>
        )}
      </div>

      {/* 입찰 요약 */}
      <div className="px-4 py-6 border-b border-gray-700 text-[13px]">
        <p className="font-bold text-[25px] leading-relaxed">
          현재,
          <br />
          맥북 프로 2021 <span className=" tx text-gray-400">에 대한</span>
          <br />
          경매 상황이에요.
        </p>

        <div className="flex bg-gray-500 rounded-md mt-4 mb-3">
          {["최대 제시가", "최저 제시가", "입찰 내역"].map((b) => (
            <button
              key={b}
              onClick={() => setBidTab(b)}
              className={`flex-1 rounded-lg py-2 border text-center ${
                bidTab === b
                  ? "bg-white text-black font-bold"
                  : "text-gray-400 border border-gray-500"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {bidTab === "최대 제시가" && (
          <p className="text-center text-[14px] font-bold mt-4 leading-relaxed">
            현재 최대 제시가는
            <br />
            <span className="text-[24px]">105,000,000원</span>
            <br />
            입니다. 😁
          </p>
        )}

        {bidTab === "입찰 내역" && (
          <div className="mt-4">
            <div className="grid grid-cols-3 text-[12px] text-gray-400 border-b border-gray-600 pb-2">
              <div>제시일</div>
              <div>제시가</div>
              <div>닉네임</div>
            </div>
            {bidHistory.map((bid, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-sm py-2 border-b border-gray-800 text-[13px]"
              >
                <div>{bid.date}</div>
                <div>{bid.price}</div>
                <div>{bid.user}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 다른 물품/유사 상품 */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[14px] font-bold">
            <span className="text-white">좋은사람</span> 님의 다른물품 보기
          </p>
          <FaChevronRight className="text-white text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((_, i) => (
            <div key={i} className="bg-[#181818] rounded-lg overflow-hidden">
              <img
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000"
                alt="item"
                className="w-full h-32 object-contain bg-white"
              />
              <div className="p-2">
                <p className="text-[13px] font-semibold">맥북프로</p>
                <p className="text-xs text-gray-300">500,000원</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[760px] mx-auto w-full bg-[#101010] border-t border-gray-800 flex justify-between items-center px-4 py-3 z-50">
        <button className="text-white text-2xl">
          <FaHeart />
        </button>
        <div className="flex gap-2">
          <button className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded">
            제시하기
          </button>
          <button className="px-5 py-2 bg-blue-700 text-white text-sm font-semibold rounded">
            채팅하기
          </button>
        </div>
      </div>
    </div>
  );
}
