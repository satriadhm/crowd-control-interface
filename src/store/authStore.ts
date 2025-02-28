import { create } from "zustand";

interface AuthState {
  userRole: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (role: string, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userRole: null,
  accessToken: null,
  refreshToken: null,
  setAuth: (role, accessToken, refreshToken) =>
    set({ userRole: role, accessToken, refreshToken }),
  clearAuth: () => set({ userRole: null, accessToken: null, refreshToken: null }),
}));
