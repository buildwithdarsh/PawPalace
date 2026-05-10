"use client"

import Link from "next/link"
import { ArrowLeft, Star, MapPin, Wifi, Home, Camera, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { boardingFacilities } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { slowDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function BoardingPage() {
  const isLoading = useLoading(slowDelay)

  if (isLoading) return <PageSkeleton />

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/services"><ArrowLeft className="mr-1 size-4" /> All Services</Link>
      </Button>

      <div className="mb-6 flex items-center gap-3 md:mb-8">
        <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20 md:size-12">
          <Home className="size-5 text-amber-600 md:size-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Pet Boarding &amp; Daycare</h1>
          <p className="text-xs text-muted-foreground md:text-sm">Safe, comfortable facilities with daily report cards</p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-6 md:gap-4 md:mb-8 lg:grid-cols-4">
        {[
          { icon: Camera, label: "Webcam Access", sub: "Watch your pet live" },
          { icon: Shield, label: "Vet on Call", sub: "24/7 medical support" },
          { icon: Users, label: "Trained Staff", sub: "Professional handlers" },
          { icon: Wifi, label: "Daily Reports", sub: "Photos & activity logs" },
        ].map((f) => (
          <Card key={f.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <f.icon className="size-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Facilities */}
      <div className="space-y-4">
        {boardingFacilities.map((facility) => (
          <Card key={facility.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-80 shrink-0">
                <div className="aspect-video md:aspect-auto md:h-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={facility.imageUrl} alt={facility.name} className="size-full object-cover" />
                </div>
                {facility.hasWebcam && <Badge className="absolute left-2 top-2 gap-1"><Camera className="size-3" /> Live Webcam</Badge>}
              </div>
              <CardContent className="flex-1 p-4 md:p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-base font-medium md:text-lg">{facility.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{facility.location} &middot; {facility.distance}km away</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{facility.rating}</span>
                    <span className="text-xs text-muted-foreground">({facility.reviewCount})</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {facility.amenities.map((a) => <Badge key={a} variant="outline" className="text-xs">{a}</Badge>)}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Badge variant={facility.availableSpots > 5 ? "secondary" : "destructive"}>
                    {facility.availableSpots} spots available
                  </Badge>
                  <span className="text-xs text-muted-foreground">of {facility.capacity} total</span>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4">
                  {(["standard", "premium", "luxury"] as const).map((tier) => (
                    <div key={tier} className="text-center rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-medium capitalize">{tier}</p>
                      <p className="text-lg font-bold">{formatPrice(facility.pricing[tier])}</p>
                      <p className="text-xs text-muted-foreground">/night</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="min-h-[44px] flex-1">Book Now</Button>
                  <Button variant="outline" className="min-h-[44px]">View Details</Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
