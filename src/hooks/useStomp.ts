import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function useStomp(
  roomId: string,
  onMessage: (message: any) => void
) {
  const clientRef = useRef<Client | null>(null);
  const WS_URL = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    if (clientRef.current?.connected) {
      console.warn("🟡 이미 연결된 WebSocket이 있음");
      clientRef.current.deactivate();
    }

    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("🟢 STOMP 연결 성공");
        client.subscribe(`/sub/chat/room/${roomId}`, (frame) => {
          console.log("📥 수신됨", frame.body);
          const msg = JSON.parse(frame.body);
          onMessage(msg);
        });
      },
      onStompError: (frame) => {
        console.error("🔴 STOMP 에러:", frame.headers["message"]);
      },
      onDisconnect: () => {
        console.log("🧹 STOMP 연결 종료됨");
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("🧹 cleanup: WebSocket 종료 요청");
      client.deactivate();
      clientRef.current = null;
    };
  }, [roomId]);

  const sendMessage = (message: object) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(message),
      });
    } else {
      console.warn("🟡 WebSocket 연결되지 않음");
    }
  };

  return { sendMessage };
}
