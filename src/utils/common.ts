// src/utils/common.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TTaskDetail = {
  id: string;
  setId: (id: string) => void;
};
//fuyoh
export const useTaskDetail = create<TTaskDetail>()(
  persist(
    (set) => ({
      id: "",
      setId: (id: string) => set({ id: id }),
    }),
    {
      name: "task-id",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return sessionStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
