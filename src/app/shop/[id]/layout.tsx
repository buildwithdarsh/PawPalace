import type { Metadata } from "next"
import { shops } from "@/lib/mock-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const shop = shops.find((s) => s.id === id)

  if (!shop) {
    return { title: "Shop Not Found" }
  }

  return {
    title: `${shop.name} - Pet Shop in ${shop.address.split(",").pop()?.trim() || "Bangalore"}`,
    description: shop.description.slice(0, 160),
    alternates: { canonical: `/shop/${shop.id}` },
    openGraph: {
      title: shop.name,
      description: shop.description.slice(0, 160),
      images: [{ url: shop.coverImageUrl, alt: shop.name }],
      type: "website",
    },
  }
}

export default function ShopDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
