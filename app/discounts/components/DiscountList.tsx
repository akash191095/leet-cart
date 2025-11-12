"use client";

import { useState } from "react";
import useOrderStore from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import DiscountCard from "./DiscountCard";
import CreateDiscountDialog from "./CreateDiscountDialog";
import EmptyState from "@/app/components/EmptyState";
import styles from "../discounts.module.css";

export default function DiscountList() {
  const discounts = useOrderStore((state) => state.discounts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        {discounts.length > 0 ? (
          <p className="text-gray-400">
            {discounts.length} discount{discounts.length !== 1 ? "s" : ""}{" "}
            created
          </p>
        ) : (
          <div></div>
        )}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className={styles.createButton}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Discount
        </Button>
      </div>

      {discounts.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="No Discount Codes Yet"
          description="Create discount codes to offer savings to your customers!"
        />
      ) : (
        <div className={styles.discountsList}>
          {discounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))}
        </div>
      )}

      <CreateDiscountDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
