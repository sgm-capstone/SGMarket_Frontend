import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAuctions } from "../../api/member";
import { AuctionItem } from "../../api/auction";
import { FaChevronLeft } from "react-icons/fa";

export default function MyAuctionPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "ALL" | "BIDDING" | "COMPLETED" | "FAILED"
  >("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyAuctions();
        setItems(res.content);
      } catch (err) {
        console.error("내 경매 목록 조회 실패", err);
      }
    };
    fetchData();
  }, []);

  const filteredItems =
    selectedFilter === "ALL"
      ? items
      : items.filter((item) => item.status === selectedFilter);

  const filters = [
    { label: "전체", value: "ALL" },
    { label: "진행 중", value: "BIDDING" },
    { label: "완료", value: "COMPLETED" },
    { label: "유찰", value: "FAILED" },
  ];

  return (
    <div className="bg-[#101010] text-white pb-20 w-full max-w-[760px] mx-auto min-h-screen">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          className="absolute left-4 text-lg"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">내 경매 목록</h1>
      </div>

      {/* 필터 */}
      <div className="px-4 pt-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setSelectedFilter(f.value as any)}
            className={`px-4 py-1 text-sm rounded-full border ${
              selectedFilter === f.value
                ? "bg-white text-black font-bold"
                : "border-gray-500 text-gray-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <div className="px-4 py-4">
        {filteredItems.length > 0 ? (
          [...filteredItems].reverse().map((item) => (
            <div
              key={item.auctionId}
              onClick={() => navigate(`/auction/${item.auctionId}`)}
              className="relative flex items-center py-3 border-b border-gray-700 cursor-pointer"
            >
              {/* 상태 뱃지 */}
              <span
                className={`absolute right-2 top-2 text-[12px] px-2 py-0.5 rounded-full font-semibold
                ${
                  item.status === "BIDDING"
                    ? "bg-blue-600 text-white"
                    : item.status === "COMPLETED"
                    ? "bg-green-600 text-white"
                    : item.status === "FAILED"
                    ? "bg-red-500 text-white"
                    : "bg-gray-600 text-white"
                }
              `}
              >
                {item.status === "BIDDING"
                  ? "진행 중"
                  : item.status === "COMPLETED"
                  ? "완료"
                  : item.status === "FAILED"
                  ? "유찰"
                  : "기타"}
              </span>

              {/* 이미지 */}
              <img
                src={item.auctionImageUrl}
                alt={item.auctionTitle}
                className="w-24 h-24 rounded bg-white mr-4 object-contain"
              />

              {/* 텍스트 정보 */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {item.auctionTitle}
                </p>
                <p className="text-xs text-gray-400 mt-1 mb-2">
                  마감일 : {new Date(item.auctionEndDate).getFullYear()}년{" "}
                  {new Date(item.auctionEndDate).getMonth() + 1}월{" "}
                  {new Date(item.auctionEndDate).getDate()}일
                </p>
                <p className="text-xs text-gray-400">
                  현재가격:{" "}
                  <span className="text-white font-semibold text-[15px]">
                    {item.auctionCurrentPrice
                      ? `${item.auctionCurrentPrice.toLocaleString()}원`
                      : "아직 없음"}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm mt-4">
            해당 조건의 경매가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
