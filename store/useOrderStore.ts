import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { OrderStore } from "@/types/order";

const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      discounts: [],
      createOrder: (data) => {
        const totalAmount = data.cartItems.reduce((acc, item) => {
          acc = acc + item.price * item.quantity;
          return acc;
        }, 0);

        const discountAmount = data.discount?.code
          ? totalAmount * (data.discount.percentage / 100)
          : 0;

        set((state) => ({
          orders: [
            ...state.orders,
            {
              cartItems: data.cartItems,
              createdOn: Date.now(),
              id: state.orders.length + 1,
              discount: data.discount,
              totalAmount: Number(totalAmount.toFixed(2)),
              discountAmount: Number(discountAmount.toFixed(2)),
            },
          ],
        }));
      },
      createDiscount: (percentage, code) => {
        set((state) => ({
          discounts: [
            ...state.discounts,
            {
              id: Date.now(),
              code: code,
              percentage,
            },
          ],
        }));
        return get().discounts[get().discounts.length - 1];
      },
    }),
    {
      name: "orders",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
