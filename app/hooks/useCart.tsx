import useCartStore from "@/store/useCartStore";
import useOrderStore from "@/store/useOrderStore";
import { CartItem } from "@/types/cart";
import { APIError } from "@/types/common";
import { Discount } from "@/types/discount";

export default function useCart() {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const createOrder = useOrderStore((state) => state.createOrder);
  const discounts = useOrderStore((state) => state.discounts);
  const createDiscount = useOrderStore((state) => state.createDiscount);
  const orders = useOrderStore((state) => state.orders);

  function handleIncrement(productId: string, currentQuantity: number) {
    updateQuantity(productId, currentQuantity + 1);
  }

  function handleDecrement(productId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  }

  function handleRemove(productId: string) {
    removeFromCart(productId);
  }

  function handleAddToCart(productId: string) {
    addToCart(productId);
  }

  async function handleCheckout({ cartItems }: { cartItems: CartItem[] }) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let discount: Discount | null = null;
          if ((orders.length + 1) % 2 === 0) {
            // every second order gets discount
            const discountPercentage = 10;
            const code = `DISCOUNT-10-#${orders.length + 1}`;
            const data = await requestDiscountCode({
              code,
              percentage: discountPercentage,
            });
            if (data.status === "success") {
              discount = data.data;
            }
          }
          createOrder({ cartItems, discount });
          resolve({ cartItems, discount });
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }

  async function requestDiscountCode(
    discount: Omit<Discount, "id">
  ): Promise<APIError> {
    // validate if discount code is unique
    const isUniqueCode =
      discounts.find((dis) => dis.code === discount.code) === undefined;
    if (!isUniqueCode) {
      return Promise.reject({
        status: "error",
        data: null,
        message: "Discount code already exists",
      });
    }

    // create discount code
    const createdDiscount = createDiscount(discount.percentage, discount.code);

    return Promise.resolve({
      status: "success",
      data: createdDiscount,
      message: "Success",
    });
  }

  return {
    handleDecrement,
    handleIncrement,
    handleRemove,
    handleAddToCart,
    handleCheckout,
  };
}
