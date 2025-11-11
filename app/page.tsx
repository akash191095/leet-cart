"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";

export default function Home() {
  const cartCount = useCartStore((state) => state.count);
  const increment = useCartStore((state) => state.increment);

  return (
    <div>
      <Button onClick={increment}>{cartCount}</Button>
    </div>
  );
}
