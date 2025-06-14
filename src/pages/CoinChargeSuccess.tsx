import { useLocation, useNavigate } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";

export default function CoinChargeSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-screen w-full bg-[#101010] text-white flex flex-col items-center justify-center px-6">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-2xl font-bold mb-2">충전 완료!</h1>
      <p className="text-sm text-gray-300 mb-6">
        {amount.toLocaleString()} 코인을 성공적으로 충전했습니다.
      </p>

      <GiTwoCoins className="text-yellow-400 text-5xl mb-6" />

      <button
        onClick={() => navigate("/home")}
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-semibold"
      >
        홈으로 이동
      </button>
    </div>
  );
}
