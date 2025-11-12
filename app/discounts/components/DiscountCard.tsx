import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Discount } from "@/types/discount";
import styles from "../discounts.module.css";

interface DiscountCardProps {
  discount: Discount;
}

export default function DiscountCard({ discount }: DiscountCardProps) {
  const createdDate = new Date(discount.id).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      variant="secondary"
      className={`${styles.discountCard} ${!discount.isAvailable ? "opacity-60" : ""}`}
    >
      <div className={styles.cardContent}>
        <div className={styles.codeSection}>
          <p className={styles.codeLabel}>Discount Code</p>
          <p className={styles.code}>{discount.code}</p>
        </div>

        <div className={styles.discountSection}>
          <div>
            <p className={styles.discountLabel}>Discount</p>
            <div className="flex items-baseline gap-1">
              <span className={styles.discountValue}>{discount.percentage}</span>
              <span className={styles.discountPercentage}>% OFF</span>
            </div>
          </div>

          <Badge variant={discount.isAvailable ? "success" : "secondary"}>
            {discount.isAvailable ? "Active" : "Used"}
          </Badge>
        </div>

        <p className="text-xs text-gray-500 mt-4">Created on {createdDate}</p>
      </div>
    </Card>
  );
}
