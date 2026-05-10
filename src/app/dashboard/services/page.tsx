"use client"

import { Calendar, Clock, User, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { bookings, serviceProviders } from "@/lib/mock-data"
import { formatPrice, formatDate } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { DashboardSkeleton } from "@/components/layout/skeleton-cards"

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  in_progress: "bg-yellow-100 text-yellow-700",
}

export default function DashboardServicesPage() {
  const isLoading = useLoading(pageLoadDelay)
  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">23</p>
          <p className="text-xs text-muted-foreground">Today&apos;s Bookings</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">89%</p>
          <p className="text-xs text-muted-foreground">Show Rate</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">4.7</p>
          <p className="text-xs text-muted-foreground">Avg Rating</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">{formatPrice(45600)}</p>
          <p className="text-xs text-muted-foreground">This Week Revenue</p>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="bookings">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="providers">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="mt-4 space-y-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{booking.id}</p>
                    <p className="font-medium">{booking.package.name}</p>
                  </div>
                  <Badge className={`text-xs capitalize ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}>{booking.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><User className="size-3" /> {booking.pet.name} ({booking.pet.breed})</span>
                  <span className="flex items-center gap-1"><Calendar className="size-3" /> {formatDate(booking.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" /> {booking.time}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6"><AvatarImage src={booking.provider.imageUrl} /><AvatarFallback>{booking.provider.name[0]}</AvatarFallback></Avatar>
                    <span className="text-sm">{booking.provider.name}</span>
                  </div>
                  <span className="font-medium">{formatPrice(booking.totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="providers" className="mt-4 space-y-3">
          {serviceProviders.map((prov) => (
            <Card key={prov.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12"><AvatarImage src={prov.imageUrl} /><AvatarFallback>{prov.name[0]}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{prov.name}</h3>
                      <Badge variant={prov.isAvailable ? "secondary" : "outline"}>{prov.isAvailable ? "Available" : "Busy"}</Badge>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs mt-1">{prov.type}</Badge>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" /> {prov.rating} ({prov.reviewCount}) &middot; {prov.experience} years
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
