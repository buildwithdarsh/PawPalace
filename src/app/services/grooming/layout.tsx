import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Grooming - Certified Breed-Specific Grooming Services",
  description:
    "Book professional pet grooming in Bangalore. Bath, haircut, nail trim, and ear cleaning by certified groomers. Breed-specific care for dogs and cats.",
  alternates: { canonical: "/services/grooming" },
}

export default function GroomingLayout({ children }: { children: React.ReactNode }) {
  return children
}
