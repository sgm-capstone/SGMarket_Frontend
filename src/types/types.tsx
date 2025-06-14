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
  profileImage?: string | null;
}

// src/types/toast.ts
export interface ToastItem {
  /** 내부에서 Date.now() 로 채워집니다 */
  id: number;
  /** 🎯 제목(1줄) */
  title: string;
  /** 부제(선택) */
  message?: string;
  /** 우측 작은 버튼 라벨(선택) */
  actionLabel?: string;
  /** 버튼 클릭 시 실행(선택) */
  onAction?: () => void;
}
