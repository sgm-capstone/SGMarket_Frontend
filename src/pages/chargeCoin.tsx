import { usePortonePayment } from "../hooks/usePortonePayment";

export default function CoinChargeButton() {
  const { requestPayment } = usePortonePayment();

  const handleClick = () => {
    requestPayment({
      merchant_uid: crypto.randomUUID(),
      amount: 100,
      name: "SGMCOIN 충전",
      buyer_email: "lzvckaya@gmail.com",
      buyer_name: "데일리 백수",
    });
  };

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded"
      onClick={handleClick}
    >
      포인트 충전하기
    </button>
  );
}
