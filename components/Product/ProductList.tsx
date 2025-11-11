import { products } from "@/app/utils/products";
import styles from "./productList.module.css";
import Product from "./Product";

export default function ProductList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose Your Health Insurance Plan</h1>
        <p className={styles.subtitle}>
          Find the perfect coverage that fits your needs and budget
        </p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
