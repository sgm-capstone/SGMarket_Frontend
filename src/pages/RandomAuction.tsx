import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getRandomAuction } from "../api/auction";
import type { RandomAuction as AuctionData } from "../api/auction";
import { categoryLabelMapping } from "../constants/categoryMap";

export default function RandomAuction() {
  const navigate = useNavigate();
  const [auction, setAuction] = useState<AuctionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomAuction = async () => {
      try {
        const data = await getRandomAuction();
        setAuction(data);
      } catch (error) {
        console.error("랜덤 경매 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomAuction();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        랜덤 경매 정보를 불러오는 중...
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="text-white text-center py-20">
        표시할 경매가 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-black text-white w-full max-w-[760px] mx-auto min-h-screen pb-20">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-center relative h-[50px] border-b border-gray-700">
        <button
          className="absolute left-4 text-xl text-white"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">경매</h1>
      </div>

      {/* 이미지 */}
      <img
        src={auction.auctionImageUrl}
        alt={auction.auctionTitle}
        className="w-full h-[600px] object-contain bg-black"
      />

      {/* 정보 */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{auction.auctionTitle}</h2>
          <div className="flex items-center gap-2">
            <img
              src={auction.auctionMember.memberProfileImageUrl}
              alt="profile"
              className="w-6 h-6 rounded-full"
            />
            <div className="bg-white text-black px-2 py-1 rounded-full text-xs">
              {auction.auctionMember.memberName}
            </div>
          </div>
        </div>

        <span className="text-sm text-gray-400 inline-block bg-gray-800 px-2 py-1 rounded mt-4">
          {categoryLabelMapping[auction.auctionCategory] ||
            auction.auctionCategory}
        </span>
      </div>
    </div>
  );
}
