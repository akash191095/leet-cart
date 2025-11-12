import styles from "./orders.module.css";
import OrderList from "./components/OrderList";

export default function OrdersPage() {
  return (
    <div className={styles.ordersPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Your Orders</h1>
        <OrderList />
      </div>
    </div>
  );
}
