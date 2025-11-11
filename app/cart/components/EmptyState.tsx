import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import styles from "../cart.module.css";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className={styles.emptyCart}>
      <ShoppingBag className={styles.emptyIcon} />
      <h2 className={styles.emptyTitle}>Your cart is empty</h2>
      <p className={styles.emptyDescription}>
        Add some products to get started!
      </p>
      <Button asChild size="lg" className={styles.shopButton}>
        <Link href="/">Browse Products</Link>
      </Button>
    </div>
  );
}
