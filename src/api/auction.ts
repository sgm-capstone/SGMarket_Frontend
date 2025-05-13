import axiosInstance from "./axios";
import { categoryMapping } from "../constants/categoryMap";
import type { CategoryLabel } from "../types/category";

export interface AuctionItem {
  auctionId: number;
  auctionTitle: string;
  auctionCategory: string;
  auctionEndDate: string;
  auctionStartPrice: number;
  auctionEndPrice: number;
  auctionImageUrl: string;
  auctionItem: {
    itemName: string;
  };
}

export async function fetchAuctions(
  category: CategoryLabel,
  page = 0,
  size = 10
): Promise<AuctionItem[]> {
  const categoryCode = categoryMapping[category] ?? "";

  const params: {
    page: number;
    size: number;
    sort: string;
    category?: string;
  } = {
    page,
    size,
    sort: "createdAt,DESC",
  };

  if (categoryCode) {
    params.category = categoryCode;
  }

  const res = await axiosInstance.get("/auctions", { params });
  return res.data.data.content;
}
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
