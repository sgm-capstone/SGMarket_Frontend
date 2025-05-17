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
