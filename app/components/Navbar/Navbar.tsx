"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import styles from "./navbar.module.css";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Button variant="transparent" component={Link} href="/">
            <div className={styles.logoSection}>
              <ShoppingCart className="w-6 h-6 text-white" strokeWidth={1.5} />
              <span className={styles.logoText}>Leet Cart</span>
            </div>
          </Button>

          <div className={styles.navLinks}>
            <Button
              variant="transparent"
              component={Link}
              href="/products"
              color="white"
            >
              Products
            </Button>
          </div>

          <Button
            variant="transparent"
            color="white"
            onClick={() => setCartCount((prev) => prev + 1)}
            classNames={{
              root: "min-h-12",
            }}
          >
            <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
            <span className={styles.badge}>
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
