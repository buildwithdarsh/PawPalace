"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Scissors, Users, BarChart3, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/inventory", label: "Inventory", icon: Package },
  { href: "/dashboard/services", label: "Services", icon: Scissors },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
]

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {sidebarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors min-h-[44px] lg:min-h-0 lg:py-2",
            pathname === link.href
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <link.icon className="size-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
      <div className="mb-4 flex items-center gap-3 md:mb-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="flex size-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted lg:hidden">
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetTitle>Dashboard</SheetTitle>
            <div className="mt-4">
              <SidebarNav pathname={pathname} onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <div>
          <h2 className="text-xl font-bold md:text-2xl">Business Dashboard</h2>
          <p className="text-xs text-muted-foreground md:text-sm">Manage your pet shop operations</p>
        </div>
      </div>
      <div className="flex gap-6">
        <aside className="hidden w-48 shrink-0 lg:block">
          <div className="sticky top-24">
            <SidebarNav pathname={pathname} />
          </div>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
