"use client";

import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import styles from "./navbar.module.css";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useCartStore, { selectCartCount } from "@/store/useCartStore";

const menu = [
  {
    label: "Orders",
    href: "/orders",
  },
  {
    label: "Discounts",
    href: "/discounts",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore(selectCartCount);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <Button variant="secondary" asChild className="relative -left-4">
              <Link href="/">
                <div className={styles.logoSection}>
                  <span className={styles.logoText}>Leet Cart</span>
                </div>
              </Link>
            </Button>

            <div className={styles.navLinks}>
              {menu.map(({ label, href }) => (
                <Button key={href} variant="secondary" color="white" asChild>
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </div>

            <Button variant="secondary" className={styles.cartButton} asChild>
              <Link href="/cart">
                <ShoppingCart className="min-w-6 min-h-6" strokeWidth={1.5} />
                <Badge className={styles.badge} variant="default">
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              </Link>
            </Button>
            <Button
              variant="secondary"
              className={styles.hamMenuButton}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="min-w-6 min-h-6" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Slide-out Menu */}
      <div
        className={clsx(styles.slideMenu, isMenuOpen && styles.slideMenuOpen)}
      >
        <div className={styles.slideMenuHeader}>
          <span className={styles.slideMenuTitle}>Menu</span>
          <Button
            variant="secondary"
            color="gray"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </Button>
        </div>

        <div className={styles.slideMenuContent}>
          {menu.map(({ label, href }) => (
            <Button
              key={href + "-mobile"}
              variant="secondary"
              asChild
              onClick={() => setIsMenuOpen(false)}
              className={styles.slideMenuItem}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
