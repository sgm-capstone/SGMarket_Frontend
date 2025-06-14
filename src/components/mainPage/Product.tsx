// Product.tsx
import { FaCommentDots, FaHeart } from "react-icons/fa";

interface ProductProps {
  title: string;
  location: string;
  dDay: string;
  maxPrice: string;
  minPrice: string;
  imageUrl: string;
  isLiked: boolean;
}

export default function Product({
  title,
  location,
  dDay,
  maxPrice,
  minPrice,
  imageUrl,
  isLiked,
}: ProductProps) {
  return (
    <div className="flex flex-row justify-between items-start gap-3 py-3 border-b border-gray-600 w-full max-w-full">
      {/* 이미지 영역 */}
      <div className="flex-shrink-0 w-[100px] h-[100px] sm:w-[110px] sm:h-[110px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* 제목 및 세부 정보 */}
      <div className="flex flex-col justify-between flex-grow min-w-0">
        <div className="text-sm sm:text-base font-bold truncate mb-1">
          {title}
        </div>
        <div className="text-xs text-gray-400 truncate mb-2">
          {location} | {dDay}
        </div>

        <div className="flex flex-row justify-between items-end w-full">
          {/* 현재/시작/날짜 영역 */}
          <div className="flex flex-col gap-1 text-[12px] sm:text-sm">
            <div className="flex items-center  gap-1">
              <span className="bg-blue-600 text-white rounded-full px-2 py-1 font-semibold text-[11px]">
                현재
              </span>
              <span className="text-white font-bold">{maxPrice}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-gray-400 text-white rounded-full px-2 py-1 font-semibold text-[11px]">
                시작
              </span>
              <span className="text-white font-bold">{minPrice}</span>
            </div>
          </div>

          {/* 채팅/하트 아이콘 */}
          <div className="flex  items-end gap-2 text-gray-400 text-sm">
            <FaCommentDots className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer " />
            <div className="text-red-500 text-lg mr-2">
              <FaHeart className={isLiked ? "text-red-500" : "text-white"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
