export interface CartStore {
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  items: { productId: string; quantity: number }[];
}
