import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartStore } from "../types/cart";

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (productId) =>
        set((state) => {
          // Check if item already exists
          const existingItem = state.items.find(
            (item) => item.productId === productId
          );

          if (existingItem) {
            // If exists, increment quantity
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          // If new item, add with quantity 1
          return {
            items: [...state.items, { productId, quantity: 1 }],
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectCartCount = (state: CartStore) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export default useCartStore;
