import { FaChevronRight } from "react-icons/fa";
import { AuctionDetail } from "../../api/auction";
import { useNavigate } from "react-router-dom";

interface Props {
  auction: AuctionDetail;
  currentTab: string;
  onTabChange: (tab: "시세" | "상세정보") => void;
  maxBidPrice: number | null;
}

export default function AuctionBasicInfo({
  auction,
  currentTab,
  onTabChange,
  maxBidPrice,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-4 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-extrabold">{auction.auctionTitle}</h2>
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors duration-200 px-2 py-1 rounded-full"
          onClick={() => navigate(`/profile/${auction.auctionMember.memberId}`)}
        >
          <div className="bg-white text-black px-2 py-1 rounded-full text-xs">
            {auction.auctionMember.memberName}님
          </div>
          <FaChevronRight className="text-white text-sm" />
        </div>
      </div>

      <p className="text-xl font-extrabold mt-1">
        {auction.auctionStartPrice.toLocaleString()}원
      </p>

      {/* 탭 정보 */}
      <div className="grid grid-cols-3 text-xs text-center mt-4 border-t border-b border-gray-700 divide-x divide-gray-700">
        <div className="py-2">
          <div className="text-gray-400">시작가</div>
          <div className="font-medium">
            {auction.auctionStartPrice === 0
              ? "-"
              : `${auction.auctionStartPrice.toLocaleString()}원`}
          </div>
        </div>
        <div className="py-2">
          <div className="text-gray-400">최대가</div>
          <div className="font-medium">
            {!maxBidPrice || maxBidPrice === 0
              ? "-"
              : `${maxBidPrice.toLocaleString()}원`}
          </div>
        </div>
        <div className="py-2">
          <div className="text-gray-400">카테고리</div>
          <div className="font-medium">{auction.auctionCategory}</div>
        </div>
      </div>

      {/* 시세/상세 탭 */}
      <div className="flex mt-4 border-b border-gray-700 text-[13px] font-bold">
        {(["시세", "상세정보"] as const).map((label) => (
          <button
            key={label}
            onClick={() => onTabChange(label)}
            className={`py-2 px-4 w-1/2 border-b-2 transition-all duration-200 ${
              currentTab === label
                ? "border-white text-white"
                : "border-transparent text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
