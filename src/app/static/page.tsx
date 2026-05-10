"use client"

import * as React from "react"
import Image from "next/image"
import {
  Heart,
  Scissors,
  Stethoscope,
  Home,
  Apple,
  ShoppingBag,
  GraduationCap,
  HandHeart,
  Camera,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronUp,
  Globe,
  MessageCircle,
  Send,
  Menu,
  X,
  PawPrint,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Delay simulation helpers
// ---------------------------------------------------------------------------

function useDelayedLoad(ms: number) {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), ms)
    return () => clearTimeout(t)
  }, [ms])
  return loaded
}

// Skeleton primitives
function Skeleton({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      style={style}
    />
  )
}

function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <Skeleton className="mx-auto h-8 w-48" />
      <Skeleton className="mx-auto h-4 w-72" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[4/3] animate-pulse bg-muted" />
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function GallerySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="mx-auto h-8 w-48" />
      <div className="flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-16" />
        ))}
      </div>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="mb-4 w-full"
            style={{ height: `${150 + (i % 3) * 60}px` }}
          />
        ))}
      </div>
    </div>
  )
}

function TeamSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="mx-auto h-8 w-48" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden text-center">
            <div className="mx-auto mt-6 size-24 animate-pulse rounded-full bg-muted" />
            <CardContent className="space-y-2 p-4">
              <Skeleton className="mx-auto h-4 w-24" />
              <Skeleton className="mx-auto h-3 w-20" />
              <Skeleton className="mx-auto h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    icon: Scissors,
    title: "Pet Grooming",
    description:
      "Full-service grooming including bath, haircut, nail trim, ear cleaning, and luxurious pet spa treatments. We handle all breeds with gentle care.",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600&h=450&fit=crop",
  },
  {
    icon: Stethoscope,
    title: "Veterinary Care",
    description:
      "Comprehensive health checkups, vaccinations, deworming, dental care, and surgical procedures by certified veterinarians.",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&h=450&fit=crop",
  },
  {
    icon: Home,
    title: "Pet Boarding & Daycare",
    description:
      "Safe, comfortable boarding with 24/7 supervision, spacious play areas, climate-controlled rooms, and daily health monitoring.",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&h=450&fit=crop",
  },
  {
    icon: Apple,
    title: "Pet Food & Nutrition",
    description:
      "Expert nutrition counseling and a curated selection of premium pet food from Royal Canin, Farmina, Drools, and more.",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=450&fit=crop",
  },
  {
    icon: ShoppingBag,
    title: "Accessories & Supplies",
    description:
      "From leashes and collars to beds and toys — everything your furry friend needs, sourced from trusted brands.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=450&fit=crop",
  },
  {
    icon: GraduationCap,
    title: "Pet Training & Behavior",
    description:
      "Professional obedience training, puppy socialisation, behavioural correction, and agility courses for dogs of all ages.",
    image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&h=450&fit=crop",
  },
  {
    icon: HandHeart,
    title: "Pet Adoption Assistance",
    description:
      "We partner with local shelters to help you find your perfect companion. Adoption drives held every month at our Koramangala store.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop",
  },
  {
    icon: Camera,
    title: "Pet Photography",
    description:
      "Professional studio and outdoor pet photo sessions. Capture adorable portraits, family shots, and milestone moments.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=450&fit=crop",
  },
]

const GALLERY_TABS = ["Dogs", "Cats", "Birds", "Others"] as const

