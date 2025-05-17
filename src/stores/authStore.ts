import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  memberId: number | null;
  login: (id: number) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  accessToken: "",
  memberId: null,

  login: (id: number) =>
    set({
      isLogin: true,
      memberId: id,
    }),

  logout: () =>
    set({
      isLogin: false,
      accessToken: "",
      memberId: null,
    }),

  setAccessToken: (token: string) => set({ accessToken: token }),
}));
