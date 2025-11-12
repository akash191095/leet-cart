import { CartItem } from "./cart";
import { Discount } from "./discount";

export interface OrderStore {
  discounts: Discount[];
  createDiscount: (percentage: number, code: string) => Discount;
  orders: {
    cartItems: CartItem[];
    createdOn: number;
    id: number;
    totalAmount: number;
    discountAmount: number;
    discount: Discount | null;
  }[];
  createOrder: (data: {
    cartItems: CartItem[];
    discount: Discount | null;
  }) => void;
}
