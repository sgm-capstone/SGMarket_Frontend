import { create } from "zustand";
import { ToastItem } from "../types/types";

interface NotificationState {
  list: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  remove: (id: number) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  list: [],

  push: (toast) =>
    set({
      list: [...get().list, { ...toast, id: Date.now() }],
    }),

  remove: (id) =>
    set({
      list: get().list.filter((t) => t.id !== id),
    }),
}));
