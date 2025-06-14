import { useNavigate } from "react-router-dom";
import { AuctionItem } from "../../api/auction";

interface Props {
  items: AuctionItem[];
}

export default function AuctionList({ items }: Props) {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4">
      {items.map((item) => (
        <div
          key={item.auctionId}
          onClick={() => navigate(`/auction/${item.auctionId}`)}
          className="flex items-center py-3 border-b border-gray-700 cursor-pointer"
        >
          <img
            src={item.auctionImageUrl}
            alt={item.auctionTitle}
            className="w-24 h-24 rounded bg-white mr-4 object-contain"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{item.auctionTitle}</p>
            <p className="text-xs text-gray-400 mt-1 mb-3 ">
              마감일 : {new Date(item.auctionEndDate).getFullYear()}년{" "}
              {new Date(item.auctionEndDate).getMonth() + 1}월{" "}
              {new Date(item.auctionEndDate).getDate()}일
            </p>
            <p className="text-xs text-gray-500 text-b mt-1 ">
              <span className="text-white font-semibold text-[15px] ">
                현재가격 : {item.auctionCurrentPrice.toLocaleString()}원
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
