import axiosInstance from "../api/axios";

export async function chargeCoin(amount: number) {
  try {
    const res = await axiosInstance.patch("/members/charge-coin", {
      price: amount,
    });
    console.log("충전 성공", res.data);
  } catch (err) {
    console.error("❌ 충전 실패", err);
  }
}
