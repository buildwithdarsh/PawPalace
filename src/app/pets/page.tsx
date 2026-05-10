"use client"

import Link from "next/link"
import { Plus, PawPrint, Syringe, Calendar, Weight, AlertTriangle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { pets } from "@/lib/mock-data"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { ProfileSkeleton } from "@/components/layout/skeleton-cards"

export default function PetsPage() {
  const isLoading = useLoading(pageLoadDelay)
  if (isLoading) return <div className="mx-auto max-w-7xl px-4 py-8"><ProfileSkeleton /></div>

  const upcomingVaccinations = pets.flatMap((pet) =>
    pet.vaccinations.filter((v) => v.status === "upcoming").map((v) => ({ ...v, petName: pet.name, petId: pet.id }))
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">My Pets</h1>
          <p className="text-sm text-muted-foreground">{pets.length} pets registered</p>
        </div>
        <Button className="min-h-[44px] gap-2"><Plus className="size-4" /> Add Pet</Button>
      </div>

      {/* Upcoming reminders */}
      {upcomingVaccinations.length > 0 && (
        <Card className="mb-6 border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-4 text-amber-600" />
              <h3 className="text-sm font-medium">Upcoming Vaccinations</h3>
            </div>
            <div className="space-y-2">
              {upcomingVaccinations.map((v) => (
                <div key={v.id} className="flex flex-col gap-1.5 text-sm md:flex-row md:items-center md:justify-between">
                  <span className="truncate">{v.petName} - {v.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{v.nextDueDate}</Badge>
                    <Button size="sm" variant="outline" className="min-h-[44px] md:min-h-0" asChild><Link href="/services/vet">Book Vet</Link></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pet cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <Link key={pet.id} href={`/pets/${pet.id}`}>
            <Card className="group h-full transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-16">
                    <AvatarImage src={pet.imageUrl} alt={pet.name} />
                    <AvatarFallback className="text-lg">{pet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{pet.name}</h3>
                      <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs capitalize">{pet.species}</Badge>
                      <Badge variant="outline" className="text-xs capitalize">{pet.ageGroup}</Badge>
                      <Badge variant="outline" className="text-xs">{pet.gender === "male" ? "♂" : "♀"} {pet.gender}</Badge>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-sm font-bold">{pet.age}y</p>
                    <p className="text-xs text-muted-foreground">Age</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{pet.weight}kg</p>
                    <p className="text-xs text-muted-foreground">Weight</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{pet.vaccinations.filter((v) => v.status === "completed").length}</p>
                    <p className="text-xs text-muted-foreground">Vaccines</p>
                  </div>
                </div>

                {(pet.healthConditions.length > 0 || pet.allergies.length > 0) && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {pet.healthConditions.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                    {pet.allergies.map((a) => <Badge key={a} className="text-xs bg-destructive/10 text-destructive">{a} allergy</Badge>)}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Add pet card */}
        <Card className="flex items-center justify-center border-dashed transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Plus className="size-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Add a New Pet</p>
              <p className="text-sm text-muted-foreground">Register your pet for personalized recommendations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
