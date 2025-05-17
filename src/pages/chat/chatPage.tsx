import { useState } from "react";
import ChatSellerHeader from "../../components/chat/ChatSellerHeader";
import ChatBuyerHeader from "../../components/chat/ChatBuyerHeader";
import ChatMessageList from "../../components/chat/ChatMessageList";
import { ChatMessage } from "../../types/types";

export default function ChatPage() {
  const [isSeller, setIsSeller] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "opponent",
      text: "안녕하세요 입찰 해주세요 ㅠ",
      timestamp: "2024-05-16T10:00:00",
    },
    {
      id: 2,
      type: "my",
      text: "네 확인해볼게요",
      timestamp: "2024-05-16T10:01:00",
    },
  ]);

  return (
    <div className="w-full max-w-[760px] min-h-screen mx-auto bg-[#101010] text-white flex flex-col">
      {/* Header */}
      {isSeller ? <ChatSellerHeader /> : <ChatBuyerHeader />}

      {/* 안내 배너 */}
      <div className="bg-gray-700 text-sm px-4 py-3 text-white mt-3 mx-4 rounded-md">
        <p className="font-bold mb-1">
          현재 치열하게 경매 중이에요!{" "}
          <span className="font-normal">
            경매에 참여하거나 거래가를 확인해보세요!^^
          </span>
        </p>
        <p>모든 거래는 티토코인으로 안전하게 진행돼요.</p>
      </div>

      {/* 메시지 목록 */}
      <ChatMessageList messages={messages} />

      {/* 입력창 */}
      <div className="w-full px-4 py-3 flex items-center gap-2 border-t border-gray-700 bg-[#101010]">
        <button className="text-white text-xl">＋</button>
        <input
          type="text"
          placeholder="메시지 보내기"
          className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm outline-none"
        />
        <button className="text-white text-xl">➤</button>
      </div>
    </div>
  );
}
