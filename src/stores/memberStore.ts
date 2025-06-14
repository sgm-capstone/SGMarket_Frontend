// src/stores/memberStore.ts
import { create } from "zustand";
import type { MemberInfo } from "../api/member";

interface MemberState {
  member: MemberInfo | null;
  setMember: (member: MemberInfo) => void;
  clearMember: () => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  member: null,
  setMember: (member) => set({ member }),
  clearMember: () => set({ member: null }),
}));
