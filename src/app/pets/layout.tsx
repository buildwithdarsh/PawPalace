import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Pets",
  robots: { index: false, follow: false },
}

export default function PetsLayout({ children }: { children: React.ReactNode }) {
  return children
}
