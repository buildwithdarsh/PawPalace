"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MapPin, Check, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { adoptionListings } from "@/lib/mock-data"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function AdoptionPage() {
  const isLoading = useLoading(pageLoadDelay)
  const [selectedSpecies, setSelectedSpecies] = useState("all")

  if (isLoading) return <PageSkeleton />

  const filtered = selectedSpecies === "all" ? adoptionListings : adoptionListings.filter((p) => p.species === selectedSpecies)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Adopt a Pet</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Give a loving home to animals waiting in shelters and rescues. Every adoption saves a life.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3 justify-center">
        {["all", "dog", "cat", "bird"].map((s) => (
          <Button key={s} variant={selectedSpecies === s ? "default" : "outline"} size="sm" onClick={() => setSelectedSpecies(s)} className="capitalize">
            {s === "all" ? "All Pets" : `${s}s`}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pet) => (
          <Card key={pet.id} className="group overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image src={pet.imageUrl} alt={pet.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <Badge className="absolute left-2 top-2 capitalize">{pet.species}</Badge>
              <Badge className={`absolute right-2 top-2 ${pet.status === "available" ? "bg-green-600" : "bg-amber-600"}`}>
                {pet.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{pet.name}</h3>
                <span className="text-sm text-muted-foreground">{pet.gender === "male" ? "♂" : "♀"}</span>
              </div>
              <p className="text-sm text-muted-foreground">{pet.breed} &middot; {pet.age}</p>
              <p className="mt-2 text-sm line-clamp-2">{pet.description}</p>

              <div className="mt-3 flex flex-wrap gap-1">
                {pet.isVaccinated && <Badge variant="secondary" className="gap-1 text-xs"><Check className="size-3" /> Vaccinated</Badge>}
                {pet.isSpayedNeutered && <Badge variant="secondary" className="gap-1 text-xs"><Check className="size-3" /> Spayed/Neutered</Badge>}
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3" /> {pet.shelter}, {pet.location}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Dialog>
                  <DialogTrigger className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-2.5 h-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all">
                    Apply to Adopt
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adoption Application for {pet.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-muted-foreground">
                        Thank you for considering adoption! Our team at {pet.shelter} will review your application
                        and contact you within 48 hours.
                      </p>
                      <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                        <p><strong>What you&apos;ll need:</strong></p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Valid government ID (18+ required)</li>
                          <li>Proof of residence</li>
                          <li>Details about your living situation</li>
                          <li>Veterinarian reference (if you have one)</li>
                        </ul>
                      </div>
                      <Button className="w-full">Submit Application</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="icon"><Heart className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Shelter info */}
      <Card className="mt-12 bg-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Are you a shelter or rescue?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            List your animals for free on PawPalace. Reach thousands of potential adopters in your city.
          </p>
          <Button variant="outline">Register as Shelter</Button>
        </CardContent>
      </Card>
    </div>
  )
}
