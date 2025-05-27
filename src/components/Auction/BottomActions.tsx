import { FaHeart } from "react-icons/fa";

interface Props {
  isLiked: boolean;
  onToggleLike: () => void;
  isMyAuction: boolean;
  onBid: () => void;
  onChat: () => void;
}

export default function BottomActions({
  isLiked,
  onToggleLike,
  isMyAuction,
  onBid,
  onChat,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[760px] mx-auto w-full bg-[#101010] border-t border-gray-800 flex justify-between items-center px-4 py-3 z-50">
      <button onClick={onToggleLike} className="text-white text-2xl">
        <FaHeart className={isLiked ? "text-red-500" : "text-white"} />
      </button>
      {!isMyAuction && (
        <div className="flex gap-2">
          <button
            onClick={onBid}
            className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded"
          >
            제시하기
          </button>
          <button
            onClick={onChat}
            className="px-5 py-2 bg-blue-700 text-white text-sm font-semibold rounded"
          >
            채팅하기
          </button>
        </div>
      )}
    </div>
  );
}
