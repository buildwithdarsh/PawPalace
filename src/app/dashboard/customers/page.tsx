"use client"

import { Search, Star, PawPrint } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { DashboardSkeleton } from "@/components/layout/skeleton-cards"

const customers = [
  { id: "c1", name: "Priya Sharma", email: "priya@gmail.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop", pets: 3, orders: 24, ltv: 45600, segment: "VIP", membership: "gold" },
  { id: "c2", name: "Rajesh Menon", email: "rajesh@gmail.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", pets: 2, orders: 18, ltv: 32000, segment: "Active", membership: "gold" },
  { id: "c3", name: "Sneha Kapoor", email: "sneha@gmail.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop", pets: 3, orders: 31, ltv: 58000, segment: "VIP", membership: "platinum" },
  { id: "c4", name: "Vikram Patel", email: "vikram@gmail.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop", pets: 1, orders: 12, ltv: 28000, segment: "Active", membership: "free" },
  { id: "c5", name: "Anita Desai", email: "anita@gmail.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop", pets: 1, orders: 6, ltv: 8500, segment: "New", membership: "free" },
  { id: "c6", name: "Karan Johar", email: "karan@gmail.com", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop", pets: 2, orders: 3, ltv: 4200, segment: "At Risk", membership: "free" },
]

const segmentColors: Record<string, string> = {
  VIP: "bg-purple-100 text-purple-700",
  Active: "bg-green-100 text-green-700",
  New: "bg-blue-100 text-blue-700",
  "At Risk": "bg-red-100 text-red-700",
}

export default function DashboardCustomersPage() {
  const isLoading = useLoading(pageLoadDelay)
  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">2,890</p><p className="text-xs text-muted-foreground">Total Customers</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">45%</p><p className="text-xs text-muted-foreground">Repeat Rate</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{formatPrice(1200)}</p><p className="text-xs text-muted-foreground">Avg Order Value</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{formatPrice(8000)}</p><p className="text-xs text-muted-foreground">Avg CLV</p></CardContent></Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search customers..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Pets</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Lifetime Value</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Membership</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8"><AvatarImage src={c.avatar} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><div className="flex items-center gap-1"><PawPrint className="size-3" />{c.pets}</div></TableCell>
                  <TableCell>{c.orders}</TableCell>
                  <TableCell className="font-medium">{formatPrice(c.ltv)}</TableCell>
                  <TableCell><Badge className={`text-xs ${segmentColors[c.segment]}`}>{c.segment}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="capitalize text-xs">{c.membership}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
