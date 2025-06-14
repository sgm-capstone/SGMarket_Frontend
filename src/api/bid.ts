import axiosInstance from "./axios";

interface MemberInfo {
  memberId: number;
  memberName: string;
  memberProfileImageUrl: string;
  coin: number;
}

interface BidResponse {
  bidPrice: number;
  memberInfo: MemberInfo;
  bidTime: string;
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
  bidTime: string;
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
export async function getMaxBid(auctionId: number): Promise<MaxBid | null> {
  try {
    const res = await axiosInstance.get(`/auctions/${auctionId}/bids/max`);
    return res.data.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export interface SettleBidResponse {
  bidPrice: number;
  memberInfo: {
    memberId: number;
    memberName: string;
    memberProfileImageUrl?: string;
  };
}

// 낙찰 처리 API
export async function postSettleBid(
  auctionId: number
): Promise<SettleBidResponse> {
  const res = await axiosInstance.post(`/auctions/${auctionId}/bids/settle`);
  return res.data.data;
}
