"use client";

import styles from "../cart.module.css";
import useCartStore from "@/store/useCartStore";
import { useMemo } from "react";
import { products } from "@/lib/products";
import CartItemCard from "./CartItemCard";
import EmptyState from "./EmptyState";

export default function CartItemList() {
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

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.cartItems}>
      {cartItems.map((item) => {
        if (!item.product) return null;
        return <CartItemCard key={item.productId} item={item} />;
      })}
    </div>
  );
}
