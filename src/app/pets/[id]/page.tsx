"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Syringe, Stethoscope, Weight, Heart, Shield, Edit, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pets } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { ProfileSkeleton } from "@/components/layout/skeleton-cards"

export default function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isLoading = useLoading(pageLoadDelay)
  const pet = pets.find((p) => p.id === id)

  if (isLoading) return <div className="mx-auto max-w-7xl px-4 py-8"><ProfileSkeleton /></div>
  if (!pet) return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Pet not found</h1>
      <Button variant="outline" className="mt-4" asChild><Link href="/pets">Back to Pets</Link></Button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/pets"><ArrowLeft className="mr-1 size-4" /> My Pets</Link>
      </Button>

      {/* Pet header */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-start md:justify-between md:gap-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Avatar className="size-16 md:size-20">
            <AvatarImage src={pet.imageUrl} alt={pet.name} />
            <AvatarFallback className="text-xl md:text-2xl">{pet.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold md:text-2xl">{pet.name}</h1>
            <p className="text-sm text-muted-foreground md:text-base">{pet.breed}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs capitalize">{pet.species}</Badge>
              <Badge variant="outline" className="text-xs capitalize">{pet.ageGroup} &middot; {pet.age} years</Badge>
              <Badge variant="outline" className="text-xs">{pet.gender === "male" ? "\u2642 Male" : "\u2640 Female"}</Badge>
              {pet.isSpayedNeutered && <Badge variant="secondary" className="text-xs">Spayed/Neutered</Badge>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="min-h-[44px] gap-1"><Camera className="size-4" /> Photos</Button>
          <Button variant="outline" className="min-h-[44px] gap-1"><Edit className="size-4" /> Edit</Button>
        </div>
      </div>

      {/* Quick stats - swipeable on mobile */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 mb-6 md:mb-8">
        <Card className="min-w-[7rem] shrink-0 md:min-w-0"><CardContent className="p-3 text-center md:p-4">
          <Weight className="mx-auto size-5 text-primary mb-1" />
          <p className="text-lg font-bold md:text-xl">{pet.weight}kg</p>
          <p className="text-xs text-muted-foreground">Weight</p>
        </CardContent></Card>
        <Card className="min-w-[7rem] shrink-0 md:min-w-0"><CardContent className="p-3 text-center md:p-4">
          <Calendar className="mx-auto size-5 text-primary mb-1" />
          <p className="text-lg font-bold md:text-xl">{pet.dateOfBirth}</p>
          <p className="text-xs text-muted-foreground">Birthday</p>
        </CardContent></Card>
        <Card className="min-w-[7rem] shrink-0 md:min-w-0"><CardContent className="p-3 text-center md:p-4">
          <Syringe className="mx-auto size-5 text-primary mb-1" />
          <p className="text-lg font-bold md:text-xl">{pet.vaccinations.filter((v) => v.status === "completed").length}/{pet.vaccinations.length}</p>
          <p className="text-xs text-muted-foreground">Vaccinations</p>
        </CardContent></Card>
        <Card className="min-w-[7rem] shrink-0 md:min-w-0"><CardContent className="p-3 text-center md:p-4">
          <Shield className="mx-auto size-5 text-primary mb-1" />
          <p className="text-lg font-bold md:text-xl">{pet.microchipId ? "Yes" : "No"}</p>
          <p className="text-xs text-muted-foreground">Microchipped</p>
        </CardContent></Card>
      </div>

      {/* Health info */}
      {(pet.healthConditions.length > 0 || pet.allergies.length > 0) && (
        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {pet.healthConditions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><Heart className="size-4" /> Health Conditions</h4>
                  <div className="flex flex-wrap gap-1">{pet.healthConditions.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}</div>
                </div>
              )}
              {pet.allergies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1"><Shield className="size-4 text-destructive" /> Allergies</h4>
                  <div className="flex flex-wrap gap-1">{pet.allergies.map((a) => <Badge key={a} className="bg-destructive/10 text-destructive">{a}</Badge>)}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="vaccinations">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="vaccinations" className="min-h-[44px] md:min-h-0">Vaccinations</TabsTrigger>
          <TabsTrigger value="medical" className="min-h-[44px] md:min-h-0">Medical History</TabsTrigger>
        </TabsList>

        <TabsContent value="vaccinations" className="mt-4">
          {/* Compact timeline on mobile */}
          <div className="space-y-2 md:space-y-3">
            {pet.vaccinations.map((vax) => (
              <Card key={vax.id}>
                <CardContent className="flex items-center gap-3 p-3 md:justify-between md:p-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full md:size-10 ${vax.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : vax.status === "upcoming" ? "bg-amber-100 dark:bg-amber-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                      <Syringe className={`size-4 md:size-5 ${vax.status === "completed" ? "text-green-600" : vax.status === "upcoming" ? "text-amber-600" : "text-red-600"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{vax.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {vax.date ? `${formatDate(vax.date)}` : "Pending"} &middot; Next: {formatDate(vax.nextDueDate)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={vax.status === "completed" ? "secondary" : vax.status === "upcoming" ? "outline" : "destructive"} className="shrink-0 capitalize text-xs">
                    {vax.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medical" className="mt-4">
          <div className="space-y-2 md:space-y-3">
            {pet.medicalHistory.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No medical history recorded yet</CardContent></Card>
            ) : (
              pet.medicalHistory.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 md:size-10">
                        <Stethoscope className="size-4 text-blue-600 md:size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="truncate font-medium">{event.title}</h4>
                          <Badge variant="outline" className="shrink-0 capitalize text-xs">{event.type.replace("_", " ")}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{formatDate(event.date)} &middot; {event.veterinarian}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-4 md:gap-3">
        <Button variant="outline" className="h-auto min-h-[56px] flex-col gap-2 py-3 md:py-4" asChild>
          <Link href="/services/vet"><Stethoscope className="size-5" /> Book Vet Visit</Link>
        </Button>
        <Button variant="outline" className="h-auto min-h-[56px] flex-col gap-2 py-3 md:py-4" asChild>
          <Link href="/services/grooming"><span className="text-lg">{"\u2702\uFE0F"}</span> Book Grooming</Link>
        </Button>
        <Button variant="outline" className="h-auto min-h-[56px] flex-col gap-2 py-3 md:py-4" asChild>
          <Link href={`/shop?pet=${pet.species}`}><span className="text-lg">{"\uD83D\uDED2"}</span> Shop for {pet.name}</Link>
        </Button>
        <Button variant="outline" className="h-auto min-h-[56px] flex-col gap-2 py-3 md:py-4" asChild>
          <Link href="/services/boarding"><span className="text-lg">{"\uD83C\uDFE0"}</span> Book Boarding</Link>
        </Button>
      </div>
    </div>
  )
}
