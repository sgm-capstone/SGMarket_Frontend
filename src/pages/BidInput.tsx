import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { postBid } from "../api/bid";
import { getAuctionDetail, type AuctionDetail } from "../api/auction";

export default function BidInput() {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [price, setPrice] = useState("");

  const [auction, setAuction] = useState<AuctionDetail | null>(null);

  useEffect(() => {
    if (!auctionId) return;
    const fetchAuction = async () => {
      try {
        const data = await getAuctionDetail(Number(auctionId));
        setAuction(data);
      } catch (err) {
        console.error("경매 정보 조회 실패", err);
        alert("경매 정보를 불러오는 데 실패했습니다.");
        navigate(-1);
      }
    };
    fetchAuction();
  }, [auctionId]);

  const handleSubmit = async () => {
    if (!price) return alert("가격을 입력해주세요.");
    if (!auctionId) return alert("경매 ID가 유효하지 않습니다.");

    try {
      await postBid(Number(auctionId), Number(price));
      alert(`${Number(price).toLocaleString()}원 제시 완료!`);
      navigate(-1);
    } catch (error) {
      console.error("입찰 실패", error);
      alert("입찰 중 오류가 발생했습니다.");
    }
  };

  if (!auction) {
    return (
      <div className="text-white text-center py-20">
        경매 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="bg-black text-white w-full max-w-[760px] mx-auto px-6 pb-10">
      {/* 상단 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 text-lg"
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">경매</h1>
      </div>

      {/* 메인 내용 */}
      <div className="mt-10">
        <p className="text-[18px] font-semibold leading-tight">
          <span className="text-gray-300">
            {auction.auctionMember.memberName} 님의
          </span>
          <br />
          <span className="text-white text-[24px] font-bold">
            {auction.auctionItem.itemName}
          </span>
          <span className="text-gray-300 text-[18px] font-semibold">에</span>
          <br />
          가격을 제시해볼까요?
        </p>

        {/* 가격 입력 */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="금액을 입력해주세요"
          className="w-full mt-10 h-9 bg-black border-b border-blue-500 text-white text-3xl font-bold text-center outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
        />

        {/* 제시하기 설명 */}
        <p className="mt-6 text-[18px] font-bold">제시하기.</p>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-5 left-0 right-0 max-w-[760px] mx-auto px-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white py-4 rounded-md font-bold text-lg"
        >
          제시하기
        </button>
      </div>
    </div>
  );
}
