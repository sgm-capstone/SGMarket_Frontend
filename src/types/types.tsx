// TypeScript 타입 정의 파일 (.d.ts)

export interface Coordinates {
  x: string; // 경도
  y: string; // 위도
}

export type ChatMessageType = "my" | "opponent";

export interface ChatMessage {
  id: number;
  type: ChatMessageType;
  text: string;
  timestamp: string;
}
