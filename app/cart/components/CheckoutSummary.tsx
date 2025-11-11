"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import styles from "../cart.module.css";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { useMemo } from "react";
import { products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutSummary() {
  const items = useCartStore((state) => state.items);

  // Get full product details for cart items
  const cartItems = useMemo(() => {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        product,
      };
    });
  }, [items]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }, [cartItems]);

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className={styles.checkoutSection}>
      <Card className={styles.checkoutCard}>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className={styles.checkoutContent}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (10%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryRow + " " + styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalPrice}>${total.toFixed(2)}/month</span>
          </div>
        </CardContent>
        <CardFooter className={styles.checkoutFooter}>
          <Button
            size="lg"
            className={styles.checkoutButton}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
          <Button variant="outline" asChild className={styles.continueButton}>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
