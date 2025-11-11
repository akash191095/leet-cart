import styles from "./cart.module.css";
import CheckoutSummary from "./components/CheckoutSummary";
import CartItemList from "./components/CartItemList";

export default function CartPage() {
  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Shopping Cart</h1>
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
