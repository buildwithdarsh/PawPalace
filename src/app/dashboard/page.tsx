"use client"

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, RefreshCw, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dashboardStats, dashboardOrders } from "@/lib/mock-data"
import { formatPrice, formatDate } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { DashboardSkeleton } from "@/components/layout/skeleton-cards"

const statCards = [
  { label: "Total Revenue", value: dashboardStats.totalRevenue, change: dashboardStats.revenueChange, icon: DollarSign, format: "currency" as const },
  { label: "Total Orders", value: dashboardStats.totalOrders, change: dashboardStats.ordersChange, icon: ShoppingCart, format: "number" as const },
  { label: "Active Subscriptions", value: dashboardStats.activeSubscriptions, change: dashboardStats.subscriptionsChange, icon: RefreshCw, format: "number" as const },
  { label: "Total Customers", value: dashboardStats.totalCustomers, change: dashboardStats.customersChange, icon: Users, format: "number" as const },
]

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  packed: "bg-indigo-100 text-indigo-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
}

export default function DashboardOverview() {
  const isLoading = useLoading(pageLoadDelay)
  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold">
                {stat.format === "currency" ? formatPrice(stat.value) : stat.value.toLocaleString()}
              </p>
              <div className="mt-1 flex items-center gap-1">
                {stat.change > 0 ? (
                  <TrendingUp className="size-3 text-green-600" />
                ) : (
                  <TrendingDown className="size-3 text-red-600" />
                )}
                <span className={`text-xs ${stat.change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {stat.change > 0 ? "+" : ""}{stat.change}% from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders">View all <ArrowRight className="ml-1 size-3" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardOrders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                      {order.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(order.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
          <Link href="/dashboard/orders">Process Orders</Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
          <Link href="/dashboard/inventory">Check Inventory</Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
          <Link href="/dashboard/services">Manage Bookings</Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
          <Link href="/dashboard/analytics">View Reports</Link>
        </Button>
      </div>
    </div>
  )
}
