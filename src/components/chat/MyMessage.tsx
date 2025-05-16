// MyMessage.tsx
interface MyMessageProps {
  text: string;
}

export default function MyMessage({ text }: MyMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-white text-black text-sm px-4 py-2 rounded-lg max-w-[70%]">
        {text}
      </div>
    </div>
  );
}
