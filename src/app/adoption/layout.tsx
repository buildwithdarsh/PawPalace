import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Adopt a Pet - Find Dogs, Cats & Birds in Shelters Near You",
  description:
    "Browse adoptable dogs, cats, and birds from verified shelters in Bangalore. Every adoption saves a life. Apply online today.",
  alternates: { canonical: "/adoption" },
}

export default function AdoptionLayout({ children }: { children: React.ReactNode }) {
  return children
}
