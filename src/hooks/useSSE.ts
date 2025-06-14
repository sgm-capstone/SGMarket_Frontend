import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useAuthStore } from "../stores/authStore";
import { useNotificationStore } from "../stores/notificationStore";

type NotificationEventType =
  | "BID"
  | "BID_OUTBID"
  | "AUCTION_SETTLED"
  | "AUCTION_FAILED"
  | "AUCTION_NO_BID"
  | "AUCTION_END_SOON";

interface NotificationPayload {
  notificationId: number | null;
  eventType: NotificationEventType;
  message: string;
  occurredAt: string;
  isRead: boolean;
}

export function useSSEPolyfill() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const pushToast = useNotificationStore((s) => s.push);

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSourcePolyfill | null>(null);

  /* prettier title */
  const titleOf = (t: NotificationEventType) => {
    switch (t) {
      case "BID":
        return { title: "💰 새 입찰이 등록됐어요!", actionLabel: "바로가기" };
      case "BID_OUTBID":
        return { title: "😱 입찰이 밀렸어요!", actionLabel: "재입찰" };
      case "AUCTION_SETTLED":
        return { title: "🥳 경매가 낙찰됐어요!" };
      case "AUCTION_FAILED":
        return { title: "😭 경매가 실패했어요…" };
      case "AUCTION_NO_BID":
        return { title: "😶 입찰자 없이 종료됐어요." };
      case "AUCTION_END_SOON":
        return { title: "⏰ 곧 마감 – 서두르세요!" };
    }
  };

  /* 공통 토스트 발행 */
  const showToast = (p: NotificationPayload) =>
    pushToast({
      ...titleOf(p.eventType),
      message: p.message,
      onAction: () => console.log("👉 이동 / 후처리"),
    });

  /* ---------- effect ---------- */
  useEffect(() => {
    if (!accessToken) return;

    const es = new EventSourcePolyfill(
      `${import.meta.env.VITE_PUBLIC_URL}/sse/subscribe`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
        heartbeatTimeout: 600_000,
      }
    );
    esRef.current = es;

    /* 커스텀 리스너 타입 명시 + 캐스팅 */
    const listener = function (this: EventSource, ev: MessageEvent) {
      try {
        showToast(JSON.parse(ev.data) as NotificationPayload);
      } catch (e) {
        console.error("❌ 알림 파싱 실패:", e);
      }
    } as (this: EventSource, ev: MessageEvent) => any;

    [
      "BID",
      "BID_OUTBID",
      "AUCTION_SETTLED",
      "AUCTION_FAILED",
      "AUCTION_NO_BID",
      "AUCTION_END_SOON",
    ].forEach((t) =>
      // 👇 두 번째 인수를 라이브러리 정의 타입으로 캐스팅
      es.addEventListener(
        t,
        listener as unknown as import("event-source-polyfill").EventListenerOrEventListenerObject
      )
    );

    es.onopen = () => (setIsConnected(true), setError(null));
    es.onerror = () => (setIsConnected(false), setError("SSE 연결 오류 😢"));
    es.onmessage = (e) => console.log("📩 기타 메시지:", e.data);

    return () => es.close();
  }, [accessToken, pushToast]);

  return { isConnected, error };
}
