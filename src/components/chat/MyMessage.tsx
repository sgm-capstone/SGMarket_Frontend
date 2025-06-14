import { formatTime } from "../../utils/date";

export default function MyMessage({
  text,
  timestamp,
}: {
  text: string;
  timestamp?: string;
}) {
  return (
    <div className="flex justify-end items-end gap-2">
      <div className="text-xs text-gray-400">{formatTime(timestamp ?? "")}</div>
      <div className="bg-white text-black text-sm px-4 py-2 rounded-lg max-w-[70%]">
        {text}
      </div>
    </div>
  );
}
