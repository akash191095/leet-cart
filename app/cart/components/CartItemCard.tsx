import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "../cart.module.css";
import { Product } from "@/types/product";
import useCart from "@/app/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

interface CartItemCardProps {
  item: {
    productId: string;
    quantity: number;
    product: Product;
  };
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { handleDecrement, handleIncrement, handleRemove } = useCart();

  return (
    <Card key={item.productId} className={styles.cartItem}>
      <CardContent className={styles.itemContent}>
        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>{item.product.name}</h3>
          <p className={styles.itemDescription}>{item.product.description}</p>
          <p className={styles.itemPrice}>${item.product.price}/month</p>
        </div>

        <div className={styles.itemActions}>
          <div className={styles.quantityControl}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDecrement(item.productId, item.quantity)}
              className={styles.quantityButton}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className={styles.quantity}>{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleIncrement(item.productId, item.quantity)}
              className={styles.quantityButton}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className={styles.itemTotal}>
            <span className={styles.totalAmount}>
              {formatCurrency(item.product.price * item.quantity)}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemove(item.productId)}
            className={styles.removeButton}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
