import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface UserStoreState {
  user: User | null;
  expiresAt: number | null;
  setUser: (user: User | null, expiresAt: number | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        expiresAt: null,
        setUser: (user, expiresAt) => set({ user, expiresAt }),
        clearUser: () => set({ user: null, expiresAt: null }),
      }),
      {
        name: "user-storage", // Key for localStorage
        storage: createJSONStorage(() => localStorage), // Persist to localStorage
      }
    )
  )
);

export default useUserStore;
