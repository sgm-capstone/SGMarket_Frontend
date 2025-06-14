// src/hooks/usePortonePayment.ts
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { chargeCoin } from "./chargeCoin";

declare global {
  interface Window {
    IMP: any;
  }
}

export interface PaymentRequestData {
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_email: string;
  buyer_name: string;
}

export function usePortonePayment() {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window.IMP !== "undefined") return;
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const requestPayment = (data: PaymentRequestData) => {
    const IMP = window.IMP;
    if (!IMP) {
      alert("결제 시스템을 불러오지 못했습니다.");
      return;
    }

    IMP.init(import.meta.env.VITE_PORTONE_INIT);

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: data.merchant_uid,
        name: data.name,
        amount: data.amount,
        buyer_email: data.buyer_email,
        buyer_name: data.buyer_name,
      },
      async (rsp: any) => {
        if (rsp.success) {
          console.log(rsp);

          const payload = {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            status: rsp.status,
            paid_amount: rsp.paid_amount,
            pay_method: rsp.pay_method,
            paid_at: rsp.paid_at,
          };
          console.log(payload);

          try {
            await chargeCoin(rsp.paid_amount);
            navigate("/charge/success", {
              state: { amount: payload.paid_amount },
            });
          } catch (err) {
            console.error("❌ 서버 요청 중 오류 발생", err);
            alert("서버 검증 중 네트워크 오류가 발생했습니다.");
          }
        } else {
          alert(`❌ 결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  return { requestPayment };
}
