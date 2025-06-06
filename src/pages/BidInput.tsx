import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { postBid, getMaxBid } from "../api/bid";
import { getAuctionDetail, type AuctionDetail } from "../api/auction";
import { useMemberStore } from "../stores/memberStore";

export default function BidInput() {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [priceInput, setPriceInput] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [maxBid, setMaxBid] = useState<number | null>(null);
  const member = useMemberStore((state) => state.member);

  useEffect(() => {
    if (!auctionId) return;

    const fetchData = async () => {
      try {
        const id = Number(auctionId);
        const auctionData = await getAuctionDetail(id);
        const max = await getMaxBid(id);

        setAuction(auctionData);
        setMaxBid(max?.bidPrice ?? null);
      } catch (err) {
        console.error("경매 정보 조회 실패", err);
        alert("경매 정보를 불러오는 데 실패했습니다.");
        navigate(-1);
      }
    };

    fetchData();
  }, [auctionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const numeric = Number(raw);
    setPrice(numeric);
    setPriceInput(numeric === 0 ? "" : `${numeric.toLocaleString()}코인`);
  };

  const handleSubmit = async () => {
    if (!price) return alert("가격을 입력해주세요.");
    if (!auctionId) return alert("경매 ID가 유효하지 않습니다.");
    if (price === 0) return alert("0코인은 입력할 수 없습니다.");

    if (maxBid !== null && price <= maxBid) {
      return alert(
        `현재 최고 입찰가(${maxBid.toLocaleString()}코인)보다 높은 금액만 입력할 수 있습니다.`
      );
    }

    try {
      const bidResult = await postBid(Number(auctionId), price);
      alert(`${bidResult.bidPrice.toLocaleString()}코인 제시 완료!`);
      navigate(-1);
    } catch (error: any) {
      console.error("입찰 실패", error);

      if (error.response?.status === 400) {
        const goToCharge = confirm(
          "보유 코인이 부족합니다. 충전 페이지로 이동할까요?"
        );
        if (goToCharge) {
          navigate("/charge");
        }
      } else {
        alert("입찰 중 오류가 발생했습니다.");
      }
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
          value={priceInput}
          onChange={handleChange}
        />

        {/* 현재 최고가 */}
        {maxBid !== null && (
          <div className="text-sm text-gray-400 mt-2">
            현재 최고 입찰가: {maxBid.toLocaleString()}코인
          </div>
        )}

        {/* 제시하기 설명 */}
        <p className="mt-6 text-[18px] font-bold">제시하기.</p>
        <div>
          보유 코인:{" "}
          {member && member.coin !== null
            ? `${member.coin.toLocaleString()}코인`
            : "0"}
        </div>
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
