import EmptyState from "@/app/components/EmptyState";
import { Package } from "lucide-react";

export default function EmptyOrders() {
  return (
    <EmptyState
      icon={Package}
      title="No Orders Yet"
      description="You haven't placed any orders. Start shopping to see your order history here!"
      action={{
        label: "Start Shopping",
        href: "/",
      }}
    />
  );
}
