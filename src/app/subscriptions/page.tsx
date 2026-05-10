"use client"

import Link from "next/link"
import { RefreshCw, Pause, Play, X, Calendar, ChevronRight, Package, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { subscriptions, subscriptionBoxes } from "@/lib/mock-data"
import { formatPrice, formatDate } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function SubscriptionsPage() {
  const isLoading = useLoading(pageLoadDelay)
  if (isLoading) return <PageSkeleton />

  const active = subscriptions.filter((s) => s.status === "active")
  const paused = subscriptions.filter((s) => s.status === "paused")

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Subscriptions</h1>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({paused.length})</TabsTrigger>
          <TabsTrigger value="boxes">Subscription Boxes</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 space-y-3">
          {active.length === 0 ? (
            <Card><CardContent className="p-8 text-center">
              <RefreshCw className="mx-auto size-12 text-muted-foreground/30 mb-3" />
              <p className="font-medium">No active subscriptions</p>
              <p className="text-sm text-muted-foreground mt-1">Set up auto-delivery to save 10% on recurring purchases</p>
              <Button className="mt-4" asChild><Link href="/shop">Browse Products</Link></Button>
            </CardContent></Card>
          ) : active.map((sub) => (
            <Card key={sub.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sub.product.imageUrl} alt={sub.product.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{sub.product.name}</h3>
                        <p className="text-xs text-muted-foreground">{sub.product.brand}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                    </div>
                    {sub.pet && <p className="mt-1 text-xs text-muted-foreground">For {sub.pet.name}</p>}
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><RefreshCw className="size-3" /> Every {sub.frequency} weeks</span>
                      <span>Qty: {sub.quantity}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Calendar className="size-3 text-muted-foreground" />
                      <span className="text-sm">Next delivery: <span className="font-medium">{formatDate(sub.nextDelivery)}</span></span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">{formatPrice(sub.product.subscriptionPrice || sub.product.price)} <span className="text-xs font-normal text-primary">({sub.discount}% off)</span></span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">Skip Next</Button>
                        <Button size="sm" variant="outline"><Pause className="size-3" /></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="paused" className="mt-4 space-y-3">
          {paused.map((sub) => (
            <Card key={sub.id} className="opacity-70">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sub.product.imageUrl} alt={sub.product.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{sub.product.name}</h3>
                      <Badge variant="outline">Paused</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Every {sub.frequency} weeks &middot; Qty: {sub.quantity}</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="gap-1"><Play className="size-3" /> Resume</Button>
                      <Button size="sm" variant="outline" className="gap-1 text-destructive"><X className="size-3" /> Cancel</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="boxes" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptionBoxes.map((box) => (
              <Card key={box.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={box.imageUrl} alt={box.name} className="size-full object-cover transition-transform group-hover:scale-105" />
                  {box.isPopular && <Badge className="absolute left-2 top-2">Popular</Badge>}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{box.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{box.description}</p>
                  <div className="mt-2 space-y-1">
                    {box.contents.map((item) => (
                      <p key={item} className="flex items-center gap-1 text-xs text-muted-foreground"><Gift className="size-3" />{item}</p>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{formatPrice(box.price)}<span className="text-sm font-normal text-muted-foreground">/month</span></span>
                    <Button size="sm">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
