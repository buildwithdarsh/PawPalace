"use client"

import { use, useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, Clock, Minus, Plus, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { products, reviews } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isLoading = useLoading(pageLoadDelay)
  const [qty, setQty] = useState(1)
  const [isSubscription, setIsSubscription] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  const product = products.find((p) => p.id === id)

  if (isLoading) return <PageSkeleton />
  if (!product) return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Button variant="outline" className="mt-4" asChild><Link href="/shop">Back to Shop</Link></Button>
    </div>
  )

  const price = isSubscription && product.subscriptionPrice ? product.subscriptionPrice : product.price

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://pawpalace.in/product/${product.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 pb-28 md:py-8 md:pb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/shop"><ArrowLeft className="mr-1 size-4" /> Back to Shop</Link>
        </Button>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* Images - swipeable on mobile */}
          <div className="space-y-3 md:space-y-4">
            {/* Mobile: horizontal scroll gallery */}
            <div
              ref={galleryRef}
              className="-mx-4 flex snap-x snap-mandatory gap-0 overflow-x-auto md:mx-0 md:block md:overflow-visible"
            >
              {(product.images.length > 1 ? product.images : [product.imageUrl]).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square w-full shrink-0 snap-center overflow-hidden bg-muted md:aspect-[4/3] md:rounded-xl md:first:block md:[&:not(:first-child)]:hidden"
                  style={i === selectedImage ? {} : { display: undefined }}
                >
                  {/* Desktop: show only selected; Mobile: all in scroll */}
                  <div className={`size-full md:${i === selectedImage ? 'block' : 'hidden'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={product.name} className="size-full object-cover" />
                  </div>
                  {i === 0 && product.isPrescriptionRequired && <Badge className="absolute left-3 top-3 bg-amber-600">Rx Required</Badge>}
                  {i === 0 && product.isFreshFood && <Badge className="absolute left-3 top-3 bg-blue-600">Cold Chain Delivery</Badge>}
                </div>
              ))}
            </div>
            {/* Mobile gallery dots */}
            {product.images.length > 1 && (
              <div className="flex justify-center gap-1.5 md:hidden">
                {product.images.map((_, i) => (
                  <span key={i} className={`size-1.5 rounded-full ${i === selectedImage ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                ))}
              </div>
            )}
            {/* Desktop thumbnail strip */}
            {product.images.length > 1 && (
              <div className="hidden gap-2 md:flex">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`aspect-square w-20 overflow-hidden rounded-lg border-2 ${i === selectedImage ? "border-primary" : "border-transparent"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h1 className="mt-1 text-xl font-bold md:text-2xl">{product.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
                {product.inStock ? <Badge variant="secondary" className="text-green-700 dark:text-green-400">In Stock</Badge> : <Badge variant="destructive">Out of Stock</Badge>}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold md:text-3xl">{formatPrice(price * qty)}</span>
                {product.originalPrice && !isSubscription && <span className="text-base text-muted-foreground line-through md:text-lg">{formatPrice(product.originalPrice * qty)}</span>}
              </div>
              {product.subscriptionPrice && (
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <input type="checkbox" id="subscribe" checked={isSubscription} onChange={(e) => setIsSubscription(e.target.checked)} className="size-5 accent-primary md:size-4" />
                  <label htmlFor="subscribe" className="flex-1 cursor-pointer">
                    <p className="text-sm font-medium">Subscribe & Save 10%</p>
                    <p className="text-xs text-muted-foreground">Auto-delivery every 4 weeks. Skip or cancel anytime.</p>
                  </label>
                  <span className="text-sm font-bold text-primary">{formatPrice(product.subscriptionPrice)}</span>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center rounded-lg border">
                <button className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="size-4" /></button>
                <span className="min-w-[2rem] text-center text-sm font-medium">{qty}</span>
                <button className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setQty(qty + 1)}><Plus className="size-4" /></button>
              </div>
              {product.weight && <span className="text-sm text-muted-foreground">{product.weight}</span>}
            </div>

            {/* Actions - hidden on mobile (sticky bar below) */}
            <div className="hidden gap-3 md:flex">
              <Button className="flex-1 gap-2" size="lg" disabled={!product.inStock}>
                <ShoppingCart className="size-4" />
                {isSubscription ? "Subscribe Now" : "Add to Cart"}
              </Button>
              <Button variant="outline" size="lg"><Heart className="size-4" /></Button>
            </div>

            {/* Delivery info */}
            <div className="space-y-2 rounded-lg bg-muted/50 p-3 md:p-4">
              <div className="flex items-center gap-2 text-sm"><Truck className="size-4 shrink-0 text-primary" /> Free delivery for Gold members on orders above &#8377;500</div>
              <div className="flex items-center gap-2 text-sm"><Clock className="size-4 shrink-0 text-primary" /> Same-day delivery if ordered before 2 PM</div>
              <div className="flex items-center gap-2 text-sm"><Shield className="size-4 shrink-0 text-primary" /> 100% genuine products guaranteed</div>
              {product.isFreshFood && <div className="flex items-center gap-2 text-sm"><RefreshCw className="size-4 shrink-0 text-blue-600" /> Cold-chain delivery, temperature-controlled packaging</div>}
            </div>

            {product.expiryDate && (
              <p className="text-sm text-muted-foreground">Best before: {product.expiryDate}</p>
            )}
          </div>
        </div>

        {/* Tabs: Description, Nutrition, Reviews */}
        <div className="mt-8 md:mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              {product.nutritionalInfo && <TabsTrigger value="nutrition">Nutrition</TabsTrigger>}
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent className="space-y-4 p-4 md:p-6">
                  <p className="text-sm leading-relaxed">{product.description}</p>
                  {product.ingredients && (
                    <div>
                      <h4 className="font-medium mb-2">Key Ingredients</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ing) => <Badge key={ing} variant="outline">{ing}</Badge>)}
                      </div>
                    </div>
                  )}
                  {product.breedSpecific && product.breedSpecific.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Recommended For</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.breedSpecific.map((b) => <Badge key={b} variant="secondary">{b}</Badge>)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            {product.nutritionalInfo && (
              <TabsContent value="nutrition" className="mt-4">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                      {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                        <div key={key} className="rounded-lg bg-muted/50 p-3 text-center md:p-4">
                          <p className="text-xl font-bold md:text-2xl">{val}</p>
                          <p className="text-xs text-muted-foreground">{key}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-3 md:space-y-4">
                {reviews.map((rev) => (
                  <Card key={rev.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarImage src={rev.avatarUrl} alt={rev.author} />
                            <AvatarFallback>{rev.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{rev.author}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`size-3 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{rev.date}</p>
                          {rev.isVerified && <Badge variant="secondary" className="text-xs mt-1">Verified</Badge>}
                        </div>
                      </div>
                      <p className="mt-3 text-sm">{rev.content}</p>
                      {rev.images && (
                        <div className="mt-3 flex gap-2">
                          {rev.images.map((img, i) => (
                            <div key={i} className="size-16 overflow-hidden rounded-lg bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img} alt={`Review photo by ${rev.author}`} className="size-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="mt-2 text-xs text-muted-foreground">{rev.helpful} people found this helpful</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        <section className="mt-8 md:mt-12">
          <h2 className="mb-4 text-lg font-bold md:text-xl">You might also like</h2>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="w-[45vw] shrink-0 md:w-auto">
                <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                  <div className="aspect-square overflow-hidden bg-muted md:aspect-[3/2]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt={p.name} className="size-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-[11px] text-muted-foreground md:text-xs">{p.brand}</p>
                    <h3 className="line-clamp-1 text-xs font-medium md:text-sm">{p.name}</h3>
                    <p className="mt-1 text-sm font-bold">{formatPrice(p.price)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky bottom bar - mobile only */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex-1">
            <p className="text-lg font-bold">{formatPrice(price * qty)}</p>
            {product.originalPrice && !isSubscription && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice * qty)}</p>
            )}
          </div>
          <Button variant="outline" size="lg" className="min-h-[44px] min-w-[44px] shrink-0">
            <Heart className="size-5" />
          </Button>
          <Button className="min-h-[44px] flex-1 gap-2" size="lg" disabled={!product.inStock}>
            <ShoppingCart className="size-4" />
            {isSubscription ? "Subscribe" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </>
  )
}
