"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Star, MapPin, Clock, Scissors, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { serviceProviders, servicePackages, pets } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function GroomingPage() {
  const isLoading = useLoading(pageLoadDelay)
  const [selectedPet, setSelectedPet] = useState(pets[0]?.id || "")
  const [selectedPkg, setSelectedPkg] = useState("")
  const [mobileStep, setMobileStep] = useState(0) // 0=pet, 1=service, 2=groomer

  if (isLoading) return <PageSkeleton />

  const groomers = serviceProviders.filter((p) => p.type === "grooming")
  const groomingPackages = servicePackages.filter((p) => p.serviceType === "grooming")

  const selectedPkgData = groomingPackages.find((p) => p.id === selectedPkg)
  const selectedPetData = pets.find((p) => p.id === selectedPet)

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 pb-28 md:py-8 md:pb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/services"><ArrowLeft className="mr-1 size-4" /> All Services</Link>
        </Button>

        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex size-11 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-900/20 md:size-12">
              <Scissors className="size-5 text-pink-600 md:size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold md:text-2xl">Pet Grooming</h1>
              <p className="text-xs text-muted-foreground md:text-sm">Breed-specific grooming by certified professionals</p>
            </div>
          </div>
        </div>

        {/* Mobile step indicator */}
        <div className="mb-4 flex gap-1 md:hidden">
          {["Select Pet", "Select Service", "Choose Groomer"].map((step, i) => (
            <button
              key={step}
              onClick={() => setMobileStep(i)}
              className={`flex-1 rounded-full px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                mobileStep === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          <div className="space-y-6 md:space-y-8 lg:col-span-2">
            {/* Select pet - mobile step 0 */}
            <Card className={`${mobileStep !== 0 ? 'hidden md:block' : ''}`}>
              <CardHeader><CardTitle className="text-base">Select Your Pet</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-3">
                  {pets.filter((p) => p.species === "dog" || p.species === "cat").map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => { setSelectedPet(pet.id); if (window.innerWidth < 768) setMobileStep(1) }}
                      className={`flex min-h-[56px] items-center gap-3 rounded-lg border p-3 transition-colors ${selectedPet === pet.id ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
                    >
                      <Avatar className="size-10">
                        <AvatarImage src={pet.imageUrl} alt={pet.name} />
                        <AvatarFallback>{pet.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium">{pet.name}</p>
                        <p className="text-xs text-muted-foreground">{pet.breed}</p>
                      </div>
                      {selectedPet === pet.id && <Check className="size-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grooming packages - mobile step 1 */}
            <div className={`${mobileStep !== 1 ? 'hidden md:block' : ''}`}>
              <h2 className="mb-3 text-lg font-bold md:mb-4">Select Service</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {groomingPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => { setSelectedPkg(pkg.id); if (window.innerWidth < 768) setMobileStep(2) }}
                    className="text-left"
                  >
                    <Card className={`h-full transition-all ${selectedPkg === pkg.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium">{pkg.name}</h3>
                          {selectedPkg === pkg.id && <Check className="size-5 text-primary" />}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="size-3" /> {pkg.duration}
                        </div>
                        <ul className="mt-2 space-y-1">
                          {pkg.includes.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-xs"><span className="size-1 rounded-full bg-primary" />{item}</li>
                          ))}
                        </ul>
                        <p className="mt-3 text-lg font-bold">{formatPrice(pkg.price)}</p>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            </div>

            {/* Groomers - mobile step 2 */}
            <div className={`${mobileStep !== 2 ? 'hidden md:block' : ''}`}>
              <h2 className="mb-3 text-lg font-bold md:mb-4">Available Groomers</h2>
              <div className="space-y-3">
                {groomers.map((groomer) => (
                  <Card key={groomer.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Avatar className="size-12 md:size-14">
                          <AvatarImage src={groomer.imageUrl} alt={groomer.name} />
                          <AvatarFallback>{groomer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="truncate font-medium">{groomer.name}</h3>
                            <Badge variant={groomer.isAvailable ? "secondary" : "outline"} className="shrink-0">
                              {groomer.isAvailable ? "Available" : "Busy"}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm">{groomer.rating}</span>
                            <span className="text-xs text-muted-foreground">({groomer.reviewCount})</span>
                            <span className="text-xs text-muted-foreground ml-2">{groomer.experience} yrs</span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{groomer.location}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {groomer.specializations.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                          </div>
                          {groomer.portfolio && groomer.portfolio.length > 0 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto">
                              {groomer.portfolio.slice(0, 4).map((img, i) => (
                                <div key={i} className="size-12 shrink-0 overflow-hidden rounded-md bg-muted md:size-14">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={img} alt={`${groomer.name} grooming work ${i + 1}`} className="size-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking summary sidebar - desktop */}
          <div className="hidden lg:block">
            <Card className="sticky top-24">
              <CardHeader><CardTitle className="text-base">Booking Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {selectedPetData && (
                  <div>
                    <p className="text-xs text-muted-foreground">Pet</p>
                    <p className="text-sm font-medium">{selectedPetData.name} ({selectedPetData.breed})</p>
                  </div>
                )}
                {selectedPkgData && (
                  <div>
                    <p className="text-xs text-muted-foreground">Service</p>
                    <p className="text-sm font-medium">{selectedPkgData.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedPkgData.duration}</p>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-bold">{selectedPkgData ? formatPrice(selectedPkgData.price) : "Select a service"}</span>
                </div>
                <Button className="w-full" disabled={!selectedPet || !selectedPkg}>
                  Select Date & Time
                </Button>
                <p className="text-xs text-center text-muted-foreground">Free cancellation up to 24 hours before</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom booking bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex-1 min-w-0">
            {selectedPkgData ? (
              <>
                <p className="text-lg font-bold">{formatPrice(selectedPkgData.price)}</p>
                <p className="truncate text-xs text-muted-foreground">{selectedPkgData.name}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a service</p>
            )}
          </div>
          <Button className="min-h-[44px] flex-1" disabled={!selectedPet || !selectedPkg}>
            Select Date & Time
          </Button>
        </div>
      </div>
    </>
  )
}
