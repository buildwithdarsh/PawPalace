> This project is made with the help of Claude (1M context).

# PawPalace

A comprehensive pet ecosystem connecting pet owners, shops, service providers, and adoption centers.

## Overview

PawPalace combines a pet product marketplace, service booking platform, adoption listings, subscription boxes, community discussions, and emergency vet finder into one unified app. Built for Indian pet parents with a clean, mobile-friendly UX.

## Features

- **Shop** — Products for dogs, cats, birds, fish, hamsters, rabbits, reptiles
- **Services** — Grooming, vet consultation (video + in-clinic), boarding, training
- **Adoption** — Browse pets and follow the adoption timeline
- **Subscriptions** — Monthly customizable pet care boxes
- **Community** — Discussion posts, articles, reviews
- **Emergency vet finder** — Toxic substance database and nearby vets
- **Provider dashboard** — Service providers manage profiles and bookings
- **User dashboard** — Orders, pet profiles, booking history

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS + Base UI React
- **Icons:** Lucide React
- **SDK:** @buildwithdarsh/sdk

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router routes (shop, services, adoption, ...)
├── components/ui/    # Button, Card, Badge, Avatar, Separator, etc.
└── lib/mock-data.ts  # Seed data (1000+ lines)
```
