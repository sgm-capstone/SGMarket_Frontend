// CoinChargePage.tsx
import { usePortonePayment } from "../hooks/usePortonePayment";
import { FaChevronLeft, FaCoins } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const coinOptions = [
  { amount: 100, price: 100 },
  { amount: 4900, price: 4900 },
  { amount: 9900, price: 9900 },
  { amount: 29000, price: 29000 },
  { amount: 49000, price: 49000 },
  { amount: 99000, price: 99000 },
];

export default function CoinChargePage() {
  const { requestPayment } = usePortonePayment();
  const navigate = useNavigate();

  const handleClick = (amount: number, price: number) => {
    requestPayment({
      merchant_uid: crypto.randomUUID(),
      amount: price,
      name: `SGM 코인 ${amount}개`,
      buyer_email: "user@example.com", // 실제 이메일로 대체 필요
      buyer_name: "사용자 이름", // 실제 이름으로 대체 필요
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white px-4 py-6">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <FaChevronLeft
          className="text-white text-xl"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold">코인 충전하기</h1>
        <GiTwoCoins className="text-yellow-400 text-2xl ml-1" />
      </div>

      <h2 className="text-lg font-semibold mb-4">재화</h2>

      <div className="grid grid-cols-2 gap-4">
        {coinOptions.map((opt) => (
          <div
            key={opt.amount}
            className="bg-gray-800 p-4 rounded-lg flex flex-col items-center shadow-md"
          >
            <FaCoins className="text-blue-400 text-3xl mb-2" />
            <p className="text-white font-semibold mb-1">
              COIN {opt.amount.toLocaleString()}개
            </p>
            <p className="text-gray-300 text-sm mb-3">
              {opt.price.toLocaleString()}원
            </p>
            <button
              onClick={() => handleClick(opt.amount, opt.price)}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
            >
              구매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
