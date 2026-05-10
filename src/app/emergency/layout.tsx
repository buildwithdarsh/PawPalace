import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "24/7 Pet Emergency Vet & Poison Control",
  description:
    "Find the nearest 24/7 emergency veterinary clinic in Bangalore. Search our toxic substances database for immediate first-aid guidance.",
  alternates: { canonical: "/emergency" },
}

export default function EmergencyLayout({ children }: { children: React.ReactNode }) {
  return children
}
