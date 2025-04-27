import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: localStorage.getItem("isLogin") === "true",
  login: () => {
    localStorage.setItem("isLogin", "true");
    set({ isLogin: true });
  },
  logout: () => {
    localStorage.setItem("isLogin", "false");
    set({ isLogin: false });
  },
}));
