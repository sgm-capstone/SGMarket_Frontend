import axiosInstance from "./axios";

interface MemberInfo {
  memberId: number;
  memberName: string;
  memberProfileImageUrl: string;
}

interface BidResponse {
  bidPrice: number;
  memberInfo: MemberInfo;
}

export async function postBid(
  auctionId: number,
  bidPrice: number
): Promise<BidResponse> {
  const response = await axiosInstance.post(`/auctions/${auctionId}/bids`, {
    bidPrice,
  });
  return response.data.data;
}

export interface BidHistory {
  bidPrice: number;
  memberInfo: {
    memberId: number;
    memberName: string;
    memberProfileImageUrl?: string;
  };
}
// 입찰 내역 조회 API
export async function getAuctionBidHistory(
  auctionId: number,
  page = 0,
  size = 20
): Promise<BidHistory[]> {
  const res = await axiosInstance.get(`/auctions/${auctionId}/bids`, {
    params: { page, size },
  });
  return res.data.data.content;
}
// 최대 입찰가 타입
export interface MaxBid {
  bidPrice: number;
  memberInfo: {
    memberId: number;
    memberName: string;
    memberProfileImageUrl?: string;
  };
}

// 최대 입찰가 조회 API
export async function getMaxBid(auctionId: number): Promise<MaxBid> {
  const res = await axiosInstance.get(`/auctions/${auctionId}/bids/max`);
  return res.data.data;
}
