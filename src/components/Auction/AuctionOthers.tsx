import { AuctionItem } from "../../api/auction";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  others: AuctionItem[];
  authorName: string;
}

export default function AuctionOthers({ others, authorName }: Props) {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-3">
        <p className="text-[14px] font-bold">
          <span className="text-white">{authorName}</span> 님의 다른물품 보기
        </p>
        <FaChevronRight className="text-white text-sm" />
      </div>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {others.length > 0 ? (
          others.map((item) => (
            <div
              key={item.auctionId}
              onClick={() => navigate(`/auction/${item.auctionId}`)}
              className="min-w-[48%] max-w-[48%] bg-[#181818] rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
            >
              <img
                src={item.auctionImageUrl}
                alt="item"
                className="w-full h-32 object-contain bg-white"
              />
              <div className="p-2">
                <p className="text-[13px] font-semibold truncate">
                  {item.auctionTitle}
                </p>
                <p className="text-xs text-gray-300">
                  {item.auctionStartPrice.toLocaleString()}원
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">다른 경매 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
