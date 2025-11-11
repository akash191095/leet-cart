import useCartStore from "@/store/useCartStore";

export default function useCart() {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleIncrement = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  return { handleDecrement, handleIncrement, handleRemove, handleAddToCart };
}
