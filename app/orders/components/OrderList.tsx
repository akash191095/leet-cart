"use client";

import useOrderStore from "@/store/useOrderStore";
import OrderCard from "./OrderCard";
import EmptyOrders from "./EmptyOrders";
import OrdersSummary from "./OrdersSummary";
import styles from "../orders.module.css";

export default function OrderList() {
  const orders = useOrderStore((state) => state.orders);

  // Sort orders by date (newest first)
  const sortedOrders = [...orders].sort((a, b) => b.createdOn - a.createdOn);

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <>
      <OrdersSummary orders={orders} />
      <div className={styles.ordersList}>
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
}
