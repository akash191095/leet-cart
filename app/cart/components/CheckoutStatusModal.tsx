import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutStatusModal() {
  return (
    <DialogContent showCloseButton className="h-96">
      <DialogHeader>
        <DialogTitle>Order placed successfully!</DialogTitle>
        <DialogDescription className="flex justify-center items-center flex-col flex-1 gap-4">
          <CheckCircle2 color="green" size={140} strokeWidth={1} />
          <span className="text-2xl text-white">
            You are now even more secured!
          </span>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
