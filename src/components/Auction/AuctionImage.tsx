interface Props {
  imageUrl: string;
}

export default function AuctionImage({ imageUrl }: Props) {
  return <img src={imageUrl} className="w-full object-contain" alt="auction" />;
}
