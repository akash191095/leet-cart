import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import styles from "../cart.module.css";
import { Product } from "@/types/product";
import useCart from "@/app/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import QuantityControl from "@/app/components/QuantityControl";

interface CartItemCardProps {
  item: {
    productId: string;
    quantity: number;
    product: Product;
  };
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { handleRemove } = useCart();

  return (
    <Card key={item.productId} className={styles.cartItem}>
      <CardContent className={styles.itemContent}>
        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>{item.product.name}</h3>
          <p className={styles.itemDescription}>{item.product.description}</p>
          <p className={styles.itemPrice}>${item.product.price}/month</p>
        </div>

        <div className={styles.itemActions}>
          <QuantityControl
            productId={item.productId}
            quantity={item.quantity}
            variant="outline"
            className={styles.quantityControl}
            buttonClassName={styles.quantityButton}
            quantityClassName={styles.quantity}
          />

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
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
