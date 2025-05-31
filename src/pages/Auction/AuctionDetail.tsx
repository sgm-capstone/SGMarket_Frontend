import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { AuctionDetail } from "../../api/auction";
import {
  AuctionItem,
  PriceHistory,
  getAuctionDetail,
  getOtherAuctionsByAuthor,
  getAuctionPriceHistory,
  toggleAuctionLike,
  deleteAuction,
} from "../../api/auction";
import {
  BidHistory,
  MaxBid,
  getAuctionBidHistory,
  getMaxBid,
} from "../../api/bid";
import { createDirectChat } from "../../api/chat";
import { useMemberStore } from "../../stores/memberStore";
import AuctionBasicInfo from "../../components/Auction/AuctionBasicInfo";
import AuctionBids from "../../components/Auction/AuctionBids";
import AuctionHeader from "../../components/Auction/AuctionHeader";
import AuctionImage from "../../components/Auction/AuctionImage";
import AuctionOthers from "../../components/Auction/AuctionOthers";
import AuctionTabs from "../../components/Auction/AuctionTabs";
import BottomActions from "../../components/Auction/BottomActions";

export default function AuctionDetail() {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const userId = useMemberStore((s) => s.member?.id);

  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [others, setOthers] = useState<AuctionItem[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [bidHistory, setBidHistory] = useState<BidHistory[]>([]);
  const [maxBid, setMaxBid] = useState<MaxBid | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [tab, setTab] = useState<"시세" | "상세정보">("상세정보");

  const isMyAuction = auction?.auctionMember.memberId === userId;

  useEffect(() => {
    if (!auctionId) return;

    setAuction(null);
    setOthers([]);
    setPriceHistory([]);
    setBidHistory([]);
    setMaxBid(null);
    setIsLiked(false);

    const fetchData = async () => {
      try {
        const id = Number(auctionId);
        const detail = await getAuctionDetail(id);
        setAuction(detail);
        setIsLiked(detail.isLiked);

        const [others, priceHistory, bidHistory, max] = await Promise.all([
          getOtherAuctionsByAuthor(id),
          getAuctionPriceHistory(id),
          getAuctionBidHistory(id),
          getMaxBid(id).catch(() => null),
        ]);

        setOthers(others);
        setPriceHistory(priceHistory);
        setBidHistory(bidHistory);
        setMaxBid(max);
      } catch (err) {
        console.error("경매 상세 조회 실패", err);
      }
    };

    fetchData();
  }, [auctionId]);

  const handleToggleLike = async () => {
    if (!auction) return;
    try {
      const data = await toggleAuctionLike(auction.auctionId);
      setIsLiked(data.isLiked);
    } catch (e) {
      console.error("좋아요 토글 실패", e);
    }
  };

  const handleDelete = async () => {
    if (!auction) return;
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteAuction(auction.auctionId);
        alert("삭제되었습니다.");
        navigate("/home");
      } catch (e) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = () => {
    if (!auction) return;
    navigate(`/edit/${auctionId}`, {
      state: { mode: "edit", auctionId },
    });
  };

  const handleChat = async () => {
    if (!auction) return;
    try {
      const chatRoom = await createDirectChat({
        receiverId: auction.auctionMember.memberId,
        itemId: auction.auctionItem.itemId,
        initialMessage: "안녕하세요! 관심 있어서 연락드립니다.",
      });
      navigate(`/chat/${chatRoom.id}`);
    } catch (e) {
      console.error("채팅방 생성 실패", e);
      alert("채팅방을 생성할 수 없습니다.");
    }
  };

  const handleBid = () => {
    if (auction) navigate(`/bidinput/${auction.auctionId}`);
  };

  if (!auction) {
    return (
      <div className="text-white text-center py-20">
        경매 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="bg-[#101010] text-white w-full max-w-[760px] mx-auto min-h-screen pb-20">
      <AuctionHeader
        onBack={() => navigate(-1)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isMyAuction={isMyAuction}
      />

      <AuctionImage imageUrl={auction.auctionImageUrl} />

      <AuctionBasicInfo
        auction={auction}
        maxBidPrice={maxBid?.bidPrice ?? 0}
        currentTab={tab}
        onTabChange={(newTab) => setTab(newTab)}
      />

      <AuctionTabs
        tab={tab}
        priceHistory={priceHistory}
        description={auction.auctionDescription}
        itemName={auction.auctionItem.itemName}
      />

      <AuctionBids
        bidHistory={bidHistory}
        itemName={auction.auctionItem.itemName}
        maxBidPrice={maxBid?.bidPrice ?? null}
        isMyAuction={isMyAuction}
        auctionId={auction.auctionId}
      />

      <AuctionOthers
        others={others}
        authorName={auction.auctionMember.memberName}
      />

      <BottomActions
        isLiked={isLiked}
        isMyAuction={isMyAuction}
        onToggleLike={handleToggleLike}
        onBid={handleBid}
        onChat={handleChat}
      />
    </div>
  );
}
