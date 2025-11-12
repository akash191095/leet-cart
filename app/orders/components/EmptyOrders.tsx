"use client";

import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "../orders.module.css";

export default function EmptyOrders() {
  const router = useRouter();

  return (
    <div className={styles.emptyOrders}>
      <Package className={styles.emptyIcon} />
      <h2 className={styles.emptyTitle}>No Orders Yet</h2>
      <p className={styles.emptyDescription}>
        You haven&apos;t placed any orders. Start shopping to see your order
        history here!
      </p>
      <Button
        onClick={() => router.push("/")}
        size="lg"
        className={styles.shopButton}
      >
        Start Shopping
      </Button>
    </div>
  );
}
