"use client"

import Link from "next/link"
import { useState } from "react"
import {
  PawPrint,
  Search,
  ShoppingCart,
  User,
  Menu,
  Sun,
  Moon,
  MapPin,
  Bell,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/components/providers/theme-provider"
import { currentUser } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "My Pets", href: "/pets" },
  { label: "Community", href: "/community" },
  { label: "Adoption", href: "/adoption" },
]

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
      {/* Top bar - hidden on mobile */}
      <div className="border-b border-border bg-primary/5">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="size-3" />
            <span>Bangalore, Karnataka</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/emergency" className="hover:text-destructive transition-colors">
              24/7 Emergency Vet
            </Link>
            <Link href="/membership" className="hover:text-primary transition-colors">
              PawPalace Gold Member
            </Link>
            <span>4,250 Loyalty Points</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <PawPrint className="size-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-bold tracking-tight sm:block">
            Paw<span className="text-primary">Palace</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="relative flex-1 max-w-md mx-auto hidden lg:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search food, toys, vets, groomers..."
            className="h-9 pl-9 bg-muted/50 border-0"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Search">
            <Search className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <Link href="/orders" className="inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted transition-colors" aria-label="Notifications">
            <Bell className="size-4" />
          </Link>

          <Link href="/cart" className="relative inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted transition-colors" aria-label="Cart">
            <ShoppingCart className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </Link>

          {/* User menu - desktop */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted transition-colors"
            >
              <Avatar className="size-6">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="text-xs">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{currentUser.name.split(" ")[0]}</span>
              <ChevronDown className="size-3" />
            </button>
            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border bg-popover p-1 shadow-lg">
                  <div className="p-2">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">Gold Member</Badge>
                  </div>
                  <div className="h-px bg-border my-1" />
                  {[
                    { label: "My Pets", href: "/pets" },
                    { label: "My Orders", href: "/orders" },
                    { label: "Subscriptions", href: "/subscriptions" },
                    { label: "Membership", href: "/membership" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-1" />
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                  >
                    Business Dashboard
                  </Link>
                  <div className="h-px bg-border my-1" />
                  <Link
                    href="/auth"
                    onClick={() => setUserMenuOpen(false)}
                    className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Sign Out
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted transition-colors md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <Badge variant="secondary" className="text-xs">Gold Member</Badge>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9" />
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/orders" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">My Orders</Link>
                  <Link href="/subscriptions" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">Subscriptions</Link>
                  <Link href="/emergency" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">24/7 Emergency Vet</Link>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">Business Dashboard</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
