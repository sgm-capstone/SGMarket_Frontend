import { create } from "zustand";
interface AuthState {
  isLogin: boolean;
  accessToken: string;
  isAuthChecked: boolean;
  login: () => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  setAuthChecked: (val: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  accessToken: "",
  isAuthChecked: false,

  login: () =>
    set({
      isLogin: true,
    }),
  logout: () =>
    set({
      isLogin: false,
      accessToken: "",
    }),
  setAuthChecked: (val: any) => set({ isAuthChecked: val }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}));
