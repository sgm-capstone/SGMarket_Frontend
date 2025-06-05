import { formatTime } from "../../utils/date";

export default function OpponentMessage({
  text,
  timestamp,
}: {
  text: string;
  timestamp?: string;
}) {
  return (
    <div className="flex items-end gap-2">
      <img
        src="/default-user.png"
        alt="상대"
        className="w-6 h-6 rounded-full"
      />
      <div className="bg-gray-700 text-white text-sm px-4 py-2  rounded-lg max-w-[70%]">
        {text}
      </div>
      <div className="text-xs text-gray-400">{formatTime(timestamp ?? "")}</div>
    </div>
  );
}
