import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Professional Pet Services - Grooming, Vet, Boarding & Training",
  description:
    "Book certified pet grooming, licensed vet consultations, safe boarding facilities, and positive-reinforcement training programs in Bangalore.",
  alternates: { canonical: "/services" },
}
import { Scissors, Stethoscope, Home, Dumbbell, ArrowRight, Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { serviceProviders, servicePackages, boardingFacilities } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"

const services = [
  { icon: Scissors, title: "Grooming", description: "Professional breed-specific grooming at salons or your home. Bath, haircut, nail trim, ear cleaning & more.", href: "/services/grooming", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20", count: "10K+ bookings/month" },
  { icon: Stethoscope, title: "Vet Consultation", description: "Video or in-clinic consultations with licensed veterinarians. Digital prescriptions, follow-up chat included.", href: "/services/vet", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", count: "5K+ consultations/month" },
  { icon: Home, title: "Boarding & Daycare", description: "Safe, comfortable boarding facilities with daily report cards, webcam access, and 24/7 staff.", href: "/services/boarding", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", count: "30+ facilities" },
  { icon: Dumbbell, title: "Training", description: "Obedience, socialization, agility, and behavioral training. Positive reinforcement methodology.", href: "/services/training", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", count: "2K+ sessions/month" },
]

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pawpalace.in" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://pawpalace.in/services" },
  ],
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl font-bold md:text-3xl">Professional Pet Services</h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">Professional care from certified experts near you</p>
      </div>

      {/* Service categories */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 mb-8 md:mb-12">
        {services.map((svc) => (
          <Link key={svc.title} href={svc.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-start gap-3 p-4 md:gap-4 md:p-6">
                <div className={`flex size-11 items-center justify-center rounded-xl md:size-14 ${svc.bg}`}>
                  <svc.icon className={`size-5 md:size-7 ${svc.color}`} />
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg">{svc.title}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 md:mt-2 md:line-clamp-none">{svc.description}</CardDescription>
                </div>
                <div className="mt-auto flex w-full items-center justify-between">
                  <span className="hidden text-xs text-muted-foreground md:inline">{svc.count}</span>
                  <span className="flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary">
                    Book <ArrowRight className="size-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Popular packages */}
      <section className="mb-8 md:mb-12">
        <h2 className="mb-4 text-lg font-bold md:mb-6 md:text-xl">Popular Service Packages</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicePackages.slice(0, 6).map((pkg) => (
            <Card key={pkg.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="capitalize mb-2">{pkg.serviceType}</Badge>
                    <h3 className="font-medium">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-3.5" /> {pkg.duration}
                </div>
                <ul className="mt-3 space-y-1">
                  {pkg.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="size-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                  {pkg.includes.length > 3 && (
                    <li className="text-xs text-muted-foreground">+{pkg.includes.length - 3} more included</li>
                  )}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">{formatPrice(pkg.price)}</span>
                  <Button size="sm" className="min-h-[44px] min-w-[44px]">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top providers */}
      <section>
        <h2 className="mb-4 text-lg font-bold md:mb-6 md:text-xl">Featured Professionals</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceProviders.map((prov) => (
            <Card key={prov.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-14">
                    <AvatarImage src={prov.imageUrl} alt={prov.name} />
                    <AvatarFallback>{prov.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{prov.name}</h3>
                      <Badge variant={prov.isAvailable ? "secondary" : "outline"} className={prov.isAvailable ? "text-green-700 dark:text-green-400" : ""}>
                        {prov.isAvailable ? "Available" : "Busy"}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="capitalize mt-1">{prov.type}</Badge>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{prov.rating}</span>
                      <span className="text-xs text-muted-foreground">({prov.reviewCount})</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="size-3" /> {prov.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {prov.specializations.slice(0, 2).map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formatPrice(prov.priceRange.min)} - {formatPrice(prov.priceRange.max)}
                    </p>
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
