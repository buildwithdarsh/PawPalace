import Link from "next/link"
import Image from "next/image"
import {
  PawPrint,
  Stethoscope,
  Scissors,
  Home,
  Dumbbell,
  ArrowRight,
  Star,
  Truck,
  Shield,
  Clock,
  Heart,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  products,
  serviceProviders,
  subscriptionBoxes,
  communityPosts,
  articles,
  adoptionListings,
  reviews,
} from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"

const petCategories = [
  { icon: "🐕", label: "Dogs", href: "/shop?pet=dog", color: "bg-amber-100 dark:bg-amber-900/30" },
  { icon: "🐈", label: "Cats", href: "/shop?pet=cat", color: "bg-purple-100 dark:bg-purple-900/30" },
  { icon: "🐦", label: "Birds", href: "/shop?pet=bird", color: "bg-sky-100 dark:bg-sky-900/30" },
  { icon: "🐠", label: "Fish", href: "/shop?pet=fish", color: "bg-cyan-100 dark:bg-cyan-900/30" },
  { icon: "🐹", label: "Hamsters", href: "/shop?pet=hamster", color: "bg-orange-100 dark:bg-orange-900/30" },
  { icon: "🐰", label: "Rabbits", href: "/shop?pet=rabbit", color: "bg-pink-100 dark:bg-pink-900/30" },
  { icon: "🦎", label: "Reptiles", href: "/shop?pet=reptile", color: "bg-green-100 dark:bg-green-900/30" },
]

