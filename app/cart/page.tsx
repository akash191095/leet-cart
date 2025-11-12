import styles from "./cart.module.css";
import shared from "@/app/styles/shared.module.css";
import CheckoutSummary from "./components/CheckoutSummary";
import CartItemList from "./components/CartItemList";

export default function CartPage() {
  return (
    <div className={shared.page}>
      <div className={shared.container}>
        <h1 className={shared.pageTitle}>Shopping Cart</h1>
        <div className={styles.cartLayout}>
          {/* Cart Items */}
          <CartItemList />

          {/* Checkout Summary */}
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
