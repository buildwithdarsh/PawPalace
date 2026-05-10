"use client"

import { useState } from "react"
import { Phone, MapPin, Clock, AlertTriangle, Search, Shield, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { emergencyVets, toxicSubstances } from "@/lib/mock-data"

export default function EmergencyPage() {
  const [searchToxic, setSearchToxic] = useState("")

  const filteredToxic = searchToxic
    ? toxicSubstances.filter((t) => t.name.toLowerCase().includes(searchToxic.toLowerCase()) || t.category.toLowerCase().includes(searchToxic.toLowerCase()))
    : toxicSubstances

  const severityColors = { mild: "bg-yellow-100 text-yellow-700", moderate: "bg-orange-100 text-orange-700", severe: "bg-red-100 text-red-700", fatal: "bg-red-200 text-red-900" }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      {/* Emergency banner */}
      <Card className="mb-6 border-destructive bg-destructive/5 md:mb-8">
        <CardContent className="flex flex-col items-center gap-3 p-5 text-center md:gap-4 md:p-8">
          <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 md:size-16">
            <AlertTriangle className="size-7 text-destructive md:size-8" />
          </div>
          <h1 className="text-xl font-bold md:text-2xl">Pet Emergency?</h1>
          <p className="max-w-lg text-sm text-muted-foreground md:text-base">
            If your pet is in immediate danger, call the nearest emergency vet below. For poisoning, check our toxic substances database.
          </p>
          {/* Prominent emergency call button on mobile */}
          <a
            href={`tel:${emergencyVets[0]?.phone || ''}`}
            className="flex min-h-[56px] w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-destructive px-6 text-base font-bold text-destructive-foreground transition-colors active:bg-destructive/80 md:hidden"
          >
            <Phone className="size-5" />
            Call Emergency Vet Now
          </a>
          <p className="text-xs font-medium text-destructive md:text-sm">
            Video consultations are NOT a substitute for emergency in-person care.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="vets">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="vets" className="min-h-[44px] gap-1"><Phone className="size-4" /> Emergency Vets</TabsTrigger>
          <TabsTrigger value="poison" className="min-h-[44px] gap-1"><Shield className="size-4" /> Poison Control</TabsTrigger>
        </TabsList>

        <TabsContent value="vets" className="mt-4 space-y-3">
          {emergencyVets.map((vet) => (
            <Card key={vet.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                  <div className="hidden size-20 shrink-0 overflow-hidden rounded-lg bg-muted md:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={vet.imageUrl} alt={vet.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-medium">{vet.name}</h3>
                      {vet.is24Hours && <Badge className="shrink-0 bg-green-600">24/7 Open</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3 shrink-0" /><span className="truncate">{vet.address}</span></p>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-sm"><Star className="size-3.5 fill-amber-400 text-amber-400" />{vet.rating}</span>
                      <span className="text-sm text-muted-foreground">{vet.distance}km away</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="min-h-[48px] flex-1 gap-2 text-base md:min-h-0 md:flex-initial md:text-sm" asChild>
                      <a href={`tel:${vet.phone}`}><Phone className="size-5 md:size-4" /> Call Now</a>
                    </Button>
                    <Button variant="outline" className="min-h-[48px] flex-1 gap-2 text-base md:min-h-0 md:flex-initial md:text-sm">
                      <MapPin className="size-5 md:size-4" /> Navigate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="poison" className="mt-4">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search toxic substances (chocolate, grapes, lily...)" className="min-h-[44px] pl-9 text-base md:min-h-0 md:text-sm" value={searchToxic} onChange={(e) => setSearchToxic(e.target.value)} />
          </div>
          <div className="space-y-3">
            {filteredToxic.map((tox) => (
              <Card key={tox.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2 mb-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-medium">{tox.name}</h3>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <Badge variant="outline" className="text-xs">{tox.category}</Badge>
                        <Badge className={`text-xs capitalize ${severityColors[tox.severity]}`}>{tox.severity}</Badge>
                        <div className="flex gap-1">
                          {tox.petTypes.map((pt) => <Badge key={pt} variant="secondary" className="text-xs capitalize">{pt}</Badge>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Symptoms</p>
                      <p className="text-sm">{tox.symptoms.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-destructive">First Aid</p>
                      <p className="text-sm">{tox.firstAid}</p>
                    </div>
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
