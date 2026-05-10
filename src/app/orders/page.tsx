"use client"

import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, ChevronRight, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { orders, bookings } from "@/lib/mock-data"
import { formatPrice, formatDate } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"
import type { OrderStatus, BookingStatus } from "@/types"

const statusConfig: Record<string, { color: string; icon: typeof Package }> = {
  created: { color: "bg-gray-100 text-gray-700", icon: Clock },
  confirmed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  processing: { color: "bg-yellow-100 text-yellow-700", icon: Package },
  packed: { color: "bg-indigo-100 text-indigo-700", icon: Package },
  dispatched: { color: "bg-purple-100 text-purple-700", icon: Truck },
  out_for_delivery: { color: "bg-orange-100 text-orange-700", icon: Truck },
  delivered: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-700", icon: Clock },
  completed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
}

export default function OrdersPage() {
  const isLoading = useLoading(pageLoadDelay)
  if (isLoading) return <PageSkeleton />

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Orders &amp; Bookings</h1>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Product Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="bookings">Service Bookings ({bookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4 flex flex-col gap-3">
          {orders.map((order) => {
            const cfg = statusConfig[order.status] || statusConfig.created
            return (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={cfg.color}>{order.status.replace(/_/g, " ")}</Badge>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="size-12 overflow-hidden rounded-md bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.product.imageUrl} alt={item.product.name} className="size-full object-cover" />
                        </div>
                      ))}
                      {order.items.length > 3 && <span className="text-sm text-muted-foreground">+{order.items.length - 3} more</span>}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{order.items.length} item(s) &middot; {order.paymentMethod}</span>
                      <span className="font-bold">{formatPrice(order.totalAmount)}</span>
                    </div>
                    {order.isSubscriptionOrder && <Badge variant="secondary" className="mt-2 text-xs">Subscription Order</Badge>}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </TabsContent>

        <TabsContent value="bookings" className="mt-4 space-y-3">
          {bookings.map((booking) => {
            const cfg = statusConfig[booking.status] || statusConfig.created
            return (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{booking.id}</p>
                      <Badge variant="outline" className="capitalize mt-1">{booking.serviceType}</Badge>
                    </div>
                    <Badge className={cfg.color}>{booking.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="size-10 overflow-hidden rounded-full bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={booking.provider.imageUrl} alt={booking.provider.name} className="size-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{booking.provider.name}</p>
                      <p className="text-xs text-muted-foreground">for {booking.pet.name} ({booking.pet.breed})</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="size-3.5" /> {formatDate(booking.date)} at {booking.time}
                    </span>
                    <span className="font-bold">{formatPrice(booking.totalPrice)}</span>
                  </div>
                  {booking.notes && <p className="mt-2 text-xs text-muted-foreground italic">Note: {booking.notes}</p>}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
