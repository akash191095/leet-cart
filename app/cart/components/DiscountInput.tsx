"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useOrderStore from "@/store/useOrderStore";
import { Discount } from "@/types/discount";

interface DiscountInputProps {
  onDiscountApply: (discount: Discount | null) => void;
  className?: string;
}

export default function DiscountInput({
  onDiscountApply,
  className,
}: DiscountInputProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const discounts = useOrderStore((state) => state.discounts);

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code");
      return;
    }

    const discount = discounts.find(
      (d) => d.code.toLowerCase() === discountCode.trim().toLowerCase()
    );

    if (!discount) {
      toast.error("Invalid discount code");
      return;
    }

    if (!discount.isAvailable) {
      toast.error("This discount code has already been used");
      return;
    }

    setAppliedDiscount(discount);
    onDiscountApply(discount);
    toast.success(`${discount.percentage}% discount applied!`);
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    onDiscountApply(null);
    toast.success("Discount removed");
  };

  return (
    <div className={className}>
      {!appliedDiscount ? (
        <div className="flex flex-col gap-2">
          <Label htmlFor="discountCode" className="text-gray-300">
            Discount Code
          </Label>
          <div className="flex gap-2">
            <Input
              id="discountCode"
              placeholder="Enter code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyDiscount();
              }}
              className="bg-secondary border-purple-900 text-gray-100"
            />
            <Button
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim()}
            >
              Apply
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-400">
              Code: {appliedDiscount.code}
            </span>
            <span className="text-xs text-gray-400">
              ({appliedDiscount.percentage}% off)
            </span>
          </div>
          <Button
            onClick={handleRemoveDiscount}
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
