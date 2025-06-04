// src/api/member.ts
import axiosInstance from "./axios";
import type { AuctionItem } from "./auction";
export interface MemberInfo {
  id: number;
  email: string;
  profileImageUrl: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  point: number;
}

export async function getMyInfo(): Promise<MemberInfo> {
  try {
    const res = await axiosInstance.get("/members");
    return res.data.data;
  } catch (err: any) {
    if (err.response?.status === 500) {
      throw new Error("NEED_REGISTER");
    }
    throw err;
  }
}

interface LikedAuctionResponse {
  content: AuctionItem[];
  page: number;
  size: number;
  hasNext: boolean;
  first: boolean;
  last: boolean;
}

export async function getLikedAuctions(): Promise<LikedAuctionResponse> {
  const res = await axiosInstance.get("/members/auctions-likes?page=0&size=20");
  return res.data.data;
}

export async function getMyAuctions(): Promise<{
  content: AuctionItem[];
  page: number;
  size: number;
  hasNext: boolean;
}> {
  const res = await axiosInstance.get("/members/auctions?page=0&size=20");
  return res.data.data;
}

export async function getMyBids(): Promise<{
  content: AuctionItem[];
  page: number;
  size: number;
  hasNext: boolean;
  first: boolean;
  last: boolean;
}> {
  const res = await axiosInstance.get("/members/auctions-bids?page=0&size=20");
  return res.data.data;
}

export interface UpdateMemberRequest {
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
}
export async function updateMyInfo(data: UpdateMemberRequest) {
  const res = await axiosInstance.patch("/members", data);
  return res.data;
}

export async function getAuctionsByMemberId(
  memberId: number,
  page = 0,
  size = 20
) {
  const res = await axiosInstance.get(
    `/members/${memberId}/auctions?page=${page}&size=${size}`
  );
  return res.data.data as {
    content: AuctionItem[];
    page: number;
    size: number;
    hasNext: boolean;
    first: boolean;
    last: boolean;
  };
}
