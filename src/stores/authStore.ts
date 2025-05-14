import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  login: () => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  accessToken: "",

  login: () => set({ isLogin: true }),

  logout: () =>
    set({
      isLogin: false,
      accessToken: "",
    }),

  setAccessToken: (token: string) => set({ accessToken: token }),
}));
