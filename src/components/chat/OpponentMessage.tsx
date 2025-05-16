// OpponentMessage.tsx
interface OpponentMessageProps {
  text: string;
}

export default function OpponentMessage({ text }: OpponentMessageProps) {
  return (
    <div className="flex items-start gap-2">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dtlrN5hP1x-m9AwA-NqGuUv2rwyehMoIkg&s"
        alt="opponent"
        className="w-6 h-6 rounded-full"
      />
      <div className="bg-gray-700 text-white text-sm px-4 py-2 rounded-lg max-w-[70%]">
        {text}
      </div>
    </div>
  );
}
