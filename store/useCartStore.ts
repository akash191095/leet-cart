import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartStore } from "../types/cart";

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () =>
        set((state) => ({ count: Math.max(0, state.count - 1) })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
