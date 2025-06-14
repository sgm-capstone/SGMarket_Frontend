interface Props {
  content: string;
}

export default function Description({ content }: Props) {
  return (
    <div className="py-4 text-sm leading-relaxed whitespace-pre-line px-4">
      {content}
    </div>
  );
}
