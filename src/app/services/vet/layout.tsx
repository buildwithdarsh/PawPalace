import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vet Consultation - Video & In-Clinic Appointments",
  description:
    "Book video or in-clinic consultations with licensed veterinarians in Bangalore. Digital prescriptions, 24-hour follow-up chat included.",
  alternates: { canonical: "/services/vet" },
}

export default function VetLayout({ children }: { children: React.ReactNode }) {
  return children
}
