import axiosInstance from "./axios";

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
