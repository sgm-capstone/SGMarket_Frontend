import { useEffect, useState } from "react";
import { FaChevronLeft, FaBell, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  DirectChatRoom,
  getMyDirectChats,
  deleteChatRoom,
} from "../../api/chat";
import { getMainRegion } from "../../utils/getMainRegion";

export default function ChatList() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<DirectChatRoom[]>([]);

  const fetchChats = async () => {
    try {
      const data = await getMyDirectChats();
      const sorted = data.sort((a, b) => {
        const timeA = a.lastMessageTime
          ? new Date(a.lastMessageTime).getTime()
          : 0;
        const timeB = b.lastMessageTime
          ? new Date(b.lastMessageTime).getTime()
          : 0;
        return timeB - timeA;
      });
      setChats(sorted);
    } catch (e) {
      console.error("채팅 목록 조회 실패", e);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleDelete = async (roomId: string) => {
    if (!confirm("정말 이 채팅방을 삭제하시겠습니까?")) return;
    try {
      await deleteChatRoom(roomId);
      setChats((prev) => prev.filter((chat) => chat.roomId !== roomId));
    } catch (err) {
      console.error("채팅방 삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="bg-black text-white w-full max-w-[760px] mx-auto pb-20">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button className="absolute left-4 text-lg">
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">내 채팅</h1>
        <button className="absolute right-4 text-lg">
          <FaBell />
        </button>
      </div>

      {/* 채팅 목록 */}
      <div className="flex flex-col">
        {chats.map((chat) => (
          <div
            key={chat.roomId}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-800 group"
          >
            <img
              src={chat.otherUserProfileImage || "/default-profile.png"}
              alt="프로필"
              className="w-14 h-14 rounded-full object-cover bg-white"
              onClick={() => navigate(`/chat/${chat.roomId}`)}
            />
            <div
              className="flex-1 min-w-0 cursor-pointer"
              onClick={() => navigate(`/chat/${chat.roomId}`)}
            >
              <div className="flex justify-between items-center">
                <p className="font-bold truncate">{chat.otherUserNickname}</p>
                <span className="text-xs text-gray-400">
                  {chat.lastMessageTime
                    ? new Date(chat.lastMessageTime).toLocaleDateString()
                    : "최근 메시지 없음"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <p className="text-sm text-gray-400 truncate">
                  {chat.lastMessage || "최근 메시지 없음"}
                </p>
                <span className="text-xs text-gray-400">
                  {chat.locationName ? getMainRegion(chat.locationName) : ""}
                </span>
              </div>
            </div>

            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDelete(chat.roomId)}
              className="text-gray-500 hover:text-red-500 transition duration-200"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
