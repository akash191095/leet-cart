"use client";

import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import styles from "./navbar.module.css";
import { Button } from "@mantine/core";
import Link from "next/link";
import clsx from "clsx";
import useCartStore from "@/app/store/useCartStore";

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
            <Button variant="transparent" component={Link} href="/">
              <div className={styles.logoSection}>
                <ShoppingCart
                  className="w-6 h-6 text-white"
                  strokeWidth={1.5}
                />
                <span className={styles.logoText}>Leet Cart</span>
              </div>
            </Button>

            <div className={styles.navLinks}>
              {menu.map(({ label, href }) => (
                <Button
                  key={href}
                  variant="transparent"
                  component={Link}
                  href={href}
                  color="white"
                >
                  {label}
                </Button>
              ))}
            </div>

            <Button
              variant="transparent"
              color="white"
              classNames={{
                root: styles.cartButton,
              }}
            >
              <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
              <span className={styles.badge}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            </Button>
            <Button
              variant="transparent"
              color="white"
              className={styles.hamMenuButton}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
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
            variant="transparent"
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
              variant="subtle"
              component={Link}
              href={href}
              classNames={{ root: styles.slideMenuItem }}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
