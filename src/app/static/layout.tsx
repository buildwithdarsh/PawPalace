import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PawPalace - Where Every Paw Gets Royal Treatment",
  description:
    "Premium pet grooming, veterinary care, boarding, training, and nutrition counseling in Koramangala, Bangalore. Visit PawPalace today!",
}

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/*
        Hide the root layout's Header, Footer, and MobileNav on the
        static brochure page — the brochure ships its own navigation.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: [
            '[data-slot="root-header"] { display: none !important; }',
            '[data-slot="root-footer"] { display: none !important; }',
            '[data-slot="root-mobile-nav"] { display: none !important; }',
            'main { padding-bottom: 0 !important; }',
          ].join("\n"),
        }}
      />
      {children}
    </>
  )
}
