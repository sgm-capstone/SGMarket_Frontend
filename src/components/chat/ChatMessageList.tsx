import { ChatMessage } from "../../types/types";
import MyMessage from "./MyMessage";
import OpponentMessage from "./OpponentMessage";
import { formatDateHeader } from "../../utils/date";
import SystemMessage from "./ChatSystemMessage";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessageList({ messages }: Props) {
  let lastDate = "";

  return (
    <div className="flex flex-col gap-3 mb-4">
      {messages.map((msg) => {
        const currentDate = msg.createdAt?.split("T")[0] ?? "";
        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <div key={msg.id} className="space-y-1">
            {showDate && (
              <div className="text-center text-gray-400 text-xs my-4">
                {formatDateHeader(msg.createdAt!)}
              </div>
            )}

            {msg.type === "my" && (
              <MyMessage text={msg.text} timestamp={msg.timestamp} />
            )}
            {msg.type === "opponent" && (
              <OpponentMessage text={msg.text} timestamp={msg.timestamp} />
            )}
            {msg.type === "system" && <SystemMessage text={msg.text} />}
          </div>
        );
      })}
    </div>
  );
}
