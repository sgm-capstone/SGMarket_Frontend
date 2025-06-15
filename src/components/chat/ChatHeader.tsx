import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChartBar, FaHandshake } from "react-icons/fa";
import { getChatRoomMeta, ChatRoomMeta } from "../../api/chat";

export default function ChatHeader() {
  const { roomId } = useParams();
  const [meta, setMeta] = useState<ChatRoomMeta | null>(null);

  useEffect(() => {
    const fetchMeta = async () => {
      if (!roomId) return;
      try {
        const data = await getChatRoomMeta(roomId);
        setMeta(data);
      } catch (error) {
        console.error("채팅방 메타데이터 조회 실패", error);
      }
    };

    fetchMeta();
  }, [roomId]);

  if (!meta) return null;

  return (
    <div className="w-full bg-[#101010] border-b border-gray-800 text-white">
      {/* 상단 사용자 정보 */}
      <div className="flex items-center justify-between px-4 py-3">
        <FaChevronLeft className="text-white text-lg" />
        <span className="text-center text-sm text-gray-400 font-bold">
          {meta.otherUserNickname}
        </span>
        <div className="w-5" />
      </div>

      {/* 상품 정보 + 버튼 */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={meta.otherUserProfileImage}
            alt="상대방 프로필"
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="text-sm font-bold">{meta.itemTitle}</p>
            <p className="text-xs text-gray-400">
              {meta.itemPrice.toLocaleString()}원{" "}
              <span className="text-gray-500">(경매 가능)</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-800 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
            <FaChartBar className="text-xs" />
            경매 진행 살펴보기
          </button>
          <button className="bg-gray-800 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
            <FaHandshake className="text-xs" />
            거래하기
          </button>
        </div>
      </div>
    </div>
  );
}
