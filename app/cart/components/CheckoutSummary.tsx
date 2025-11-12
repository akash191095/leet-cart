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
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import useCart from "@/app/hooks/useCart";
import CheckoutStatusModal from "./CheckoutStatusModal";
import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { APIError } from "@/types/common";
import { TAX_PERCENTAGE } from "@/lib/consts";

export default function CheckoutSummary() {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const resetCart = useCartStore((state) => state.resetCart);
  const { handleCheckout } = useCart();

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

  const tax = subtotal * (TAX_PERCENTAGE / 100); // 10% tax
  const total = subtotal + tax;

  async function onCheckoutClick() {
    try {
      setLoading(true);
      await handleCheckout({
        cartItems: items,
      });
      resetCart();
      setIsDialogOpen(true);
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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
            disabled={items.length === 0 || loading}
            onClick={onCheckoutClick}
          >
            {loading ? "Checking Out..." : "Proceed to Checkout"}
          </Button>
          <Button variant="outline" asChild className={styles.continueButton}>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
      <Dialog
        open={isDialogOpen}
        onOpenChange={async (value) => {
          if (value === false) {
            await router.push("/");
            setIsDialogOpen(false);
          }
        }}
      >
        <CheckoutStatusModal />
      </Dialog>
    </div>
  );
}
