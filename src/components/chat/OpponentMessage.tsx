import { formatTime } from "../../utils/date";

interface Props {
  text: string;
  timestamp?: string;
  profileImage?: string;
}

export default function OpponentMessage({
  text,
  timestamp,
  profileImage,
}: Props) {
  return (
    <div className="flex items-end gap-2">
      <img
        src={profileImage || "/default-user.png"}
        alt="상대"
        className="w-6 h-6 rounded-full object-cover bg-white"
      />
      <div className="bg-gray-700 text-white text-sm px-4 py-2 rounded-lg max-w-[70%]">
        {text}
      </div>
      <div className="text-xs text-gray-400">{formatTime(timestamp ?? "")}</div>
    </div>
  );
}
