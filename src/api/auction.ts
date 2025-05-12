import axiosInstance from "./axios";

export interface AuctionRegisterRequest {
  itemRegisterRequest: { itemName: string };
  title: string;
  description: string;
  endDate: string;
  startPrice: number;
  currentPrice: number;
  endPrice: number;
  auctionCategory: string;
}

export function postAuction(payload: AuctionRegisterRequest, file: File) {
  const formData = new FormData();
  formData.append("request", JSON.stringify(payload));
  formData.append("itemImage", file);

  return axiosInstance.post("/auctions", formData, {
    headers: {
      Accept: "application/json",
    },
  });
}
