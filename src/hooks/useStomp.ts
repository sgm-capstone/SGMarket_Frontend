// hooks/useStomp.ts
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function useStomp(
  roomId: string,
  onMessage: (message: any) => void
) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: `wss://dev.sgmarket.store/ws-stomp`,
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
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
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
