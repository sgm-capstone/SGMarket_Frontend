import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { AuctionItem } from "../../api/auction";
import { getMyBids } from "../../api/member";
import AuctionList from "../../components/myPage/AuctionList";

export default function MyBidListPage() {
  const [items, setItems] = useState<AuctionItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await getMyBids();
        setItems(res.content);
      } catch (e) {
        console.error("입찰 목록 조회 실패", e);
      }
    };
    fetchBids();
  }, []);

  return (
    <div className="bg-[#101010] text-white pb-20 w-full max-w-[760px] mx-auto">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          className="absolute left-4 text-lg"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">구매 목록</h1>
      </div>

      <p className="px-4 text-sm text-gray-400 mt-4">전체 {items.length}개</p>
      <AuctionList items={items} />
    </div>
  );
}
