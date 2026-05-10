import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Training - Obedience, Agility & Behavioral Programs",
  description:
    "Enroll your dog in professional training programs in Bangalore. Basic obedience, puppy socialization, agility, and behavioral correction by certified trainers.",
  alternates: { canonical: "/services/training" },
}

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return children
}
