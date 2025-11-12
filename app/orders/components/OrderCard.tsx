"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { products } from "@/lib/products";
import styles from "../orders.module.css";
import { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderDate = new Date(order.createdOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const finalAmount = order.totalAmount - order.discountAmount;

  // Get product details for each cart item
  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || "Unknown Product";
  };

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderInfo}>
          <h3 className={styles.orderId}>Order #{order.id}</h3>
          <p className={styles.orderDate}>{orderDate}</p>
        </div>
        {order.discount && (
          <div className={styles.orderBadges}>
            <Badge className={styles.discountBadge}>
              {order.discount.percentage}% Off Applied
            </Badge>
          </div>
        )}
      </div>

      <div className={styles.orderContent}>
        <div className={styles.orderItems}>
          {order.cartItems.map((item, index) => (
            <div key={index} className={styles.orderItem}>
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>
                  {getProductName(item.productId)}
                </p>
                <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
              </div>
              <div className={styles.itemPrice}>
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.orderSummary}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal</span>
            <span className={styles.summaryValue}>
              {formatCurrency(order.totalAmount)}
            </span>
          </div>

          {order.discount && (
            <div className={`${styles.summaryRow} ${styles.discountRow}`}>
              <span className={styles.summaryLabel}>
                Discount{" "}
                <span className={styles.discountCode}>
                  {order.discount.code}
                </span>
              </span>
              <span className={styles.summaryValue}>
                -{formatCurrency(order.discountAmount)}
              </span>
            </div>
          )}

          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total Paid</span>
            <span className={styles.totalAmount}>
              {formatCurrency(finalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
