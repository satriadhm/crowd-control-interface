// src/store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  userRole: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (role: string, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userRole: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (role, accessToken, refreshToken) =>
        set({ userRole: role, accessToken, refreshToken }),
      clearAuth: () =>
        set({ userRole: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        // Check if window is defined (browser environment)
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Provide a placeholder storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
