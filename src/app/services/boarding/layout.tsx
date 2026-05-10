import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Boarding & Daycare - Safe Facilities With Daily Reports",
  description:
    "Book pet boarding and daycare in Bangalore. Webcam access, daily report cards, vet on call, and trained staff at verified facilities.",
  alternates: { canonical: "/services/boarding" },
}

export default function BoardingLayout({ children }: { children: React.ReactNode }) {
  return children
}
