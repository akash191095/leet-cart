import shared from "@/app/styles/shared.module.css";
import OrderList from "./components/OrderList";

export default function OrdersPage() {
  return (
    <div className={shared.page}>
      <div className={shared.container}>
        <h1 className={shared.pageTitle}>Your Orders</h1>
        <OrderList />
      </div>
    </div>
  );
}
