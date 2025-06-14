import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AuctionItem } from "../../api/auction";
import { getAuctionsByMemberId, getOrdersByMemberId } from "../../api/member";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [orders, setOrders] = useState<AuctionItem[]>([]);

  const [auctionPage, setAuctionPage] = useState(0);
  const [orderPage, setOrderPage] = useState(0);
  const [hasMoreAuctions, setHasMoreAuctions] = useState(true);
  const [hasMoreOrders, setHasMoreOrders] = useState(true);

  const auctionEndRef = useRef<HTMLDivElement | null>(null);
  const orderEndRef = useRef<HTMLDivElement | null>(null);

  // 판매 물품 호출
  useEffect(() => {
    if (!memberId) return;
    const fetch = async () => {
      const res = await getAuctionsByMemberId(Number(memberId), auctionPage);
      setAuctions((prev) => [...prev, ...res.content]);
      setHasMoreAuctions(!res.last);
    };
    fetch();
  }, [auctionPage, memberId]);

  // 구매 물품 호출
  useEffect(() => {
    if (!memberId) return;
    const fetch = async () => {
      const res = await getOrdersByMemberId(Number(memberId), orderPage);
      setOrders((prev) => [...prev, ...res.content]);
      setHasMoreOrders(!res.last);
    };
    fetch();
  }, [orderPage, memberId]);

  // 무한스크롤 (판매)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreAuctions) {
          setAuctionPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (auctionEndRef.current) observer.observe(auctionEndRef.current);
    return () => observer.disconnect();
  }, [auctions, hasMoreAuctions]);

  // 무한스크롤 (구매)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreOrders) {
          setOrderPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (orderEndRef.current) observer.observe(orderEndRef.current);
    return () => observer.disconnect();
  }, [orders, hasMoreOrders]);

  return (
    <div className="bg-[#101010] text-white min-h-screen pb-20 w-full max-w-[760px] mx-auto">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          className="absolute left-4 text-lg"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">프로필</h1>
      </div>

      {/* 유저 정보 */}
      {auctions[0] && (
        <div className="flex items-center px-4 py-5 border-b border-gray-800">
          <img
            src={auctions[0].auctionMember.memberProfileImageUrl}
            alt="profile"
            className="w-12 h-12 rounded-full bg-white"
          />
          <div className="ml-4">
            <p className="font-bold text-lg">
              {auctions[0].auctionMember.memberName} 님
            </p>
            <div className="flex gap-2 mt-2">
              {["판매자", "신뢰", "SG마켓"].map((tag, i) => (
                <span
                  key={i}
                  className={`text-sm px-2 py-1 rounded ${
                    i === 0 ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 판매 물품 */}
      <section className="px-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[14px] font-bold">판매 물품 보기</p>
          <FaChevronRight className="text-white text-sm" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto max-h-[380px]">
          {auctions.map((item) => (
            <div
              key={item.auctionId}
              className="bg-[#181818] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`/auction/${item.auctionId}`)}
            >
              <img
                src={item.auctionImageUrl}
                alt={item.auctionTitle}
                className="w-full h-28 sm:h-32 md:h-36 object-contain bg-white"
              />
              <div className="p-2">
                <p className="text-[13px] font-bold truncate">
                  {item.auctionTitle}
                </p>
                <p className="text-xs text-white">
                  {item.auctionCurrentPrice > 0
                    ? `${item.auctionCurrentPrice.toLocaleString()}원`
                    : `${item.auctionStartPrice.toLocaleString()}원`}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={auctionEndRef} className="h-4" />
      </section>

      {/* 구매 목록 */}
      <section className="px-4 mt-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[14px] font-bold">구매한 물품 보기</p>
          <FaChevronRight className="text-white text-sm" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto max-h-[380px]">
          {orders.map((item) => (
            <div
              key={item.auctionId}
              className="bg-[#181818] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`/auction/${item.auctionId}`)}
            >
              <img
                src={item.auctionImageUrl}
                alt={item.auctionTitle}
                className="w-full h-28 sm:h-32 md:h-36 object-contain bg-white"
              />
              <div className="p-2">
                <p className="text-[13px] font-bold truncate">
                  {item.auctionTitle}
                </p>
                <p className="text-xs text-white">
                  {item.auctionCurrentPrice > 0
                    ? `${item.auctionCurrentPrice.toLocaleString()}원`
                    : `${item.auctionStartPrice.toLocaleString()}원`}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={orderEndRef} className="h-4" />
      </section>
    </div>
  );
}
