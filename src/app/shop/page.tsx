import { Suspense } from "react";
import { ShopClient } from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <Suspense>
      <ShopClient />
    </Suspense>
  );
}
