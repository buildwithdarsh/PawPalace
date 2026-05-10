import type { Metadata } from "next"
import { Check, PawPrint, Crown, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Membership Plans - Save More With Gold & Platinum",
  description:
    "Join PawPalace Gold or Platinum for free delivery, grooming discounts, priority vet booking, loyalty points, and a free birthday box for your pet.",
  alternates: { canonical: "/membership" },
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { membershipPlans, currentUser } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils"

const tierIcons = {
  free: PawPrint,
  gold: Star,
  platinum: Crown,
}

const tierColors = {
  free: "border-border",
  gold: "border-amber-300 dark:border-amber-700",
  platinum: "border-purple-300 dark:border-purple-700",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I switch plans anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the difference is prorated. If you downgrade, the new plan takes effect at your next renewal.",
      },
    },
    {
      "@type": "Question",
      name: "How do loyalty points work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Earn points on every purchase. Gold members earn 2x points, Platinum members earn 3x points. Redeem 100 points = ₹10 discount. Points expire after 12 months of inactivity.",
      },
    },
    {
      "@type": "Question",
      name: "What is the birthday box?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gold and Platinum members receive a complimentary birthday box for each registered pet. It includes treats, a toy, and a birthday bandana — delivered before their birthday!",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel my membership?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can cancel anytime. Your benefits remain active until the end of your current billing period. No questions asked.",
      },
    },
  ],
}

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mb-8 text-center">
        <Badge variant="secondary" className="mb-4">Your current plan: Gold</Badge>
        <h1 className="text-3xl font-bold">PawPalace Membership</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Unlock exclusive benefits, save more on every purchase, and give your pet the premium care they deserve.
        </p>
      </div>

      {/* Loyalty points */}
      <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">Your Loyalty Points</p>
            <p className="text-3xl font-bold">{currentUser.loyaltyPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">= {formatPrice(currentUser.loyaltyPoints / 10)} in rewards</p>
          </div>
          <Button variant="outline">Redeem Points</Button>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {membershipPlans.map((plan) => {
          const Icon = tierIcons[plan.tier]
          const isCurrentPlan = currentUser.membership === plan.tier
          return (
            <Card key={plan.id} className={`relative overflow-visible ${tierColors[plan.tier]} ${plan.isPopular ? "ring-2 ring-primary" : ""}`}>
              {plan.isPopular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto mb-3 flex size-14 items-center justify-center rounded-full ${plan.tier === "platinum" ? "bg-purple-100 dark:bg-purple-900/30" : plan.tier === "gold" ? "bg-amber-100 dark:bg-amber-900/30" : "bg-muted"}`}>
                  <Icon className={`size-7 ${plan.tier === "platinum" ? "text-purple-600" : plan.tier === "gold" ? "text-amber-600" : "text-muted-foreground"}`} />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {plan.annualFee === 0 ? "Free forever" : `${formatPrice(plan.annualFee)}/year`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Points multiplier: </span>
                  <span className="font-bold text-primary">{plan.pointsMultiplier}x</span>
                </div>
                <Separator />
                <ul className="space-y-2.5">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 shrink-0 text-primary mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={isCurrentPlan ? "outline" : "default"} disabled={isCurrentPlan}>
                  {isCurrentPlan ? "Current Plan" : plan.annualFee === 0 ? "Downgrade" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAQ */}
      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the difference is prorated. If you downgrade, the new plan takes effect at your next renewal." },
            { q: "How do loyalty points work?", a: "Earn points on every purchase. Gold members earn 2x points, Platinum members earn 3x points. Redeem 100 points = ₹10 discount. Points expire after 12 months of inactivity." },
            { q: "What is the birthday box?", a: "Gold and Platinum members receive a complimentary birthday box for each registered pet. It includes treats, a toy, and a birthday bandana — delivered before their birthday!" },
            { q: "Can I cancel my membership?", a: "You can cancel anytime. Your benefits remain active until the end of your current billing period. No questions asked." },
          ].map((faq) => (
            <Card key={faq.q}>
              <CardContent className="p-4">
                <h3 className="font-medium">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