const GALLERY_IMAGES: Record<(typeof GALLERY_TABS)[number], { src: string; h: number; caption: string }[]> = {
  Dogs: [
    { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop", h: 320, caption: "Golden Retriever after grooming" },
    { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop", h: 240, caption: "Playful Labrador pup" },
    { src: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&h=400&fit=crop", h: 280, caption: "German Shepherd spa day" },
    { src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop", h: 200, caption: "Indie dog adoption success" },
    { src: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=600&h=400&fit=crop", h: 300, caption: "Beagle birthday photoshoot" },
    { src: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?w=600&h=400&fit=crop", h: 260, caption: "Husky winter grooming" },
    { src: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=400&fit=crop", h: 220, caption: "Pomeranian fresh trim" },
    { src: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=600&h=400&fit=crop", h: 290, caption: "Dalmatian playtime" },
  ],
  Cats: [
    { src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop", h: 280, caption: "Persian cat spa session" },
    { src: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=400&fit=crop", h: 220, caption: "Siamese kitten at daycare" },
    { src: "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=600&h=400&fit=crop", h: 300, caption: "Maine Coon grooming day" },
    { src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop", h: 240, caption: "Tabby adoption story" },
    { src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=400&fit=crop", h: 260, caption: "British Shorthair photoshoot" },
    { src: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=400&fit=crop", h: 200, caption: "Bengal cat playtime" },
  ],
  Birds: [
    { src: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop", h: 260, caption: "Budgerigar health check" },
    { src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=400&fit=crop", h: 220, caption: "Cockatiel wing trim" },
    { src: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=600&h=400&fit=crop", h: 300, caption: "Lovebirds in aviary" },
    { src: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=600&h=400&fit=crop", h: 240, caption: "African Grey training" },
  ],
  Others: [
    { src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop", h: 280, caption: "Rabbit grooming day" },
    { src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=400&fit=crop", h: 220, caption: "Hamster health checkup" },
    { src: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&h=400&fit=crop", h: 260, caption: "Turtle habitat setup" },
    { src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=400&fit=crop", h: 200, caption: "Guinea pig playtime" },
  ],
}

const BRANDS = [
  "Royal Canin",
  "Pedigree",
  "Whiskas",
  "Drools",
  "Farmina",
  "Hills Science Diet",
  "Acana",
  "Orijen",
  "Sheba",
  "Himalaya Pet Care",
]

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    pet: "Bruno (Golden Retriever)",
    rating: 5,
    text: "PawPalace has been our go-to for Bruno's grooming for over three years. The staff treats him like family. His coat has never looked better!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Rahul Mehta",
    pet: "Whiskers (Persian Cat)",
    rating: 5,
    text: "Dr. Anjali is amazing with Whiskers. She's so gentle during checkups that Whiskers actually purrs on the examination table. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Sneha Reddy",
    pet: "Coco (Labrador)",
    rating: 5,
    text: "We adopted Coco through PawPalace's adoption drive. The team helped us every step of the way — from temperament matching to the first vet visit.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    name: "Arjun Nair",
    pet: "Simba (Indie Dog)",
    rating: 4,
    text: "Simba's training sessions here transformed him from a hyperactive pup to a well-behaved companion. The trainers are patient and truly understand dogs.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    name: "Kavita Iyer",
    pet: "Mittens & Socks (Cats)",
    rating: 5,
    text: "Boarding both my cats here while we travelled to Kerala was the best decision. They were well-fed, played with, and I got daily photo updates!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    name: "Deepak Joshi",
    pet: "Charlie (Beagle)",
    rating: 5,
    text: "The nutrition counseling changed Charlie's diet completely. He's more energetic, his coat is shinier, and the digestive issues are gone. Thank you PawPalace!",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
]

const TEAM = [
  {
    name: "Dr. Anjali Krishnan",
    role: "Chief Veterinarian",
    experience: "14 years experience",
    specialization: "Small animal surgery, dermatology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    name: "Vikram Patel",
    role: "Head Groomer",
    experience: "9 years experience",
    specialization: "Breed-specific styling, spa treatments",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    name: "Meera Iyer",
    role: "Pet Trainer",
    experience: "7 years experience",
    specialization: "Obedience, agility, behavioral therapy",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964e05a?w=400&h=400&fit=crop",
  },
  {
    name: "Ravi Shankar",
    role: "Boarding Manager",
    experience: "6 years experience",
    specialization: "Animal welfare, daycare operations",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
  },
]

const FAQS = [
  {
    q: "Do I need an appointment for grooming?",
    a: "Walk-ins are welcome, but we recommend booking an appointment to avoid waiting, especially on weekends. You can call us or visit the store to schedule a slot.",
  },
  {
    q: "What vaccinations do you provide?",
    a: "We offer all core vaccinations including Rabies, DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) for dogs, and FVRCP and FeLV for cats. Our vets will create a personalised vaccination schedule for your pet.",
  },
  {
    q: "Do you offer boarding facilities?",
    a: "Yes! We have climate-controlled boarding rooms with CCTV monitoring, dedicated play areas, and 24/7 caretaker supervision. Meals are customised based on your pet's diet. Daily photo and video updates are shared with pet parents.",
  },
  {
    q: "What pet food brands do you recommend?",
    a: "We stock and recommend premium brands like Royal Canin, Farmina N&D, Acana, Orijen, and Drools. Our nutrition experts can help you pick the right food based on your pet's breed, age, weight, and health conditions.",
  },
  {
    q: "Do you handle exotic pets?",
    a: "We primarily cater to dogs, cats, and birds. For exotic pets like rabbits, hamsters, and fish, we offer basic supplies and can refer you to specialist exotic vets in Bangalore.",
  },
  {
    q: "Is there a vet available on weekends?",
    a: "Absolutely. Our veterinary clinic operates 7 days a week, including weekends and public holidays. For emergencies outside clinic hours, you can reach our on-call vet at +91 98765 43210.",
  },
]

const STATS = [
  { value: "10+", label: "Years of Service" },
  { value: "20,000+", label: "Happy Pets Served" },
  { value: "4", label: "Certified Veterinarians" },
  { value: "50+", label: "Breeds Groomed" },
]

const STORE_HOURS = [
  { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 9:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
  { day: "Public Holidays", hours: "10:00 AM - 4:00 PM" },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Sticky top nav for the static brochure */
function StaticNav() {
  const [open, setOpen] = React.useState(false)
  const links = [
    "About",
    "Services",
    "Gallery",
    "Testimonials",
    "Team",
    "FAQ",
    "Contact",
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <a href="#hero" className="flex items-center gap-2 font-bold text-primary">
          <PawPrint className="size-6" />
          <span className="text-lg">PawPalace</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              style={{ minHeight: 44 }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/** Section wrapper */
function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-16 px-4 py-16 md:py-20", className)}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10 text-center md:mb-14">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section: Hero
// ---------------------------------------------------------------------------

function HeroSection() {
  const loaded = useDelayedLoad(1000)

  if (!loaded) {
    return (
      <section id="hero" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-muted">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-72" />
          <Skeleton className="mx-auto h-6 w-96" />
          <Skeleton className="mx-auto h-10 w-32" />
        </div>
      </section>
    )
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&h=1080&fit=crop"
          alt="Adorable pets at PawPalace"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <PawPrint className="size-4" />
          Bangalore&apos;s Most Loved Pet Care
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Where Every Paw Gets{" "}
          <span className="text-paw-amber-light">Royal Treatment</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80 md:text-xl">
          Premium grooming, expert veterinary care, cosy boarding, and
          everything your furry family member deserves — all under one roof in
          Koramangala.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="h-12 min-w-[180px] rounded-full bg-primary text-base font-semibold"
            asChild
          >
            <a href="#contact">Visit Us</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 min-w-[180px] rounded-full border-white/40 bg-white/10 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            asChild
          >
            <a href="#services">Our Services</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: About
// ---------------------------------------------------------------------------

function AboutSection() {
  const loaded = useDelayedLoad(900)

  if (!loaded) {
    return (
      <Section id="about">
        <SectionSkeleton rows={4} />
      </Section>
    )
  }

  return (
    <Section id="about" className="bg-secondary/30">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop"
            alt="Inside PawPalace store"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Text */}
        <div>
          <Badge variant="secondary" className="mb-4">
            Our Story
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            A Decade of Love, Care &amp; Wagging Tails
          </h2>
          <p className="mt-4 text-muted-foreground">
            Founded in 2016 in the heart of Koramangala, Bangalore, PawPalace
            started as a small pet grooming studio run by Dr. Anjali Krishnan
            and her team of passionate animal lovers. What began as a weekend
            grooming service quickly grew into a full-fledged pet care
            destination.
          </p>
          <p className="mt-3 text-muted-foreground">
            Today we serve over 20,000 happy pets every year across grooming,
            veterinary care, boarding, training, and nutrition counseling. We are
            certified by the Animal Welfare Board of India and operate with the
            highest standards of hygiene and safety.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-background p-4 text-center ring-1 ring-border"
              >
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Services
// ---------------------------------------------------------------------------

function ServicesSection() {
  const loaded = useDelayedLoad(1100)

  if (!loaded) {
    return (
      <Section id="services">
        <SectionSkeleton rows={8} />
      </Section>
    )
  }

  return (
    <Section id="services">
      <SectionHeading
        title="Our Services"
        subtitle="Comprehensive pet care services delivered with love by our trained professionals."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((svc) => {
          const Icon = svc.icon
          return (
            <Card
              key={svc.title}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{svc.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{svc.description}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Gallery (slow loader — 1800-2500ms)
// ---------------------------------------------------------------------------

function GallerySection() {
  const loaded = useDelayedLoad(2200) // Slow section
  const [tab, setTab] = React.useState<(typeof GALLERY_TABS)[number]>("Dogs")

  if (!loaded) {
    return (
      <Section id="gallery" className="bg-secondary/30">
        <GallerySkeleton />
      </Section>
    )
  }

  const images = GALLERY_IMAGES[tab]

  return (
    <Section id="gallery" className="bg-secondary/30">
      <SectionHeading
        title="Pet Gallery"
        subtitle="Adorable moments, grooming transformations, and happy customers."
      />

      <Tabs
        defaultValue="Dogs"
        onValueChange={(v) => setTab(v as (typeof GALLERY_TABS)[number])}
        className="items-center"
      >
        <TabsList className="mx-auto mb-8">
          {GALLERY_TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="min-h-[44px] px-4">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        {GALLERY_TABS.map((t) => (
          <TabsContent key={t} value={t}>
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
              {GALLERY_IMAGES[t].map((img) => (
                <div
                  key={img.caption}
                  className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={600}
                    height={img.h}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-3 text-sm font-medium text-white">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Brands
// ---------------------------------------------------------------------------

function BrandsSection() {
  const loaded = useDelayedLoad(400) // Lazy fast

  if (!loaded) {
    return (
      <Section id="brands">
        <div className="space-y-4">
          <Skeleton className="mx-auto h-8 w-48" />
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-28 rounded-lg" />
            ))}
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section id="brands">
      <SectionHeading
        title="Brands We Carry"
        subtitle="We stock only the finest pet food and care products from trusted global and Indian brands."
      />
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {BRANDS.map((brand) => (
          <div
            key={brand}
            className="flex h-14 items-center rounded-xl bg-muted/60 px-6 text-sm font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:bg-muted hover:text-foreground"
          >
            {brand}
          </div>
        ))}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Testimonials
// ---------------------------------------------------------------------------

function TestimonialsSection() {
  const loaded = useDelayedLoad(1000)

  if (!loaded) {
    return (
      <Section id="testimonials" className="bg-secondary/30">
        <SectionSkeleton rows={3} />
      </Section>
    )
  }

  return (
    <Section id="testimonials" className="bg-secondary/30">
      <SectionHeading
        title="What Pet Parents Say"
        subtitle="Real reviews from our beloved pet families."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-4 p-6">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < t.rating
                        ? "fill-paw-amber text-paw-amber"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.pet}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Team
// ---------------------------------------------------------------------------

function TeamSection() {
  const loaded = useDelayedLoad(800)

  if (!loaded) {
    return (
      <Section id="team">
        <TeamSkeleton />
      </Section>
    )
  }

  return (
    <Section id="team">
      <SectionHeading
        title="Meet Our Team"
        subtitle="Dedicated professionals who treat every pet like their own."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <Card key={member.name} className="overflow-hidden text-center">
            <div className="relative mx-auto mt-6 size-28 overflow-hidden rounded-full ring-4 ring-primary/20">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <CardHeader className="items-center">
              <CardTitle>{member.name}</CardTitle>
              <Badge variant="secondary">{member.role}</Badge>
            </CardHeader>
            <CardContent className="space-y-1 pb-6">
              <p className="text-sm text-muted-foreground">
                {member.experience}
              </p>
              <p className="text-xs text-muted-foreground">
                {member.specialization}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: FAQ
// ---------------------------------------------------------------------------

function FAQSection() {
  const loaded = useDelayedLoad(500) // lazy

  if (!loaded) {
    return (
      <Section id="faq" className="bg-secondary/30">
        <div className="space-y-4">
          <Skeleton className="mx-auto h-8 w-48" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Section>
    )
  }

  return (
    <Section id="faq" className="bg-secondary/30">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our services."
      />
      <div className="mx-auto max-w-3xl">
        <Accordion>
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Contact
// ---------------------------------------------------------------------------

function ContactSection() {
  const loaded = useDelayedLoad(1200)
  const [submitted, setSubmitted] = React.useState(false)

  if (!loaded) {
    return (
      <Section id="contact">
        <div className="space-y-4">
          <Skeleton className="mx-auto h-8 w-48" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section id="contact">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a question or want to schedule a visit? Drop us a message."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardContent className="p-6">
            {submitted ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="size-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Thank You!</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve received your inquiry and will get back to you
                  within 24 hours. Give your furry friend a pat from us!
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="min-h-[44px]"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      required
                      className="min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pet-type">Pet Type</Label>
                    <select
                      id="pet-type"
                      className="flex min-h-[44px] w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                    >
                      <option value="">Select pet type</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="fish">Fish</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">Inquiry Type</Label>
                  <select
                    id="inquiry-type"
                    className="flex min-h-[44px] w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="grooming">Grooming</option>
                    <option value="vet">Vet Visit</option>
                    <option value="boarding">Boarding</option>
                    <option value="products">Products</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your pet and how we can help..."
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="min-h-[44px] w-full rounded-lg"
                >
                  <Send className="size-4" />
                  Send Inquiry
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <div className="space-y-6">
          {/* Map placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&h=450&fit=crop"
              alt="PawPalace store location"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="rounded-xl bg-white/90 px-6 py-3 text-center backdrop-blur-sm dark:bg-black/70">
                <MapPin className="mx-auto size-6 text-primary" />
                <p className="mt-1 text-sm font-medium">Koramangala, Bangalore</p>
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Address</div>
                  <div className="text-xs text-muted-foreground">
                    #42, 4th Cross, 6th Block,
                    <br />
                    Koramangala, Bangalore 560095
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <div className="text-xs text-muted-foreground">
                    +91 98765 43210
                    <br />
                    +91 80 4567 8901
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-xs text-muted-foreground">
                    hello@pawpalace.in
                    <br />
                    vet@pawpalace.in
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Store Hours</div>
                  <div className="space-y-0.5 text-xs text-muted-foreground">
                    {STORE_HOURS.map((sh) => (
                      <div key={sh.day} className="flex justify-between gap-2">
                        <span>{sh.day}</span>
                        <span className="font-medium text-foreground">
                          {sh.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Section: Footer
// ---------------------------------------------------------------------------

function StaticFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 font-bold text-primary">
              <PawPrint className="size-6" />
              <span className="text-lg">PawPalace</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Where Every Paw Gets Royal Treatment. Bangalore&apos;s most loved
              pet care destination since 2016.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "About",
                "Services",
                "Gallery",
                "Testimonials",
                "Team",
                "FAQ",
                "Contact",
              ].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  style={{ minHeight: 44, display: "flex", alignItems: "center" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Follow Us</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Follow us on Instagram for daily doses of adorable pet content!
            </p>
            <div className="flex gap-2">
              {[
                { icon: Camera, label: "Instagram", href: "#" },
                { icon: Globe, label: "Facebook", href: "#" },
                { icon: MessageCircle, label: "Twitter", href: "#" },
                { icon: Heart, label: "YouTube", href: "#" },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} PawPalace. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://build.withdarsh.com"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Darsh Gupta
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// Mobile bottom nav (visible only on mobile)
// ---------------------------------------------------------------------------

function StaticMobileNav() {
  const items = [
    { icon: Home, label: "Home", href: "#hero" },
    { icon: Scissors, label: "Services", href: "#services" },
    { icon: Camera, label: "Gallery", href: "#gallery" },
    { icon: Phone, label: "Contact", href: "#contact" },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <nav className="flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Scroll-to-top button
// ---------------------------------------------------------------------------

function ScrollToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 z-50 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 md:bottom-6"
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-5" />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Page layout — bypasses root layout Header/Footer with its own
// ---------------------------------------------------------------------------

export default function StaticBrochurePage() {
  return (
    <div className="min-h-screen">
      <StaticNav />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <BrandsSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <StaticFooter />
      <StaticMobileNav />
      <ScrollToTop />
    </div>
  )
}
