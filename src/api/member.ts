// src/api/member.ts
import axiosInstance from "./axios";

export interface MemberInfo {
  id: number;
  email: string;
  profileImageUrl: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
}

export async function getMyInfo(): Promise<MemberInfo> {
  const res = await axiosInstance.get("/members");
  return res.data.data;
}
