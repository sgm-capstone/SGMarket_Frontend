import axiosInstance from "./axios";
import { categoryMapping } from "../constants/categoryMap";
import type { CategoryLabel } from "../types/category";

// 경매 카테고리 목록
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

// 경매 목록 조회
export async function fetchAuctions(
  category: CategoryLabel,
  page = 0,
  size = 10
): Promise<AuctionItem[]> {
  const categoryCode = categoryMapping[category];

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

  if (categoryCode !== undefined) {
    params.category = categoryCode;
  }

  const res = await axiosInstance.get("/auctions", { params });
  return res.data.data.content;
}

// 경매 등록 요청 타입
export interface AuctionRegisterRequest {
  itemRegisterRequest: { itemName: string };
  title: string;
  description: string;
  endDate: string;
  startPrice: number;
  auctionCategory: string;
}

// 경매 등록
export async function postAuction(payload: AuctionRegisterRequest, file: File) {
  const formData = new FormData();
  formData.append("request", JSON.stringify(payload));
  formData.append("itemImage", file);

  await axiosInstance.post("/auctions", formData, {
    headers: {
      Accept: "application/json",
    },
  });
}

// 경매 상세 조회
export interface AuctionDetail {
  auctionId: number;
  auctionTitle: string;
  auctionDescription: string;
  auctionStartDate: string;
  auctionEndDate: string;
  auctionStartPrice: number;
  auctionCurrentPrice: number;
  auctionEndPrice: number | null;
  auctionImageUrl: string;
  auctionCategory: string;
  likeCount: number;
  auctionItem: {
    itemName: string;
  };
  auctionMember: {
    memberId: number;
    memberName: string;
    memberProfileImageUrl: string;
  };
  status: string;
}
// 경매 상세 조회
export async function getAuctionDetail(
  auctionId: number
): Promise<AuctionDetail> {
  const res = await axiosInstance.get(`/auctions/${auctionId}`);
  return res.data.data;
}
// 경매 수정 요청 타입
export interface AuctionUpdateRequest {
  title: string;
  description: string;
  itemName: string;
  endDate: string;
  auctionCategory: string;
}
// 경매 수정
export async function patchAuction(
  auctionId: number,
  payload: AuctionUpdateRequest,
  file?: File
): Promise<void> {
  const formData = new FormData();
  formData.append("request", JSON.stringify(payload));
  if (file) {
    formData.append("itemImage", file);
  }

  await axiosInstance.patch(`/auctions/${auctionId}`, formData, {
    headers: {
      Accept: "application/json",
    },
  });
}

//경매 삭제
export async function deleteAuction(auctionId: number): Promise<void> {
  await axiosInstance.delete(`/auctions/${auctionId}`);
}

// 글 작성자의 다른 경매 목록 조회
export async function getOtherAuctionsByAuthor(auctionId: number) {
  const res = await axiosInstance.get(`/auctions/${auctionId}/others`, {
    params: {
      page: 0,
      size: 10,
      sort: "createdAt,DESC",
    },
  });
  return res.data.data.content;
}
