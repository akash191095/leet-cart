import { beforeEach, describe, expect, test } from "vitest";
import Page from "../app/page";
import { render, screen } from "./utils";
import { products } from "@/lib/products";
import userEvent from "@testing-library/user-event";
import useCartStore from "@/store/useCartStore";

describe("Home Page", () => {
  describe("Rendering", () => {
    test("displays main heading", () => {
      render(<Page />);
      expect(
        screen.getByText("Choose Your Health Insurance Plan")
      ).toBeDefined();
    });

    test("displays subtitle text", () => {
      render(<Page />);
      expect(
        screen.getByText(
          "Find the perfect coverage that fits your needs and budget"
        )
      ).toBeDefined();
    });

    test("renders all 10 product cards", () => {
      render(<Page />);
      const productCards = screen.getAllByTestId(/^product-/);
      expect(productCards).toHaveLength(10);
    });
  });

  describe("Product Display", () => {
    test("shows correct product name", () => {
      render(<Page />);
      expect(screen.getByText("Basic Individual Plan")).toBeDefined();
    });

    test("displays product prices correctly", () => {
      render(<Page />);

      products.forEach((product) => {
        const priceElements = screen.getAllByText(product.price.toString());
        expect(priceElements.length).toBeGreaterThan(0);
      });
    });

    test("shows product descriptions", () => {
      render(<Page />);

      expect(
        screen.getByText(
          /Essential coverage for individuals seeking basic medical protection/
        )
      ).toBeDefined();
    });

    test('renders "Add to Cart" buttons for all products', () => {
      render(<Page />);

      const addToCartButtons = screen.getAllByRole("button", {
        name: /add to cart/i,
      });
      expect(addToCartButtons).toHaveLength(10);
    });
  });

  describe("Product Features", () => {
    test("displays features list for products", () => {
      render(<Page />);

      // Test a few specific features from different products
      expect(screen.getByText("Annual health checkup")).toBeDefined();
      expect(screen.getByText("Covers up to 6 family members")).toBeDefined();
      expect(screen.getByText("Nationwide provider network")).toBeDefined();
      expect(screen.getByText("Chronic disease management")).toBeDefined();
    });

    test("shows coverage information", () => {
      render(<Page />);

      // Check that coverage labels are present
      const maxCoverageLabels = screen.getAllByText("Max Coverage");
      const deductibleLabels = screen.getAllByText("Deductible");
      const coinsuranceLabels = screen.getAllByText("Coinsurance");

      expect(maxCoverageLabels).toHaveLength(10);
      expect(deductibleLabels).toHaveLength(10);
      expect(coinsuranceLabels).toHaveLength(10);
    });

    test("displays formatted coverage values", () => {
      render(<Page />);

      // Test specific coverage values (formatCurrency adds .00)
      expect(screen.getByText("$50,000.00")).toBeDefined(); // Basic Individual max coverage
      expect(screen.getByText("$250,000.00")).toBeDefined(); // Family Plus max coverage
      expect(screen.getByText("$2,000.00")).toBeDefined(); // Basic Individual deductible
    });
  });

  describe("Interactions", () => {
    beforeEach(() => {
      // Reset cart before each test
      useCartStore.setState({ items: [] });
    });

    test('"Add to Cart" buttons are enabled', () => {
      render(<Page />);

      const addToCartButtons = screen.getAllByRole("button", {
        name: /add to cart/i,
      });

      addToCartButtons.forEach((button) => {
        expect(button.hasAttribute("disabled")).toBe(false);
      });
    });

    test("clicking Add to Cart shows quantity controls", async () => {
      const user = userEvent.setup();
      render(<Page />);

      // Find the first product's Add to Cart button
      const addToCartButtons = screen.getAllByRole("button", {
        name: /add to cart/i,
      });
      const firstButton = addToCartButtons[0];

      // Click Add to Cart
      await user.click(firstButton);

      // Verify quantity controls appear
      const productCard = screen.getByTestId("product-basic-individual");
      expect(productCard.textContent).toContain("1");

      // Verify increment and decrement buttons exist
      const incrementButtons = screen.getAllByRole("button", { name: /\+/i });
      const decrementButtons = screen.getAllByRole("button", { name: /\-/i });
      expect(incrementButtons.length).toBeGreaterThan(0);
      expect(decrementButtons.length).toBeGreaterThan(0);
    });

    test("increment button increases quantity", async () => {
      const user = userEvent.setup();
      render(<Page />);

      // Add first product to cart
      const addToCartButtons = screen.getAllByRole("button", {
        name: /add to cart/i,
      });
      await user.click(addToCartButtons[0]);

      // Get the product card and find its increment button
      const productCard = screen.getByTestId("product-basic-individual");
      const incrementButton = productCard.querySelector(
        'button[aria-label="+"]'
      );
      expect(incrementButton).toBeTruthy();

      // Click increment button
      await user.click(incrementButton!);

      // Verify quantity increased to 2
      expect(productCard.textContent).toContain("2");

      // Click increment again
      await user.click(incrementButton!);

      // Verify quantity increased to 3
      expect(productCard.textContent).toContain("3");
    });

    test("decrement button decreases quantity", async () => {
      const user = userEvent.setup();
      render(<Page />);

      // Add first product to cart
      const addToCartButtons = screen.getAllByRole("button", {
        name: /add to cart/i,
      });
      await user.click(addToCartButtons[0]);

      // Get buttons
      const productCard = screen.getByTestId("product-basic-individual");
      const incrementButton = productCard.querySelector(
        'button[aria-label="+"]'
      );
      const decrementButton = productCard.querySelector(
        'button[aria-label="-"]'
      );

      // Increment to quantity 2
      await user.click(incrementButton!);
      expect(productCard.textContent).toContain("2");

      // Decrement back to 1
      await user.click(decrementButton!);
      expect(productCard.textContent).toContain("1");
    });

    test("decrement at quantity 1 removes item and shows Add to Cart button", async () => {
      const user = userEvent.setup();
      render(<Page />);

      // Add first product to cart
      const addToCartButtons = screen.getAllByRole("button", {
        name: /add to cart/i,
      });
      const firstAddToCartButton = addToCartButtons[0];
      await user.click(firstAddToCartButton);

      // Verify item is in cart
      const productCard = screen.getByTestId("product-basic-individual");
      expect(productCard.textContent).toContain("1");

      // Get decrement button and click it
      const decrementButton = productCard.querySelector(
        'button[aria-label="-"]'
      );
      await user.click(decrementButton!);

      // Verify Add to Cart button is back
      const addToCartButton = screen.getAllByRole("button", {
        name: /add to cart/i,
      });
      expect(addToCartButton.length).toBe(10); // All 10 products should have Add to Cart again
    });
  });
});
