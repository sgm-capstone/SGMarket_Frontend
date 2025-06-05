import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatSellerHeader from "../../components/chat/ChatSellerHeader";
import ChatBuyerHeader from "../../components/chat/ChatBuyerHeader";
import ChatMessageList from "../../components/chat/ChatMessageList";
import useStomp from "../../hooks/useStomp";
import { ChatMessage } from "../../types/types";
import { useMemberStore } from "../../stores/memberStore";
import { getChatMessages } from "../../api/chat";

export default function ChatPage() {
  const { roomId } = useParams();
  const [isSeller] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const userId = useMemberStore((s) => s.member?.id);
  const senderNickname = useMemberStore((s) => s.member?.nickname);

  const fetchMessages = async (before?: string) => {
    if (!roomId || isLoading || !userId) return;
    setIsLoading(true);
    try {
      const newMessages = await getChatMessages(roomId, 30, before, userId);
      setMessages((prev) => [...newMessages, ...prev]);
      if (newMessages.length === 0) setHasMore(false);
    } catch (err) {
      console.error("💥 메시지 더 불러오기 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;
    if (isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container || isLoading || !hasMore) return;
    if (container.scrollTop < 80) {
      const oldest = messages[0];
      if (oldest?.createdAt) {
        fetchMessages(oldest.createdAt);
      }
    }
  };

  const handleIncomingMessage = (msg: any) => {
    if (!msg?.message || !msg?.senderId || !msg?.type) return;
    if (msg.type === "TALK" && msg.senderId == userId) return;

    const uiType: "my" | "opponent" | "system" =
      msg.type === "TALK"
        ? msg.senderId == userId
          ? "my"
          : "opponent"
        : "system";

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: msg.message,
        type: uiType,
        timestamp: msg.createdAt ?? new Date().toISOString(),
        senderId: msg.senderId,
        createdAt: msg.createdAt,
        roomId: msg.roomId,
        sender: msg.sender,
        messageType: msg.type,
      },
    ]);
  };

  const { sendMessage } = useStomp(roomId!, handleIncomingMessage);

  const handleSend = () => {
    if (!text.trim() || !userId || !roomId) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      type: "my",
      text,
      timestamp: new Date().toISOString(),
      senderId: userId,
      messageType: "TALK",
    };

    setMessages((prev) => [...prev, newMsg]);

    sendMessage({
      roomId,
      message: text,
      senderId: userId,
      sender: senderNickname,
      type: "TALK",
    });

    setText("");
  };

  return (
    <div className="w-full max-w-[760px] h-screen mx-auto bg-[#101010] text-white flex flex-col">
      {isSeller ? <ChatSellerHeader /> : <ChatBuyerHeader />}

      <div className="bg-gray-700 text-sm px-4 py-3 text-white mt-3 mx-4 rounded-md">
        <p className="font-bold mb-1">
          현재 치열하게 경매 중이에요!{" "}
          <span className="font-normal">
            경매에 참여하거나 거래가를 확인해보세요!^^
          </span>
        </p>
        <p>모든 거래는 티토코인으로 안전하게 진행돼요.</p>
      </div>

      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <ChatMessageList messages={messages} />
      </div>

      <div className="w-full px-4 py-3 flex items-center gap-2 border-t border-gray-700 bg-[#101010]">
        <button className="text-white text-xl">＋</button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="메시지 보내기"
          className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm outline-none"
        />
        <button className="text-white text-xl" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
}
