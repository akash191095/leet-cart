"use client";

import styles from "./product.module.css";
import { Product as ProductType } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Shield,
  Users,
  Award,
  Heart,
  AlertCircle,
  Star,
  GraduationCap,
  Eye,
  Baby,
  Activity,
  Check,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import useCart from "@/app/hooks/useCart";

interface ProductProps {
  product: ProductType;
}

const iconMap = {
  Shield,
  Users,
  Award,
  Heart,
  AlertCircle,
  Star,
  GraduationCap,
  Eye,
  Baby,
  Activity,
};

export default function Product({ product }: ProductProps) {
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.productId === product.id)
  );

  const { handleDecrement, handleIncrement, handleAddToCart } = useCart();
  const IconComponent = iconMap[product.icon as keyof typeof iconMap];
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <div className={styles.iconWrapper}>
          {IconComponent && <IconComponent className={styles.icon} />}
        </div>
        <CardTitle className={styles.title}>{product.name}</CardTitle>
        <CardDescription className={styles.description}>
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className={styles.content}>
        <div className={styles.priceSection}>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>{product.price}</span>
            <span className={styles.period}>/month</span>
          </div>
        </div>

        <div className={styles.coverageSection}>
          <h4 className={styles.coverageTitle}>Coverage Details</h4>
          <div className={styles.coverageGrid}>
            <div className={styles.coverageItem}>
              <span className={styles.coverageLabel}>Max Coverage</span>
              <span className={styles.coverageValue}>
                {formatCurrency(product.coverage.maxCoverage)}
              </span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.coverageLabel}>Deductible</span>
              <span className={styles.coverageValue}>
                {formatCurrency(product.coverage.deductible)}
              </span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.coverageLabel}>Coinsurance</span>
              <span className={styles.coverageValue}>
                {formatCurrency(product.coverage.coinsurance)}%
              </span>
            </div>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <h4 className={styles.featuresTitle}>Key Features</h4>
          <ul className={styles.featuresList}>
            {product.features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <Check className={styles.checkIcon} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className={styles.footer}>
        {cartItem ? (
          <div className={styles.quantitySelector}>
            <Button
              onClick={() => handleDecrement(product.id, cartItem.quantity)}
              variant="default"
              size="icon"
              className={styles.quantityButton}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className={styles.quantity}>{cartItem.quantity}</span>
            <Button
              onClick={() => handleIncrement(product.id, cartItem.quantity)}
              variant="default"
              size="icon"
              className={styles.quantityButton}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleAddToCart(product.id)}
            className={styles.button}
            size="lg"
          >
            <ShoppingCart className={styles.buttonIcon} />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
