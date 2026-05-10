"use client"

import { useState } from "react"
import { Search, AlertTriangle, Package, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { inventoryItems } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { DashboardSkeleton } from "@/components/layout/skeleton-cards"

const statusConfig: Record<string, { label: string; color: string }> = {
  in_stock: { label: "In Stock", color: "bg-green-100 text-green-700" },
  low_stock: { label: "Low Stock", color: "bg-amber-100 text-amber-700" },
  out_of_stock: { label: "Out of Stock", color: "bg-red-100 text-red-700" },
  expiring_soon: { label: "Expiring Soon", color: "bg-orange-100 text-orange-700" },
}

export default function InventoryPage() {
  const isLoading = useLoading(pageLoadDelay)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  if (isLoading) return <DashboardSkeleton />

  const filtered = inventoryItems.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.sku.toLowerCase().includes(search.toLowerCase())) return false
    if (filter !== "all" && item.status !== filter) return false
    return true
  })

  const lowStock = inventoryItems.filter((i) => i.status === "low_stock").length
  const outOfStock = inventoryItems.filter((i) => i.status === "out_of_stock").length
  const expiring = inventoryItems.filter((i) => i.status === "expiring_soon").length

  return (
    <div className="space-y-6">
      {/* Alerts */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="border-amber-200 dark:border-amber-900/30">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="size-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium">{lowStock} Low Stock</p>
              <p className="text-xs text-muted-foreground">Below threshold</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900/30">
          <CardContent className="flex items-center gap-3 p-4">
            <Package className="size-5 text-red-600" />
            <div>
              <p className="text-sm font-medium">{outOfStock} Out of Stock</p>
              <p className="text-xs text-muted-foreground">Needs reorder</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 dark:border-orange-900/30">
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="size-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">{expiring} Expiring Soon</p>
              <p className="text-xs text-muted-foreground">Within 30 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or SKU..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {["all", "in_stock", "low_stock", "out_of_stock", "expiring_soon"].map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize text-xs">
              {f === "all" ? "All" : f.replace(/_/g, " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const cfg = statusConfig[item.status]
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="capitalize text-xs">{item.category.replace("_", " ")}</TableCell>
                    <TableCell className="text-right">
                      <span className={item.stock <= item.lowStockThreshold ? "font-bold text-destructive" : ""}>
                        {item.stock}
                      </span>
                      <span className="text-xs text-muted-foreground"> / {item.lowStockThreshold} min</span>
                    </TableCell>
                    <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                    <TableCell><Badge className={`text-xs ${cfg.color}`}>{cfg.label}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.expiryDate || "-"}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
