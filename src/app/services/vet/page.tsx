"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Star, MapPin, Video, Building2, Stethoscope, Clock, Check, Phone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { serviceProviders, servicePackages, pets } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function VetPage() {
  const isLoading = useLoading(pageLoadDelay)
  const [consultType, setConsultType] = useState<"video" | "clinic">("video")
  const [selectedPet, setSelectedPet] = useState(pets[0]?.id || "")
  const [symptoms, setSymptoms] = useState("")

  if (isLoading) return <PageSkeleton />

  const vets = serviceProviders.filter((p) => p.type === "vet")
  const vetPackages = servicePackages.filter((p) => p.serviceType === "vet")

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/services"><ArrowLeft className="mr-1 size-4" /> All Services</Link>
      </Button>

      <div className="mb-6 flex items-center gap-3 md:mb-8">
        <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 md:size-12">
          <Stethoscope className="size-5 text-blue-600 md:size-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Vet Consultation</h1>
          <p className="text-xs text-muted-foreground md:text-sm">Licensed veterinarians, video or in-clinic visits</p>
        </div>
      </div>

      {/* Emergency banner */}
      <Card className="mb-6 border-destructive/30 bg-destructive/5 md:mb-8">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Phone className="size-5 text-destructive" />
            <div>
              <p className="text-sm font-medium">Pet Emergency?</p>
              <p className="text-xs text-muted-foreground">Find the nearest 24/7 emergency vet</p>
            </div>
          </div>
          <Button variant="destructive" className="min-h-[44px] w-full md:min-h-0 md:w-auto" size="sm" asChild><Link href="/emergency">Emergency Vet</Link></Button>
        </CardContent>
      </Card>

      {/* Consultation type */}
      <Tabs value={consultType} onValueChange={(v) => setConsultType(v as "video" | "clinic")} className="mb-6 md:mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="video" className="min-h-[44px] gap-2 md:min-h-0"><Video className="size-4" /> <span className="hidden md:inline">Video</span> Consult</TabsTrigger>
          <TabsTrigger value="clinic" className="min-h-[44px] gap-2 md:min-h-0"><Building2 className="size-4" /> In-Clinic</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="space-y-6 md:space-y-8 lg:col-span-2">
          {/* Select pet */}
          <Card>
            <CardHeader><CardTitle className="text-base">Select Your Pet</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-3">
                {pets.map((pet) => (
                  <button key={pet.id} onClick={() => setSelectedPet(pet.id)} className={`flex min-h-[56px] items-center gap-3 rounded-lg border p-3 transition-colors ${selectedPet === pet.id ? "border-primary bg-primary/5" : "hover:bg-muted"}`}>
                    <Avatar className="size-10">
                      <AvatarImage src={pet.imageUrl} alt={pet.name} />
                      <AvatarFallback>{pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium">{pet.name}</p>
                      <p className="text-xs text-muted-foreground">{pet.breed} &middot; {pet.species}</p>
                    </div>
                    {selectedPet === pet.id && <Check className="size-5 text-primary" />}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Symptom pre-screening */}
          <Card>
            <CardHeader><CardTitle className="text-base">Describe Symptoms (Optional)</CardTitle></CardHeader>
            <CardContent>
              <Textarea placeholder="What concerns do you have? Describe any symptoms, changes in behavior, appetite, etc..." value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={4} className="text-base md:text-sm" />
              <p className="mt-2 text-xs text-muted-foreground">This helps the vet prepare for your consultation</p>
            </CardContent>
          </Card>

          {/* Available vets */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Available Veterinarians</h2>
            <div className="space-y-3">
              {vets.map((vet) => (
                <Card key={vet.id}>
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3 md:gap-4">
                      <Avatar className="size-12 md:size-16">
                        <AvatarImage src={vet.imageUrl} alt={vet.name} />
                        <AvatarFallback>{vet.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate font-medium">{vet.name}</h3>
                            <p className="truncate text-xs text-muted-foreground">{vet.certifications.join(", ")}</p>
                          </div>
                          <Button size="sm" className="min-h-[44px] shrink-0 md:min-h-0" disabled={!vet.isAvailable}>
                            {vet.isAvailable ? "Book" : "Unavailable"}
                          </Button>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{vet.rating}</span>
                            <span className="text-xs text-muted-foreground">({vet.reviewCount})</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{vet.experience} years experience</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{vet.location}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {vet.specializations.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{vet.bio}</p>
                        <p className="mt-2 text-sm font-medium">{formatPrice(vet.priceRange.min)} - {formatPrice(vet.priceRange.max)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Consultation packages */}
          {vetPackages.map((pkg) => (
            <Card key={pkg.id}>
              <CardContent className="p-4">
                <h3 className="font-medium">{pkg.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {pkg.duration}
                </div>
                <ul className="mt-2 space-y-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs"><Check className="size-3 text-primary" />{item}</li>
                  ))}
                </ul>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{formatPrice(pkg.price)}</span>
                  <Badge variant={consultType === "video" && pkg.name.includes("Video") ? "default" : "secondary"}>
                    {pkg.name.includes("Video") ? "Video" : "In-Clinic"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Trust */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-3">
              <h4 className="text-sm font-medium">Why consult on PawPalace?</h4>
              <div className="flex items-center gap-2 text-sm"><Shield className="size-4 text-primary" /> All vets are license-verified</div>
              <div className="flex items-center gap-2 text-sm"><Clock className="size-4 text-primary" /> 24-hour follow-up chat included</div>
              <div className="flex items-center gap-2 text-sm"><Stethoscope className="size-4 text-primary" /> Digital prescriptions linked to your pet profile</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
