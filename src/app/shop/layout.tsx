import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Shop - Food, Toys & Accessories for Dogs, Cats & More",
  description:
    "Browse 10,000+ vet-approved pet products. Dog food, cat treats, toys, accessories, and health supplements with same-day delivery in Bangalore.",
  alternates: { canonical: "/shop" },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
