"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import useCart from "@/app/hooks/useCart";
import { cn } from "@/lib/utils";

interface QuantityControlProps {
  productId: string;
  quantity: number;
  variant?: "default" | "outline";
  className?: string;
  buttonClassName?: string;
  quantityClassName?: string;
}

export default function QuantityControl({
  productId,
  quantity,
  variant = "outline",
  className,
  buttonClassName,
  quantityClassName,
}: QuantityControlProps) {
  const { handleDecrement, handleIncrement } = useCart();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant={variant}
        size="icon"
        onClick={() => handleDecrement(productId, quantity)}
        className={buttonClassName}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className={quantityClassName}>{quantity}</span>
      <Button
        variant={variant}
        size="icon"
        onClick={() => handleIncrement(productId, quantity)}
        className={buttonClassName}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
