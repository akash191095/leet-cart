"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCart from "@/app/hooks/useCart";
import { toast } from "sonner";
import { APIError } from "@/types/common";
import styles from "../discounts.module.css";

interface CreateDiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateDiscountDialog({
  open,
  onOpenChange,
}: CreateDiscountDialogProps) {
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [loading, setLoading] = useState(false);

  const { requestDiscountCode } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!code.trim()) {
      toast.error("Discount code is required");
      return;
    }

    if (!percentage || isNaN(Number(percentage))) {
      toast.error("Valid percentage is required");
      return;
    }

    const percentageNum = Number(percentage);
    if (percentageNum < 0 || percentageNum > 100) {
      toast.error("Percentage must be between 0 and 100");
      return;
    }

    setLoading(true);

    try {
      await requestDiscountCode({
        code: code.trim(),
        percentage: percentageNum,
      });

      toast.success("Discount code created successfully!");
      setCode("");
      setPercentage("");
      onOpenChange(false);
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Failed to create discount");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Discount</DialogTitle>
          <DialogDescription>
            Create a discount code that customers can use during checkout.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className={styles.dialogContent}>
          <div className={styles.formField}>
            <Label htmlFor="code">Discount Code</Label>
            <Input
              id="code"
              placeholder="e.g., SAVE20"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={styles.input}
              maxLength={50}
            />
          </div>

          <div className={styles.formField}>
            <Label htmlFor="percentage">Discount Percentage</Label>
            <Input
              id="percentage"
              type="number"
              placeholder="e.g., 20"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className={styles.input}
              min="1"
              max="100"
              step="1"
            />
          </div>

          <div className={styles.dialogFooter}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Discount"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
