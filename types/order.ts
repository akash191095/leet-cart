import { CartItem } from "./cart";
import { Discount } from "./discount";

export interface Order {
  cartItems: CartItem[];
  createdOn: number;
  id: number;
  totalAmount: number;
  discountAmount: number;
  discount: Discount | null;
}

export interface OrderStore {
  discounts: Discount[];
  createDiscount: (percentage: number, code: string) => Discount;
  orders: Order[];
  createOrder: (data: {
    cartItems: CartItem[];
    discount: Discount | null;
  }) => void;
}
