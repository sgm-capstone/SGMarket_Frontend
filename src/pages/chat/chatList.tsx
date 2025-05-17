import { FaChevronLeft, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockChatList = [
  {
    id: 1,
    userName: "데일리 백수",
    location: "석수동",
    lastMessage: "안녕하세요 반갑습니다 어쩌구 저...",
    timeAgo: "1일전",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    id: 2,
    userName: "남남남",
    location: "석수동",
    lastMessage: "안녕하세요 반갑습니다 어쩌구 저...",
    timeAgo: "1일전",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    id: 3,
    userName: "조아요요",
    location: "석수동",
    lastMessage: "안녕하세요 반갑습니다 어쩌구 저...",
    timeAgo: "1일전",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
];

export default function ChatList() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white w-full max-w-[760px] mx-auto  pb-20">
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
        {mockChatList.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-800"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <img
              src={chat.imageUrl}
              alt="상품"
              className="w-14 h-14 rounded-full object-cover bg-white"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-bold truncate">{chat.userName}</p>
                <span className="text-xs text-gray-400">{chat.timeAgo}</span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <p className="text-sm text-gray-400 truncate">
                  {chat.lastMessage}
                </p>
                <span className="text-xs text-gray-400">{chat.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
