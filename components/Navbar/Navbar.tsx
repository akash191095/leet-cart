"use client";

import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import styles from "./navbar.module.css";
import Link from "next/link";
import clsx from "clsx";
import useCartStore from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const menu = [
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.count);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <Button variant="ghost" asChild>
              <Link href="/">
                <div className={styles.logoSection}>
                  <span className={styles.logoText}>Leet Cart</span>
                </div>
              </Link>
            </Button>

            <div className={styles.navLinks}>
              {menu.map(({ label, href }) => (
                <Button key={href} variant="ghost" color="white" asChild>
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </div>

            <Button variant="ghost" className={styles.cartButton}>
              <ShoppingCart className="min-w-6 min-h-6" strokeWidth={1.5} />
              <Badge className={styles.badge} variant="default">
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            </Button>
            <Button
              variant="ghost"
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
            variant="ghost"
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
              variant="ghost"
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
