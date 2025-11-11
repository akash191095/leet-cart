import { expect, test } from "vitest";
import Page from "../app/page";
import { render, screen } from "./utils";

test("Page", () => {
  render(<Page />);
  expect(screen.getByText("Hi")).toBeDefined();
});
