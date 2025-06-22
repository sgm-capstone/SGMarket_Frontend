import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import AutoSizer from "react-virtualized-auto-sizer";
import { FaPlus } from "react-icons/fa";
import TopHeader from "../components/TopHeader";
import Product from "../components/mainPage/Product";
import { fetchAuctions, AuctionItem } from "../api/auction";
import { categoryMapping } from "../constants/categoryMap";
import type { CategoryLabel } from "../types/category";
import { getDDay } from "../utils/getDDay";
import { useMemberStore } from "../stores/memberStore";
import { getMainRegion } from "../utils/getMainRegion";

const categories: CategoryLabel[] = Object.keys(
  categoryMapping
) as CategoryLabel[];
const PAGE_SIZE = 10;

export default function Home() {
  const member = useMemberStore((state) => state.member);

  const navigate = useNavigate();
  const [currentRegion, setCurrentRegion] = useState("로딩 중...");

  useEffect(() => {
    if (!member || !member.id) {
      navigate("/register", { replace: true });
    }
  }, [member]);

  if (!member || !member.id) {
    return null;
  }

  useEffect(() => {
    if (member?.address) {
      const region = getMainRegion(member.address);
      setCurrentRegion(region);
    }
  }, [member?.address]);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryLabel>("전체");

  const [products, setProducts] = useState<AuctionItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasNextPage(true);
  }, [selectedCategory]);

  useEffect(() => {
    if (page === 0 && products.length === 0 && hasNextPage) {
      loadNextPage();
    }
  }, [page, products.length, hasNextPage]);

  const loadNextPage = async (currentPage = page) => {
    if (isNextPageLoading || !hasNextPage) return;

    setIsNextPageLoading(true);
    try {
      const data = await fetchAuctions(
        selectedCategory,
        currentPage,
        PAGE_SIZE
      );
      setProducts((prev) => [...prev, ...data]);
      setPage(currentPage + 1);
      if (data.length < PAGE_SIZE) setHasNextPage(false);
    } catch (err) {
      console.error("경매 데이터 불러오기 실패:", err);
    } finally {
      setTimeout(() => setIsNextPageLoading(false), 300);
    }
  };

  const listHeight = window.innerHeight - 180;

  return (
    <div className="w-full mx-auto bg-[#101012] text-white px-4 py-3 pb-[20px]">
      {/* ✅ 현재 지역 표시 */}
      <TopHeader currentRegion={currentRegion} />

      {/* 카테고리 */}
      <div className="flex mt-10 overflow-x-auto gap-2 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-white text-black font-bold"
                : "bg-[#1a1a1a] text-white font-bold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <div style={{ height: listHeight, width: "100%" }}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Virtuoso
              key={selectedCategory}
              style={{ height: listHeight, width }}
              data={products}
              endReached={() => loadNextPage()}
              overscan={200}
              components={{
                Footer: () =>
                  isNextPageLoading ? (
                    <div className="py-4 text-center text-gray-500">
                      Loading...
                    </div>
                  ) : null,
              }}
              itemContent={(_, p) =>
                p ? (
                  <div
                    onClick={() => navigate(`/auction/${p.auctionId}`)}
                    className="cursor-pointer hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Product
                      title={p.auctionTitle}
                      location={currentRegion}
                      dDay={getDDay(p.auctionEndDate)}
                      maxPrice={
                        typeof p.auctionCurrentPrice === "number"
                          ? p.auctionCurrentPrice === 0
                            ? "아직 없음"
                            : `${p.auctionCurrentPrice.toLocaleString()}원`
                          : "가격 미정"
                      }
                      minPrice={
                        typeof p.auctionStartPrice === "number"
                          ? `${p.auctionStartPrice.toLocaleString()}원`
                          : "가격 미정"
                      }
                      imageUrl={p.auctionImageUrl || ""}
                      isLiked={p.isLiked}
                    />
                  </div>
                ) : null
              }
            />
          )}
        </AutoSizer>
      </div>

      {/* + 버튼 */}
      <div
        className="fixed bottom-[80px] right-0 left-0  mx-auto max-w-[760px] w-full flex justify-end pr-6 pointer-events-none z-50 bg-transparent"
        onClick={() => navigate("/create")}
      >
        <div className="pointer-events-auto bg-white  text-black p-4 rounded-full shadow-lg">
          <FaPlus className="" />
        </div>
      </div>
    </div>
  );
}
