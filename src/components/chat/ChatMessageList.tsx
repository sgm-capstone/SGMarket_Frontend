import { ChatMessage } from "../../types/types";
import MyMessage from "./MyMessage";
import OpponentMessage from "./OpponentMessage";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessageList({ messages }: Props) {
  return (
    <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
      {messages.map((msg) =>
        msg.type === "my" ? (
          <MyMessage key={msg.id} text={msg.text} />
        ) : (
          <OpponentMessage key={msg.id} text={msg.text} />
        )
      )}
    </div>
  );
}
