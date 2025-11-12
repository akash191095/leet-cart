"use client";

import { formatCurrency } from "@/lib/utils";
import styles from "../orders.module.css";
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
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Orders</span>
          <span className={styles.statValue}>{totalOrders}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Spent</span>
          <span className={styles.statValue}>{formatCurrency(totalSpent)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Savings</span>
          <span className={`${styles.statValue} ${styles.statSavings}`}>
            {formatCurrency(totalSavings)}
          </span>
        </div>
      </div>
    </div>
  );
}
