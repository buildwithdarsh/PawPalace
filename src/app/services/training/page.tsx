"use client"

import Link from "next/link"
import { ArrowLeft, Star, MapPin, Dumbbell, Clock, Check, Users, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { serviceProviders, servicePackages } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

const classTypes = [
  { label: "Basic Obedience", description: "Sit, stay, come, heel, leash manners", icon: "🐕" },
  { label: "Puppy Socialization", description: "Controlled exposure for 8-16 week puppies", icon: "🐶" },
  { label: "Behavioral Correction", description: "Aggression, anxiety, fear, destructive behavior", icon: "🧠" },
  { label: "Agility Training", description: "Obstacle courses, jumps, tunnels", icon: "🏃" },
  { label: "Advanced Training", description: "Off-leash recall, tricks, competition prep", icon: "🏆" },
]

export default function TrainingPage() {
  const isLoading = useLoading(pageLoadDelay)

  if (isLoading) return <PageSkeleton />

  const trainers = serviceProviders.filter((p) => p.type === "training")
  const trainingPackages = servicePackages.filter((p) => p.serviceType === "training")

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/services"><ArrowLeft className="mr-1 size-4" /> All Services</Link>
      </Button>

      <div className="mb-6 flex items-center gap-3 md:mb-8">
        <div className="flex size-11 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/20 md:size-12">
          <Dumbbell className="size-5 text-green-600 md:size-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Pet Training</h1>
          <p className="text-xs text-muted-foreground md:text-sm">Positive reinforcement training by certified professionals</p>
        </div>
      </div>

      {/* Class types */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-3 text-lg font-bold md:mb-4">Training Programs</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {classTypes.map((ct) => (
            <Card key={ct.label} className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-3 p-4">
                <span className="text-2xl">{ct.icon}</span>
                <div>
                  <h3 className="font-medium">{ct.label}</h3>
                  <p className="text-sm text-muted-foreground">{ct.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="mb-8 md:mb-10">
        <h2 className="mb-3 text-lg font-bold md:mb-4">Training Packages</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {trainingPackages.map((pkg) => (
            <Card key={pkg.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {pkg.name.includes("Group") ? <><Users className="mr-1 size-3" />Group</> : <><User className="mr-1 size-3" />Private</>}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3"><Clock className="size-3" />{pkg.duration}</div>
                <ul className="space-y-1 mb-4">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm"><Check className="size-3.5 text-primary" />{item}</li>
                  ))}
                </ul>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold">{formatPrice(pkg.price)}</span>
                    {pkg.name.includes("8") && <span className="ml-2 text-sm text-muted-foreground">{formatPrice(pkg.price / 8)}/session</span>}
                  </div>
                  <Button className="min-h-[44px]">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section>
        <h2 className="mb-4 text-lg font-bold">Our Trainers</h2>
        <div className="space-y-4">
          {trainers.map((trainer) => (
            <Card key={trainer.id}>
              <CardContent className="p-4 md:p-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <Avatar className="size-12 md:size-16">
                    <AvatarImage src={trainer.imageUrl} alt={trainer.name} />
                    <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{trainer.name}</h3>
                    <p className="truncate text-xs text-muted-foreground">{trainer.certifications.join(" | ")}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{trainer.rating}</span>
                      <span className="text-xs text-muted-foreground">({trainer.reviewCount} reviews) &middot; {trainer.experience} years</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{trainer.bio}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {trainer.specializations.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
