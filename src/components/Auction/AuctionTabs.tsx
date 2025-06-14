import { PriceHistory } from "../../api/auction";
import Description from "./Description";
import PriceChart from "./PriceChart";

interface Props {
  tab: string;
  description: string;
  itemName: string;
  priceHistory: PriceHistory[];
}

export default function AuctionTabs({
  tab,
  description,
  itemName,
  priceHistory,
}: Props) {
  return tab === "시세" ? (
    <PriceChart itemName={itemName} priceHistory={priceHistory} />
  ) : (
    <Description content={description} />
  );
}
