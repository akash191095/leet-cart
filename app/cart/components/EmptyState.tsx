import EmptyStateComponent from "@/app/components/EmptyState";
import { ShoppingBag } from "lucide-react";

export default function EmptyState() {
  return (
    <EmptyStateComponent
      icon={ShoppingBag}
      title="Your cart is empty"
      description="Add some products to get started!"
      action={{
        label: "Browse Products",
        href: "/",
      }}
    />
  );
}
