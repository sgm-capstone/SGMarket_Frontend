export interface Coordinates {
  x: string; // 경도
  y: string; // 위도
}

export interface ChatMessage {
  id: number;
  text: string;
  type: "my" | "opponent" | "system";
  timestamp: string;
  senderId: number | string;
  createdAt?: string;
  roomId?: string;
  sender?: string | null;
  messageType?: "TALK" | "ENTER" | "LEAVE";
}
