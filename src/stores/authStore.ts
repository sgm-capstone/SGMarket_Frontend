import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  recentToken: string;
  login: () => void;
  logout: () => void;
  setRecentToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: localStorage.getItem("isLogin") === "true",
  recentToken: "",
  login: () => {
    localStorage.setItem("isLogin", "true");
    set({ isLogin: true });
  },
  logout: () => {
    localStorage.setItem("isLogin", "false");
    set({ isLogin: false });
  },
  setRecentToken: (token: string) => {
    set({ recentToken: token });
  },
}));
