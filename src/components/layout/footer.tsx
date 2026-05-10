import Link from "next/link"
import { PawPrint } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  Shop: [
    { label: "Dog Food", href: "/shop?pet=dog&cat=food" },
    { label: "Cat Food", href: "/shop?pet=cat&cat=food" },
    { label: "Toys & Accessories", href: "/shop?cat=toys" },
    { label: "Health Supplements", href: "/shop?cat=health" },
    { label: "Subscription Boxes", href: "/subscriptions" },
  ],
  Services: [
    { label: "Grooming", href: "/services/grooming" },
    { label: "Vet Consultation", href: "/services/vet" },
    { label: "Pet Boarding", href: "/services/boarding" },
    { label: "Dog Training", href: "/services/training" },
    { label: "Emergency Vet", href: "/emergency" },
  ],
  Community: [
    { label: "Pet Feed", href: "/community" },
    { label: "Adopt a Pet", href: "/adoption" },
    { label: "Pet Articles", href: "/community#articles" },
    { label: "Breed Groups", href: "/community#groups" },
  ],
  Company: [
    { label: "About Us", href: "/static" },
    { label: "Become a Partner", href: "/static" },
    { label: "Careers", href: "/static" },
    { label: "Contact Support", href: "/static" },
    { label: "Privacy Policy", href: "/static" },
    { label: "Terms of Service", href: "/static" },
  ],
}

export function Footer() {
  return (
    <footer className="hidden border-t border-border bg-muted/30 md:block">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <PawPrint className="size-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Paw<span className="text-primary">Palace</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your pet&apos;s one-stop destination for food, care, and love. From
              puppyhood to golden years.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-muted-foreground">Instagram</span>
              <span className="text-muted-foreground">Facebook</span>
              <span className="text-muted-foreground">X</span>
              <span className="text-muted-foreground">YouTube</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 PawPalace by Darsh Gupta. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>FSSAI Licensed</span>
            <span>PCI DSS Compliant</span>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
