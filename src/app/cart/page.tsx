"use client"

import Link from "next/link"
import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Tag, RefreshCw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cartItems as initialCart } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import type { CartItem } from "@/types"

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQty = (idx: number, qty: number) => {
    if (qty < 1) return
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, quantity: qty } : item)))
  }

  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  const subtotal = items.reduce((sum, item) => {
    const price = item.isSubscription && item.product.subscriptionPrice ? item.product.subscriptionPrice : item.product.price
    return sum + price * item.quantity
  }, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const deliveryFee = subtotal > 500 ? 0 : 49
  const total = subtotal - discount + deliveryFee

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto size-16 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start shopping for your furry friend!</p>
        <Button className="mt-6" asChild><Link href="/shop">Browse Products</Link></Button>
      </div>
    )
  }

  return (
    <>
    <div className="mx-auto max-w-7xl px-4 py-4 pb-28 md:py-8 md:pb-8">
      <h1 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">Shopping Cart ({items.length} items)</h1>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item, idx) => (
            <Card key={item.product.id}>
              <CardContent className="p-3 md:p-4">
                <div className="flex gap-3 md:gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted md:size-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.imageUrl} alt={item.product.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                        <h3 className="font-medium line-clamp-2">{item.product.name}</h3>
                        {item.isSubscription && (
                          <Badge variant="secondary" className="mt-1 gap-1 text-xs">
                            <RefreshCw className="size-3" /> Every {item.subscriptionFrequency} weeks &middot; 10% off
                          </Badge>
                        )}
                      </div>
                      <button onClick={() => removeItem(idx)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border">
                        <button className="flex min-h-[36px] min-w-[36px] items-center justify-center text-muted-foreground hover:text-foreground md:min-h-0 md:min-w-0 md:px-2.5 md:py-1" onClick={() => updateQty(idx, item.quantity - 1)}><Minus className="size-3.5" /></button>
                        <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
                        <button className="flex min-h-[36px] min-w-[36px] items-center justify-center text-muted-foreground hover:text-foreground md:min-h-0 md:min-w-0 md:px-2.5 md:py-1" onClick={() => updateQty(idx, item.quantity + 1)}><Plus className="size-3.5" /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice((item.isSubscription && item.product.subscriptionPrice ? item.product.subscriptionPrice : item.product.price) * item.quantity)}</p>
                        {item.isSubscription && item.product.subscriptionPrice && (
                          <p className="text-xs text-muted-foreground line-through">{formatPrice(item.product.price * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order summary */}
        <div className="hidden lg:block">
          <Card className="sticky top-24">
            <CardHeader><CardTitle className="text-base">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-1" />
                <Button variant="outline" size="sm" onClick={() => { if (promoCode) setPromoApplied(true) }}>Apply</Button>
              </div>
              {promoApplied && <p className="flex items-center gap-1 text-xs text-primary"><Tag className="size-3" /> PAWFIRST applied: 10% off</p>}

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? <span className="text-primary">Free</span> : formatPrice(deliveryFee)}</span></div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>

              <Button className="w-full gap-2" size="lg">
                Proceed to Checkout <ArrowRight className="size-4" />
              </Button>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-center gap-1"><Truck className="size-3" /> Free delivery for Gold members on orders above ₹500</p>
                <p className="flex items-center gap-1"><ShieldCheck className="size-3" /> 100% genuine products guaranteed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile order summary */}
      <Card className="lg:hidden">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center gap-2">
            <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="min-h-[44px] flex-1 text-base" />
            <Button variant="outline" className="min-h-[44px]" onClick={() => { if (promoCode) setPromoApplied(true) }}>Apply</Button>
          </div>
          {promoApplied && <p className="flex items-center gap-1 text-xs text-primary"><Tag className="size-3" /> PAWFIRST applied: 10% off</p>}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? <span className="text-primary">Free</span> : formatPrice(deliveryFee)}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Sticky bottom checkout bar - mobile */}
    <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold">{formatPrice(total)}</p>
          <p className="text-xs text-muted-foreground">{items.length} items</p>
        </div>
        <Button className="min-h-[44px] flex-1 gap-2" size="lg">
          Checkout <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
    </>
  )
}
