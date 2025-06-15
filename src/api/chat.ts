import axiosInstance from "./axios";
import { ChatMessage } from "../types/types";
// DM 생성 요청
export interface DirectChatRequest {
  receiverId: number;
  itemId: number;
  initialMessage: string;
}

// DM 생성 요청
export interface DirectChatResponse {
  id: string;
  name: string;
  creatorId: number;
  createdAt: string;
  participantId: number;
  directChat: boolean;
}
// DM 생성
export async function createDirectChat(
  payload: DirectChatRequest
): Promise<DirectChatResponse> {
  const res = await axiosInstance.post("/chat/direct", payload);
  return res.data.data;
}

// DM 목록 조회
export interface DirectChatRoom {
  locationName: string;
  roomId: string;
  otherUserId: number;
  otherUserNickname: string;
  otherUserProfileImage: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  itemId: number | null;
}

// 내 DM 목록 조회
export async function getMyDirectChats(): Promise<DirectChatRoom[]> {
  const res = await axiosInstance.get("/chat/direct");
  return res.data.data;
}

// 채팅 조회 (페이징)
export const getPaginatedChatMessages = async (
  roomId: string,
  cursor?: number,
  size: number = 30
): Promise<{
  messages: ChatMessage[];
  nextCursor: number | null;
  hasMore: boolean;
}> => {
  const res = await axiosInstance.get(`/chat/room/${roomId}/messages-page`, {
    params: { cursor, size },
  });

  const { messages, nextCursor, hasMore } = res.data.data;

  const parsedMessages: ChatMessage[] = messages.map(
    (msg: any, index: number) => {
      const isMine =
        String(msg.senderId) === String(localStorage.getItem("userId") ?? "");

      const uiType: "my" | "opponent" | "system" =
        msg.type === "TALK" ? (isMine ? "my" : "opponent") : "system";

      return {
        id: Date.now() + index,
        text: msg.message,
        type: uiType,
        timestamp: msg.createdAt,
        senderId: msg.senderId,
        createdAt: msg.createdAt,
        roomId: msg.roomId,
        sender: msg.sender,
        messageType: msg.type,
        profileImage: msg.profileImage ?? "",
      };
    }
  );

  return {
    messages: parsedMessages,
    nextCursor,
    hasMore,
  };
};

// 채팅방 삭제
export async function deleteChatRoom(roomId: string): Promise<void> {
  await axiosInstance.delete(`/chat/room/${roomId}`);
}

// 채팅방 메타데이터 조회
export interface ChatRoomMeta {
  itemId: number;
  itemTitle: string;
  itemPrice: number;
  otherUserNickname: string;
  otherUserProfileImage: string;
}

export async function getChatRoomMeta(roomId: string): Promise<ChatRoomMeta> {
  const res = await axiosInstance.get(`/chat/room/${roomId}/meta`);
  return res.data.data;
}
