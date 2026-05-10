import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeProvider } from "@/components/providers/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://pawpalace.in"),
  title: {
    default: "PawPalace - Trusted Pet Food, Grooming & Vet Services",
    template: "%s | PawPalace",
  },
  description:
    "Pet food, grooming, vet consultations, boarding, training & more. Everything your pet needs, delivered to your door.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PawPalace",
    title: "PawPalace - Trusted Pet Food, Grooming & Vet Services",
    description:
      "Pet food, grooming, vet consultations, boarding, training & more. Everything your pet needs, delivered to your door.",
    url: "/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop" /* INJECT: og-image from branded static asset in /public/og-image.jpg once created */,
        width: 1200,
        height: 630,
        alt: "PawPalace - Your pet care destination",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PawPalace - Trusted Pet Food, Grooming & Vet Services",
    description:
      "Pet food, grooming, vet consultations, boarding, training & more. Everything your pet needs, delivered to your door.",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop" /* INJECT: twitter-image from branded static asset in /public/og-image.jpg once created */,
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <div data-slot="root-header"><Header /></div>
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <div data-slot="root-footer"><Footer /></div>
          <div data-slot="root-mobile-nav"><MobileNav /></div>
        </ThemeProvider>
      </body>
    </html>
  )
}