const serviceCards = [
  { icon: Scissors, title: "Grooming", description: "Breed-specific grooming by certified professionals", href: "/services/grooming", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20" },
  { icon: Stethoscope, title: "Vet Consultation", description: "Video or in-clinic with licensed veterinarians", href: "/services/vet", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { icon: Home, title: "Boarding", description: "Safe, comfortable boarding with daily updates", href: "/services/boarding", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  { icon: Dumbbell, title: "Training", description: "Positive reinforcement training programs", href: "/services/training", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
]

const trustBadges = [
  { icon: Truck, label: "Free Delivery", sub: "On Gold+ orders above ₹500" },
  { icon: Shield, label: "Vet Approved", sub: "All products verified safe" },
  { icon: Clock, label: "Same-Day Delivery", sub: "Order before 2 PM" },
  { icon: Heart, label: "Pet-Safe Guarantee", sub: "100% return if unsuitable" },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "PawPalace",
      url: "https://pawpalace.in",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://pawpalace.in/shop?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "PawPalace",
      url: "https://pawpalace.in",
      logo: "https://pawpalace.in/favicon.ico" /* INJECT: logo from branded logo asset in /public/logo.png once created */,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: "English",
      },
      sameAs: [] /* INJECT: sameAs from actual social media profile URLs once created */,
    },
  ],
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const topProviders = serviceProviders.filter((p) => p.isAvailable).slice(0, 3)
  const featuredBoxes = subscriptionBoxes.slice(0, 3)

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-16 lg:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4 md:space-y-6">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="size-3" />
                New: AI Pet Food Recommendations
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
                Everything your pet needs,{" "}
                <span className="text-primary">delivered fast</span>
              </h1>
              <p className="max-w-lg text-base text-muted-foreground md:text-lg">
                Premium pet food, expert grooming, trusted vets, boarding &amp;
                training -- all in one platform. From puppyhood to golden years.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/shop">
                    Shop Now <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">Book a Service</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-xs text-muted-foreground">Pet Shops</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-xs text-muted-foreground">Happy Pets</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop" alt="Happy dog and cat together at PawPalace" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              </div>
              <div className="absolute -left-8 bottom-12 rounded-xl border bg-card p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Star className="size-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">4.8 Rating</p>
                    <p className="text-[10px] text-muted-foreground">50K+ reviews</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-12 rounded-xl border bg-card p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Same-Day</p>
                    <p className="text-[10px] text-muted-foreground">Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{b.label}</p>
                  <p className="text-xs text-muted-foreground">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Pet */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Shop by Pet</h2>
            <p className="text-sm text-muted-foreground">Find the perfect products for your furry, feathered, or finned friend</p>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View all <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-7">
          {petCategories.map((cat) => (
            <Link key={cat.label} href={cat.href} className={`flex min-w-[5rem] shrink-0 flex-col items-center gap-2 rounded-xl p-4 transition-colors hover:ring-2 hover:ring-primary/30 md:min-w-0 ${cat.color}`}>
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 flex items-end justify-between md:mb-8">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">Pet Services</h2>
              <p className="text-sm text-muted-foreground">Professional care from certified experts</p>
            </div>
            <Link href="/services" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
              All services <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {serviceCards.map((svc) => (
              <Link key={svc.title} href={svc.href} className="w-[70vw] shrink-0 md:w-auto">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-start gap-3 p-4 md:p-5">
                    <div className={`flex size-11 items-center justify-center rounded-xl md:size-12 ${svc.bg}`}>
                      <svc.icon className={`size-5 md:size-6 ${svc.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{svc.title}</CardTitle>
                      <CardDescription className="mt-1">{svc.description}</CardDescription>
                    </div>
                    <span className="mt-auto flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary">
                      Book now <ArrowRight className="size-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <div>
            <h2 className="text-xl font-bold md:text-2xl">Featured Products</h2>
            <p className="text-sm text-muted-foreground">Handpicked by our pet nutrition experts</p>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            Shop all <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-square overflow-hidden bg-muted md:aspect-[3/2]">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                  {product.originalPrice && (
                    <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  {product.isPrescriptionRequired && <Badge variant="secondary" className="absolute right-2 top-2">Rx Required</Badge>}
                  {product.isFreshFood && <Badge className="absolute right-2 top-2 bg-blue-600">Fresh</Badge>}
                </div>
                <CardContent className="p-3 md:p-4">
                  <p className="text-[11px] text-muted-foreground md:text-xs">{product.brand}</p>
                  <h3 className="mt-0.5 line-clamp-2 text-xs font-medium md:mt-1 md:text-sm">{product.name}</h3>
                  <div className="mt-1.5 flex items-center gap-1 md:mt-2">
                    <Star className="size-3 fill-amber-400 text-amber-400 md:size-3.5" />
                    <span className="text-xs font-medium md:text-sm">{product.rating}</span>
                    <span className="hidden text-xs text-muted-foreground md:inline">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-1.5 md:mt-2 md:gap-2">
                    <span className="text-sm font-bold md:text-base">{formatPrice(product.price)}</span>
                    {product.originalPrice && <span className="text-xs text-muted-foreground line-through md:text-sm">{formatPrice(product.originalPrice)}</span>}
                  </div>
                  {product.subscriptionPrice && <p className="mt-1 hidden text-xs text-primary md:block">Subscribe &amp; save: {formatPrice(product.subscriptionPrice)}</p>}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Professionals */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl font-bold md:text-2xl">Featured Professionals</h2>
            <p className="text-sm text-muted-foreground">Trusted vets, groomers, and trainers near you</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topProviders.map((prov) => (
              <Card key={prov.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start gap-3 md:gap-4">
                    <Avatar className="size-11 md:size-14">
                      <AvatarImage src={prov.imageUrl} alt={prov.name} />
                      <AvatarFallback>{prov.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="truncate font-medium">{prov.name}</h3>
                        <Badge variant="secondary" className="shrink-0 capitalize">{prov.type}</Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{prov.rating}</span>
                        <span className="text-xs text-muted-foreground">({prov.reviewCount} reviews)</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{prov.experience} yrs exp. &middot; {prov.location}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {prov.specializations.slice(0, 2).map((s) => (
                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Boxes */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <div>
            <h2 className="text-xl font-bold md:text-2xl">Subscription Boxes</h2>
            <p className="text-sm text-muted-foreground">Curated monthly surprises, delivered to your door</p>
          </div>
          <Link href="/subscriptions" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View all boxes <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBoxes.map((box) => (
            <Card key={box.id} className="group overflow-hidden transition-shadow hover:shadow-md">
              <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                <Image src={box.imageUrl} alt={box.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                {box.isPopular && <Badge className="absolute left-2 top-2">Popular</Badge>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{box.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{box.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold">{formatPrice(box.price)}<span className="text-sm font-normal text-muted-foreground">/month</span></span>
                  <Button size="sm" variant="outline" asChild><Link href="/subscriptions">Subscribe</Link></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Adopt a Pet */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 flex items-end justify-between md:mb-8">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">Adopt, Don&apos;t Shop</h2>
              <p className="text-sm text-muted-foreground">Give a loving home to pets waiting in shelters</p>
            </div>
            <Link href="/adoption" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
              View all <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {adoptionListings.map((pet) => (
              <Link key={pet.id} href="/adoption">
                <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image src={pet.imageUrl} alt={pet.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                    <Badge className="absolute left-2 top-2 capitalize">{pet.species}</Badge>
                  </div>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate text-sm font-medium md:text-base">{pet.name}</h3>
                      <Heart className="size-4 shrink-0 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground md:text-sm">{pet.breed} &middot; {pet.age}</p>
                    <p className="mt-1 hidden text-xs text-muted-foreground md:block">{pet.shelter}, {pet.location}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <div>
            <h2 className="text-xl font-bold md:text-2xl">Community</h2>
            <p className="text-sm text-muted-foreground">Stories, tips, and milestones from pet parents</p>
          </div>
          <Link href="/community" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View community <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communityPosts.slice(0, 3).map((post) => (
            <Card key={post.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="size-8">
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.petName} &middot; {post.author.petBreed}</p>
                  </div>
                </div>
                <p className="text-sm line-clamp-3">{post.content}</p>
                {post.imageUrl && (
                  <div className="relative mt-3 aspect-video overflow-hidden rounded-lg bg-muted">
                    <Image src={post.imageUrl} alt={`Community post by ${post.author.name}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className={`size-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    {post.likes}
                  </span>
                  <span>{post.comments} comments</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl font-bold md:text-2xl">Pet Health Articles</h2>
            <p className="text-sm text-muted-foreground">Expert-written guides by veterinarians and trainers</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {articles.map((art) => (
              <Card key={art.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image src={art.imageUrl} alt={art.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs">{art.category}</Badge>
                  <h3 className="mt-2 line-clamp-2 text-sm font-medium">{art.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{art.author}</span><span>&middot;</span><span>{art.readTime}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12">
        <Card className="overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:gap-6 md:p-8 lg:p-12">
            <Badge variant="secondary" className="gap-1"><PawPrint className="size-3" /> Membership</Badge>
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">Join PawPalace Gold &amp; Save More</h2>
            <p className="max-w-2xl text-muted-foreground">Free delivery, grooming discounts, priority vet booking, 2x loyalty points, and a free birthday box for your pet. Starting at just {formatPrice(999)}/year.</p>
            <div className="flex gap-3">
              <Button size="lg" asChild><Link href="/membership">View Plans</Link></Button>
              <Button variant="outline" size="lg" asChild><Link href="/membership">Compare Benefits</Link></Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Reviews */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 text-center md:mb-8">
            <h2 className="text-xl font-bold md:text-2xl">What Pet Parents Say</h2>
            <p className="text-sm text-muted-foreground">Trusted by 50,000+ pet families across India</p>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {reviews.map((rev) => (
              <Card key={rev.id} className="w-[75vw] shrink-0 md:w-auto">
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-4 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm line-clamp-4">{rev.content}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={rev.avatarUrl} alt={rev.author} />
                      <AvatarFallback className="text-xs">{rev.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium">{rev.author}</p>
                      {rev.isVerified && <p className="text-[10px] text-primary">Verified Purchase</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
