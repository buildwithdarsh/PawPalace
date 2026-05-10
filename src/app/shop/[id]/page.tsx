"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Star, MapPin, Clock, Phone, Heart, Truck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { shops, products } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isLoading = useLoading(pageLoadDelay)
  const shop = shops.find((s) => s.id === id)

  if (isLoading) return <PageSkeleton />
  if (!shop) return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Shop not found</h1>
      <Button variant="outline" className="mt-4" asChild><Link href="/shop">Browse Shops</Link></Button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/shop"><ArrowLeft className="mr-1 size-4" /> Back to Shop</Link>
      </Button>

      {/* Cover image */}
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-muted mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shop.coverImageUrl} alt={shop.name} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold">{shop.name}</h1>
              <p className="mt-1 text-sm opacity-90 flex items-center gap-1"><MapPin className="size-3" />{shop.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={shop.isOpen ? "bg-green-600" : "bg-red-600"}>
                {shop.isOpen ? "Open" : "Closed"}
              </Badge>
              <Button variant="secondary" size="sm"><Heart className="mr-1 size-3" /> {shop.isFavorite ? "Saved" : "Save"}</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Info */}
          <Card>
            <CardContent className="p-5">
              <p className="text-sm">{shop.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-2"><Star className="size-4 fill-amber-400 text-amber-400" /><div><p className="text-sm font-bold">{shop.rating}</p><p className="text-xs text-muted-foreground">{shop.reviewCount} reviews</p></div></div>
                <div className="flex items-center gap-2"><MapPin className="size-4 text-muted-foreground" /><div><p className="text-sm font-medium">{shop.distance}km</p><p className="text-xs text-muted-foreground">away</p></div></div>
                <div className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /><div><p className="text-sm font-medium">{shop.openingHours}</p><p className="text-xs text-muted-foreground">Hours</p></div></div>
                <div className="flex items-center gap-2"><Truck className="size-4 text-muted-foreground" /><div><p className="text-sm font-medium">{shop.deliveryEta}</p><p className="text-xs text-muted-foreground">Delivery</p></div></div>
              </div>
            </CardContent>
          </Card>

          {/* Products from this shop */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Products</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {products.slice(0, 6).map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                    <div className="flex">
                      <div className="w-24 shrink-0 overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.imageUrl} alt={product.name} className="size-full object-cover" />
                      </div>
                      <CardContent className="flex-1 p-3">
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs">{product.rating}</span>
                        </div>
                        <p className="mt-1 text-sm font-bold">{formatPrice(product.price)}</p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-medium">Contact</h3>
              <Button className="w-full gap-1" asChild><a href={`tel:${shop.phone}`}><Phone className="size-4" /> Call Shop</a></Button>
              <Button variant="outline" className="w-full">Get Directions</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Services Available</h3>
              <div className="flex flex-wrap gap-1">
                {shop.services.map((s) => <Badge key={s} variant="secondary" className="capitalize">{s}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Brands Stocked</h3>
              <div className="flex flex-wrap gap-1">
                {shop.brands.map((b) => <Badge key={b} variant="outline">{b}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Pet Types Served</h3>
              <div className="flex flex-wrap gap-1">
                {shop.petTypes.map((pt) => <Badge key={pt} variant="outline" className="capitalize">{pt}</Badge>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
