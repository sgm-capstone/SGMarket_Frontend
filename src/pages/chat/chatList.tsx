import { useEffect, useState } from "react";
import { FaChevronLeft, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DirectChatRoom, getMyDirectChats } from "../../api/chat";

export default function ChatList() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<DirectChatRoom[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyDirectChats();
        setChats(data);
      } catch (e) {
        console.error("채팅 목록 조회 실패", e);
      }
    })();
  }, []);

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
            key={chat.id}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-800"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <img
              src="/default-profile.png" // 필요시 상대 프로필 이미지
              alt="프로필"
              className="w-14 h-14 rounded-full object-cover bg-white"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-bold truncate">{chat.name}</p>
                <span className="text-xs text-gray-400">
                  {new Date(chat.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <p className="text-sm text-gray-400 truncate">
                  최근 메시지 없음
                </p>
                <span className="text-xs text-gray-400">석수1동</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
