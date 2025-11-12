import { Discount } from "./discount";

export interface APIError {
  status: "success" | "error";
  data: Discount | null;
  message: string;
}
