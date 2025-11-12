import shared from "@/app/styles/shared.module.css";
import DiscountList from "./components/DiscountList";

export default function DiscountsPage() {
  return (
    <div className={shared.page}>
      <div className={shared.container}>
        <h1 className={shared.pageTitle}>Discount Codes</h1>
        <DiscountList />
      </div>
    </div>
  );
}
