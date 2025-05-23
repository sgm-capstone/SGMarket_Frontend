import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { postSettleBid } from "../api/bid";

export default function CompleteBid() {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const { state } = useLocation();
  const bid = state?.bid;

  if (!bid || !auctionId) {
    return (
      <div className="bg-black w-full text-white h-screen flex items-center justify-center">
        입찰 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const handleSettle = async () => {
    try {
      await postSettleBid(Number(auctionId));
      alert("낙찰 완료!");
      navigate("/home");
    } catch (err) {
      alert("낙찰 처리 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="bg-black w-full text-white flex flex-col justify-between min-h-screen mx-auto max-w-[760px]">
      {/* 헤더 */}
      <div className="flex items-center h-[60px] px-4">
        <button onClick={() => navigate(-1)} className="text-white text-xl">
          <FaChevronLeft />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">거래완료</h1>
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="text-6xl mb-4">😎</div>
        <p className="text-[16px] text-white font-semibold">
          {bid.memberInfo.memberName}님의
        </p>
        <p className="text-[36px] font-bold tracking-widest mt-1">
          {bid.bidPrice.toLocaleString()}
        </p>
        <p className="text-[18px] mt-2 font-semibold">낙찰하시겠어요?</p>
        <p className="text-sm text-gray-400 mt-2 underline">
          주의사항 읽어보기 &gt;
        </p>
      </div>

      {/* 버튼 */}
      <div className="px-4 pb-6">
        <button
          onClick={handleSettle}
          className="w-full bg-blue-700 py-4 rounded-md font-bold text-white text-lg"
        >
          네, 낙찰할게요.
        </button>
      </div>
    </div>
  );
}
