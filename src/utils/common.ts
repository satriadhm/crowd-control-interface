import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TTaskDetail = {
  id: string;
  setId: (id: string) => void;
};

export const useTaskDetail = create<TTaskDetail>()(
  persist(
    (set) => ({
      id: "",
      setId: (id: string) => set({ id: id }),
    }),
    {
      name: "task-id",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
