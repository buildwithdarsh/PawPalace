"use client"

import { TrendingUp, DollarSign, ShoppingCart, Users, PawPrint, BarChart3, RefreshCw, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { slowDelay } from "@/lib/delays"
import { DashboardSkeleton } from "@/components/layout/skeleton-cards"

const revenueByCategory = [
  { category: "Pet Food", revenue: 467000, pct: 55 },
  { category: "Grooming Services", revenue: 102000, pct: 12 },
  { category: "Vet Consultations", revenue: 85000, pct: 10 },
  { category: "Accessories", revenue: 76500, pct: 9 },
  { category: "Boarding", revenue: 59500, pct: 7 },
  { category: "Training", revenue: 34000, pct: 4 },
  { category: "Subscription Boxes", revenue: 23500, pct: 3 },
]

const topBreeds = [
  { breed: "Golden Retriever", count: 342, aov: 1800 },
  { breed: "Labrador", count: 298, aov: 1650 },
  { breed: "German Shepherd", count: 231, aov: 2100 },
  { breed: "Persian Cat", count: 189, aov: 1200 },
  { breed: "Shih Tzu", count: 167, aov: 1400 },
  { breed: "Beagle", count: 145, aov: 1300 },
  { breed: "Indie Dog", count: 134, aov: 900 },
  { breed: "Siamese Cat", count: 98, aov: 1100 },
]

const kpis = [
  { label: "GMV (This Month)", value: formatPrice(847500), change: "+12.5%", icon: DollarSign },
  { label: "AOV", value: formatPrice(1200), change: "+3.2%", icon: ShoppingCart },
  { label: "MAU", value: "45.2K", change: "+8.1%", icon: Users },
  { label: "Subscription MRR", value: formatPrice(40000), change: "+15.2%", icon: RefreshCw },
  { label: "Repeat Purchase Rate", value: "45%", change: "+2.1%", icon: TrendingUp },
  { label: "NPS Score", value: "62", change: "+4", icon: Star },
]

export default function AnalyticsPage() {
  const isLoading = useLoading(slowDelay)
  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {kpis.map((kpi) => (
              <Card key={kpi.label}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <kpi.icon className="size-3.5 text-muted-foreground" />
                    <Badge variant="secondary" className="text-[10px] text-green-700">{kpi.change}</Badge>
                  </div>
                  <p className="text-lg font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue by category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue by Category</CardTitle>
              <CardDescription>This month&apos;s revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {revenueByCategory.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{cat.category}</span>
                      <span className="text-sm font-medium">{formatPrice(cat.revenue)} ({cat.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${cat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">12</p><p className="text-xs text-muted-foreground">Best Sellers</p></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">6x</p><p className="text-xs text-muted-foreground">Avg Turnover</p></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">1.8%</p><p className="text-xs text-muted-foreground">Expiry Wastage</p></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">3.2%</p><p className="text-xs text-muted-foreground">Return Rate</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Top Products by Revenue</CardTitle></CardHeader>
            <CardContent>
              {[
                { name: "Royal Canin GR Adult 12kg", revenue: 92000, units: 200 },
                { name: "Drools Chicken Puppy 3kg", revenue: 45000, units: 346 },
                { name: "Whiskas Ocean Fish 1.2kg", revenue: 38000, units: 475 },
                { name: "KONG Classic Large", revenue: 28000, units: 312 },
                { name: "SmartyPaws Joint Supplement", revenue: 24000, units: 150 },
              ].map((p, i) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-muted-foreground w-4">#{i + 1}</span>
                    <span className="text-sm">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatPrice(p.revenue)}</p>
                    <p className="text-xs text-muted-foreground">{p.units} units</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Breeds by Customer Count</CardTitle>
              <CardDescription>Most common breeds on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {topBreeds.map((b, i) => (
                  <div key={b.breed} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium">{b.breed}</p>
                        <p className="text-xs text-muted-foreground">{b.count} pets</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">AOV {formatPrice(b.aov)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
