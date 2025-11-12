export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CartStore {
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  items: CartItem[];
  resetCart: () => void;
}
