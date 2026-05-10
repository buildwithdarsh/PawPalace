"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { orders } from "@/lib/mock-data"
import { formatPrice, formatDate } from "@/lib/utils"

const steps = ["Confirmed", "Processing", "Packed", "Dispatched", "Delivered"]

function getStepIndex(status: string): number {
  const map: Record<string, number> = { confirmed: 0, processing: 1, packed: 2, dispatched: 3, out_for_delivery: 3, delivered: 4 }
  return map[status] ?? 0
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = orders.find((o) => o.id === id)

  if (!order) return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Order not found</h1>
      <Button variant="outline" className="mt-4" asChild><Link href="/orders">Back to Orders</Link></Button>
    </div>
  )

  const currentStep = getStepIndex(order.status)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/orders"><ArrowLeft className="mr-1 size-4" /> My Orders</Link>
      </Button>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order {order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <Badge className="text-sm capitalize">{order.status.replace(/_/g, " ")}</Badge>
      </div>

      {/* Progress tracker */}
      {order.status !== "cancelled" && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex size-8 items-center justify-center rounded-full ${i <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {i < currentStep ? <CheckCircle className="size-4" /> : i === currentStep ? <Clock className="size-4" /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    <p className={`mt-2 text-xs ${i <= currentStep ? "font-medium" : "text-muted-foreground"}`}>{step}</p>
                  </div>
                  {i < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < currentStep ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            {order.estimatedDelivery && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Estimated delivery: <span className="font-medium text-foreground">{formatDate(order.estimatedDelivery)}</span>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {/* Items */}
          <Card>
            <CardHeader><CardTitle className="text-base">Order Items</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.imageUrl} alt={item.product.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{item.product.brand} &middot; Qty: {item.quantity}</p>
                    {item.isSubscription && <Badge variant="secondary" className="mt-1 text-xs">Subscription</Badge>}
                  </div>
                  <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Summary */}
          <Card>
            <CardHeader><CardTitle className="text-base">Payment Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.totalAmount + order.discount)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-base"><span>Total</span><span>{formatPrice(order.totalAmount)}</span></div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2"><CreditCard className="size-3" /> {order.paymentMethod}</div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader><CardTitle className="text-base">Shipping Address</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="size-4 text-muted-foreground mt-0.5" />
                <p className="text-muted-foreground">{order.shippingAddress}</p>
              </div>
              {order.trackingId && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">Tracking ID</p>
                  <p className="text-sm font-mono font-medium">{order.trackingId}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Need Help?</Button>
            <Button variant="outline" className="flex-1" asChild><Link href="/shop">Reorder</Link></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
