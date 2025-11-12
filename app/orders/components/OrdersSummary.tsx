"use client";

import { formatCurrency } from "@/lib/utils";
import styles from "../orders.module.css";
import shared from "@/app/styles/shared.module.css";
import { Order } from "@/types/order";

interface OrdersSummaryProps {
  orders: Order[];
}

export default function OrdersSummary({ orders }: OrdersSummaryProps) {
  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalAmount - order.discountAmount),
    0
  );

  const totalSavings = orders.reduce(
    (sum, order) => sum + order.discountAmount,
    0
  );

  return (
    <div className={styles.summaryStats}>
      <div className={styles.statsGrid}>
        <div className={shared.statItem}>
          <span className={shared.statLabel}>Total Orders</span>
          <span className={shared.statValue}>{totalOrders}</span>
        </div>
        <div className={shared.statItem}>
          <span className={shared.statLabel}>Total Spent</span>
          <span className={shared.statValue}>{formatCurrency(totalSpent)}</span>
        </div>
        <div className={shared.statItem}>
          <span className={shared.statLabel}>Total Savings</span>
          <span className={`${shared.statValue} ${styles.statSavings}`}>
            {formatCurrency(totalSavings)}
          </span>
        </div>
      </div>
    </div>
  );
}
