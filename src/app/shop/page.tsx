"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Filter, Star, SlidersHorizontal, Grid3X3, List, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { products, shops } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

const petFilters = ["All", "Dog", "Cat", "Bird", "Fish", "Hamster", "Rabbit", "Reptile"]
const categoryFilters = ["All", "Food", "Treats", "Toys", "Accessories", "Health", "Grooming", "Beds", "Aquarium"]

function FilterSidebar({ activePet, setActivePet, activeCategory, setActiveCategory }: {
  activePet: string; setActivePet: (v: string) => void
  activeCategory: string; setActiveCategory: (v: string) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Pet Type</h3>
        <div className="flex flex-wrap gap-2">
          {petFilters.map((f) => (
            <Button key={f} variant={activePet === f ? "default" : "outline"} size="sm" className="min-h-[44px] min-w-[44px]" onClick={() => setActivePet(f)}>
              {f}
            </Button>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((f) => (
            <Button key={f} variant={activeCategory === f ? "default" : "outline"} size="sm" className="min-h-[44px] min-w-[44px]" onClick={() => setActiveCategory(f)}>
              {f}
            </Button>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input placeholder="Min" className="h-8" type="number" />
          <span className="text-muted-foreground">-</span>
          <Input placeholder="Max" className="h-8" type="number" />
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-3 text-sm font-semibold">Rating</h3>
        <div className="space-y-1">
          {[4, 3, 2].map((r) => (
            <button key={r} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-3 ${i < r ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
              ))}
              <span className="ml-1">& up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const isLoading = useLoading(pageLoadDelay)
  const [activePet, setActivePet] = useState("All")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")

  if (isLoading) return <PageSkeleton />

  const filtered = products.filter((p) => {
    if (activePet !== "All" && !p.petType.includes(activePet.toLowerCase() as never)) return false
    if (activeCategory !== "All" && p.category !== activeCategory.toLowerCase().replace(" ", "_")) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between md:gap-4">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">Shop</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center size-8 rounded-lg border border-border bg-background hover:bg-muted lg:hidden">
              <SlidersHorizontal className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetTitle>Filters</SheetTitle>
              <div className="pt-4">
                <FilterSidebar activePet={activePet} setActivePet={setActivePet} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center gap-1 rounded-lg border p-0.5 lg:flex">
            <button className={`rounded-md p-1.5 ${view === "grid" ? "bg-muted" : ""}`} onClick={() => setView("grid")}><Grid3X3 className="size-4" /></button>
            <button className={`rounded-md p-1.5 ${view === "list" ? "bg-muted" : ""}`} onClick={() => setView("list")}><List className="size-4" /></button>
          </div>
        </div>
      </div>

      {/* Nearby Shops banner */}
      <Card className="mb-6 bg-primary/5">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <MapPin className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Nearby Pet Shops</p>
              <p className="text-xs text-muted-foreground">{shops.filter((s) => s.isOpen).length} shops open near you</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild><Link href="/shop/shop-1">View Shops</Link></Button>
        </CardContent>
      </Card>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterSidebar activePet={activePet} setActivePet={setActivePet} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <Card><CardContent className="flex flex-col items-center gap-4 p-12 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={() => { setActivePet("All"); setActiveCategory("All"); setSearchQuery("") }}>Clear Filters</Button>
            </CardContent></Card>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3" : "space-y-3"}>
              {filtered.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className={`group overflow-hidden transition-shadow hover:shadow-md ${view === "list" ? "flex flex-row" : ""}`}>
                    <div className={`relative overflow-hidden bg-muted ${view === "list" ? "w-40 shrink-0" : "aspect-square md:aspect-[3/2]"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.imageUrl} alt={product.name} className="size-full object-cover transition-transform group-hover:scale-105" />
                      {product.originalPrice && <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</Badge>}
                    </div>
                    <CardContent className="flex-1 p-3 md:p-4">
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
                      {product.subscriptionPrice && <p className="mt-1 hidden text-xs text-primary md:block">Subscribe: {formatPrice(product.subscriptionPrice)}</p>}
                      <div className="mt-1.5 hidden flex-wrap gap-1 md:mt-2 md:flex">
                        {product.tags.slice(0, 2).map((t) => <Badge key={t} variant="outline" className="text-xs capitalize">{t.replace("-", " ")}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
