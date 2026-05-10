import type { Metadata } from "next"
import { products } from "@/lib/mock-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} by ${product.brand}`,
    description: product.description.slice(0, 160),
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: `${product.name} by ${product.brand}`,
      description: product.description.slice(0, 160),
      images: [{ url: product.imageUrl, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} by ${product.brand}`,
      description: product.description.slice(0, 160),
      images: [product.imageUrl],
    },
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children
}
