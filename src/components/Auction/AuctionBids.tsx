import { useState } from "react";
import { BidHistory } from "../../api/bid";
import { useNavigate } from "react-router-dom";

interface Props {
  bidHistory: BidHistory[];
  maxBidPrice: number | null;
  isMyAuction: boolean;
  auctionId: number;
  itemName: string;
}

export default function AuctionBids({
  bidHistory,
  maxBidPrice,
  isMyAuction,
  auctionId,
  itemName,
}: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("최대 제시가");

  return (
    <div className="px-4 py-6 border-b border-gray-700 text-[13px]">
      <p className="font-bold text-[25px] leading-relaxed">
        현재,
        <br />
        <span className="text-white">{itemName}</span>
        <span className="text-gray-400">에 대한</span>
        <br />
        경매 상황이에요.
      </p>

      <div className="flex bg-gray-500 rounded-md mt-4 mb-3">
        {["최대 제시가", "입찰 내역"].map((b) => (
          <button
            key={b}
            onClick={() => setActiveTab(b)}
            className={`flex-1 rounded-lg py-2 border text-center ${
              activeTab === b
                ? "bg-white text-black font-bold"
                : "text-gray-400 border border-gray-500"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {activeTab === "최대 제시가" && (
        <p className="text-center text-[14px] font-bold mt-4 leading-relaxed">
          현재 최대 제시가는
          <br />
          <span className="text-[24px]">
            {maxBidPrice ? `${maxBidPrice.toLocaleString()}원` : "-"}
          </span>
          <br />
          입니다. 😁
        </p>
      )}

      {activeTab === "입찰 내역" && (
        <div className="mt-4">
          <div className="grid grid-cols-3 text-[12px] text-gray-400 border-b border-gray-600 pb-2">
            <div>닉네임</div>
            <div>금액</div>
            <div>제시일</div>
          </div>
          {bidHistory.length > 0 ? (
            bidHistory.map((bid, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-sm py-2 border-b border-gray-800 text-[13px] cursor-pointer hover:bg-gray-800"
                onClick={() => {
                  if (!isMyAuction) return;
                  navigate(`/completeBid/${auctionId}`, {
                    state: { bid },
                  });
                }}
              >
                <div>{bid.memberInfo.memberName}</div>
                <div>{bid.bidPrice.toLocaleString()}원</div>
                {new Date(bid.bidTime).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm mt-2">
              아직 입찰 내역이 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
