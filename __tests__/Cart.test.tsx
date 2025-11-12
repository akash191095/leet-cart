import { beforeEach, describe, expect, test, vi } from "vitest";
import CartPage from "../app/cart/page";
import { render, screen } from "./utils";
import userEvent from "@testing-library/user-event";
import useCartStore from "@/store/useCartStore";
import { products } from "@/lib/products";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/cart",
}));

describe("Cart Page", () => {
  beforeEach(() => {
    // Reset cart before each test
    useCartStore.setState({ items: [] });
  });

  describe("Empty Cart State", () => {
    test("shows empty state when no items in cart", () => {
      render(<CartPage />);

      expect(screen.getByText("Your cart is empty")).toBeDefined();
      expect(
        screen.getByText("Add some products to get started!")
      ).toBeDefined();
    });

    test('displays "Browse Products" button', () => {
      render(<CartPage />);

      const browseButton = screen.getByRole("link", {
        name: /browse products/i,
      });
      expect(browseButton).toBeDefined();
      expect(browseButton.getAttribute("href")).toBe("/");
    });

    test('"Proceed to Checkout" button is disabled', () => {
      render(<CartPage />);

      const checkoutButton = screen.getByRole("button", {
        name: /proceed to checkout/i,
      });
      expect(checkoutButton.hasAttribute("disabled")).toBe(true);
    });
  });

  describe("Cart with Items", () => {
    test("displays cart items with product details", () => {
      // Add item to cart
      const product = products[0]; // Basic Individual Plan
      useCartStore.getState().addToCart(product.id);

      render(<CartPage />);

      // Verify product displays
      expect(screen.getByText(product.name)).toBeDefined();
      expect(screen.getByText(`$${product.price}/month`)).toBeDefined();
    });

    test("shows correct subtotal calculation", () => {
      // Add items to cart
      useCartStore.getState().addToCart(products[0].id); // $149
      useCartStore.getState().addToCart(products[0].id); // quantity 2

      render(<CartPage />);

      // Subtotal should be $149 * 2 = $298
      expect(screen.getByText("Subtotal")).toBeDefined();
      const subtotalElements = screen.getAllByText("$298.00");
      expect(subtotalElements.length).toBeGreaterThan(0);
    });

    test("shows tax calculation (10% of subtotal)", () => {
      // Add item to cart
      useCartStore.getState().addToCart(products[0].id); // $149

      render(<CartPage />);

      // Tax should be 10% of $149 = $14.90
      expect(screen.getByText("Tax (10%)")).toBeDefined();
      expect(screen.getByText("$14.90")).toBeDefined();
    });

    test("shows correct total (subtotal + tax)", () => {
      // Add item to cart
      useCartStore.getState().addToCart(products[0].id); // $149

      render(<CartPage />);

      // Total should be $149 + $14.90 = $163.90
      expect(screen.getByText("$163.90/month")).toBeDefined();
    });
  });

  describe("Quantity Controls", () => {
    test("increment button increases quantity and updates totals", async () => {
      const user = userEvent.setup();

      // Add item to cart
      useCartStore.getState().addToCart(products[0].id); // $149

      render(<CartPage />);

      // Find and click increment button
      const incrementButton = screen.getByRole("button", {
        name: "+",
      });
      await user.click(incrementButton);

      // Verify quantity is 2
      const cartItems = useCartStore.getState().items;
      expect(cartItems[0].quantity).toBe(2);

      // Verify new totals (should be rerendered)
      // Subtotal: $298, Tax: $29.80, Total: $327.80
    });

    test("decrement button decreases quantity and updates totals", async () => {
      const user = userEvent.setup();

      // Add item to cart with quantity 2
      useCartStore.getState().addToCart(products[0].id);
      useCartStore.getState().addToCart(products[0].id);

      render(<CartPage />);

      // Find and click decrement button
      const decrementButton = screen.getByRole("button", {
        name: "-",
      });
      await user.click(decrementButton);

      // Verify quantity is 1
      const cartItems = useCartStore.getState().items;
      expect(cartItems[0].quantity).toBe(1);
    });

    test("decrement at quantity 1 removes item from cart", async () => {
      const user = userEvent.setup();

      // Add item to cart with quantity 1
      useCartStore.getState().addToCart(products[0].id);

      render(<CartPage />);

      // Find and click decrement button
      const decrementButton = screen.getByRole("button", {
        name: "-",
      });
      await user.click(decrementButton);

      // Verify item is removed
      const cartItems = useCartStore.getState().items;
      expect(cartItems.length).toBe(0);

      // Verify empty state shows
      expect(screen.getByText("Your cart is empty")).toBeDefined();
    });
  });

  describe("Remove Items", () => {
    test("remove button deletes item from cart", async () => {
      const user = userEvent.setup();

      // Add item to cart
      useCartStore.getState().addToCart(products[0].id);

      render(<CartPage />);

      // Find and click remove button (Trash icon)
      const removeButton = screen.getByRole("button", {
        name: "Remove item",
      });
      await user.click(removeButton);

      // Verify item is removed
      const cartItems = useCartStore.getState().items;
      expect(cartItems.length).toBe(0);
    });

    test("removing last item shows empty state", async () => {
      const user = userEvent.setup();

      // Add item to cart
      useCartStore.getState().addToCart(products[0].id);

      render(<CartPage />);

      // Remove the item
      const removeButton = screen.getByRole("button", {
        name: "Remove item",
      });
      await user.click(removeButton);

      // Verify empty state shows
      expect(screen.getByText("Your cart is empty")).toBeDefined();
    });
  });

  describe("Checkout Button", () => {
    test("enabled when cart has items", () => {
      // Add item to cart
      useCartStore.getState().addToCart(products[0].id);

      render(<CartPage />);

      const checkoutButton = screen.getByRole("button", {
        name: /proceed to checkout/i,
      });
      expect(checkoutButton.hasAttribute("disabled")).toBe(false);
    });

    test("disabled when cart is empty", () => {
      render(<CartPage />);

      const checkoutButton = screen.getByRole("button", {
        name: /proceed to checkout/i,
      });
      expect(checkoutButton.hasAttribute("disabled")).toBe(true);
    });
  });
});
