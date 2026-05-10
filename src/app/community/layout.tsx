import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Community - Tips, Stories & Expert Articles",
  description:
    "Join the PawPalace pet parent community. Share stories, get expert advice, read vet-written articles, and connect with breed groups near you.",
  alternates: { canonical: "/community" },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children
}
