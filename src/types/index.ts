// ─── Pet Types ───────────────────────────────────────────────────────────────

export type PetSpecies =
  | "dog"
  | "cat"
  | "bird"
  | "fish"
  | "hamster"
  | "rabbit"
  | "reptile"
  | "other"

export type PetSize = "small" | "medium" | "large" | "giant"
export type PetAgeGroup = "puppy" | "adult" | "senior"

export interface Pet {
  id: string
  name: string
  species: PetSpecies
  breed: string
  age: number
  ageGroup: PetAgeGroup
  weight: number
  size: PetSize
  gender: "male" | "female"
  dateOfBirth: string
  imageUrl: string
  healthConditions: string[]
  allergies: string[]
  isSpayedNeutered: boolean
  microchipId?: string
  vaccinations: Vaccination[]
  medicalHistory: MedicalEvent[]
}

export interface Vaccination {
  id: string
  name: string
  date: string
  nextDueDate: string
  veterinarian: string
  status: "completed" | "upcoming" | "overdue"
}

export interface MedicalEvent {
  id: string
  date: string
  type: "checkup" | "vaccination" | "surgery" | "prescription" | "lab_report"
  title: string
  description: string
  veterinarian: string
}

// ─── Product Types ───────────────────────────────────────────────────────────

export type ProductCategory =
  | "food"
  | "treats"
  | "toys"
  | "accessories"
  | "health"
  | "grooming_supplies"
  | "beds"
  | "travel"
  | "training_aids"
  | "aquarium"
  | "bird_supplies"

export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  petType: PetSpecies[]
  description: string
  price: number
  originalPrice?: number
  subscriptionPrice?: number
  rating: number
  reviewCount: number
  imageUrl: string
  images: string[]
  inStock: boolean
  stockCount: number
  weight?: string
  ingredients?: string[]
  nutritionalInfo?: Record<string, string>
  isNew?: boolean
  isPrescriptionRequired?: boolean
  isFreshFood?: boolean
  expiryDate?: string
  breedSpecific?: string[]
  ageGroup?: PetAgeGroup[]
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  isSubscription: boolean
  subscriptionFrequency?: number // weeks
}

// ─── Shop Types ──────────────────────────────────────────────────────────────

export interface Shop {
  id: string
  name: string
  description: string
  imageUrl: string
  coverImageUrl: string
  address: string
  city: string
  distance: number // km
  rating: number
  reviewCount: number
  isOpen: boolean
  openingHours: string
  phone: string
  services: ServiceType[]
  brands: string[]
  petTypes: PetSpecies[]
  isFavorite: boolean
  deliveryEta: string
}

// ─── Service Types ───────────────────────────────────────────────────────────

export type ServiceType = "grooming" | "vet" | "boarding" | "training"

export interface ServiceProvider {
  id: string
  name: string
  type: ServiceType
  imageUrl: string
  rating: number
  reviewCount: number
  experience: number // years
  specializations: string[]
  certifications: string[]
  priceRange: { min: number; max: number }
  location: string
  isAvailable: boolean
  portfolio?: string[] // image URLs
  bio: string
}

export interface ServicePackage {
  id: string
  name: string
  description: string
  price: number
  duration: string
  serviceType: ServiceType
  petTypes: PetSpecies[]
  includes: string[]
}

export interface Booking {
  id: string
  serviceType: ServiceType
  provider: ServiceProvider
  pet: Pet
  date: string
  time: string
  status: BookingStatus
  package: ServicePackage
  notes?: string
  totalPrice: number
}

export type BookingStatus =
  | "requested"
  | "confirmed"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show"

// ─── Order Types ─────────────────────────────────────────────────────────────

export type OrderStatus =
  | "created"
  | "confirmed"
  | "processing"
  | "packed"
  | "dispatched"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "return_requested"
  | "refunded"

export interface Order {
  id: string
  items: CartItem[]
  status: OrderStatus
  totalAmount: number
  discount: number
  deliveryFee: number
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  estimatedDelivery: string
  trackingId?: string
  isSubscriptionOrder: boolean
}

// ─── Subscription Types ──────────────────────────────────────────────────────

export interface Subscription {
  id: string
  product: Product
  frequency: number // weeks
  quantity: number
  nextDelivery: string
  status: "active" | "paused" | "cancelled"
  discount: number
  createdAt: string
  pet?: Pet
}

export interface SubscriptionBox {
  id: string
  name: string
  description: string
  targetPetType: PetSpecies
  targetAgeGroup?: PetAgeGroup
  price: number
  imageUrl: string
  contents: string[]
  isPopular?: boolean
}

// ─── Community Types ─────────────────────────────────────────────────────────

export interface CommunityPost {
  id: string
  author: {
    name: string
    avatarUrl: string
    petName: string
    petBreed: string
  }
  content: string
  imageUrl?: string
  likes: number
  comments: number
  createdAt: string
  isLiked: boolean
  tags: string[]
}

export interface AdoptionListing {
  id: string
  name: string
  species: PetSpecies
  breed: string
  age: string
  gender: "male" | "female"
  description: string
  imageUrl: string
  shelter: string
  location: string
  isVaccinated: boolean
  isSpayedNeutered: boolean
  status: "available" | "pending" | "adopted"
}

export interface Article {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  category: string
  author: string
  readTime: string
  publishedAt: string
}

// ─── Boarding Types ──────────────────────────────────────────────────────────

export interface BoardingFacility {
  id: string
  name: string
  imageUrl: string
  images: string[]
  rating: number
  reviewCount: number
  location: string
  distance: number
  amenities: string[]
  petTypes: PetSpecies[]
  pricing: {
    standard: number
    premium: number
    luxury: number
  }
  capacity: number
  availableSpots: number
  hasWebcam: boolean
}

// ─── Membership Types ────────────────────────────────────────────────────────

export type MembershipTier = "free" | "gold" | "platinum"

export interface MembershipPlan {
  id: string
  tier: MembershipTier
  name: string
  annualFee: number
  benefits: string[]
  pointsMultiplier: number
  isPopular?: boolean
}

// ─── Review Types ────────────────────────────────────────────────────────────

export interface Review {
  id: string
  author: string
  avatarUrl: string
  rating: number
  content: string
  date: string
  isVerified: boolean
  helpful: number
  images?: string[]
}

// ─── Dashboard Types ─────────────────────────────────────────────────────────

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  activeSubscriptions: number
  subscriptionsChange: number
  totalCustomers: number
  customersChange: number
}

export interface InventoryItem {
  id: string
  name: string
  sku: string
  category: ProductCategory
  stock: number
  lowStockThreshold: number
  price: number
  expiryDate?: string
  status: "in_stock" | "low_stock" | "out_of_stock" | "expiring_soon"
}

export interface DashboardOrder {
  id: string
  customer: string
  items: number
  total: number
  status: OrderStatus
  date: string
  paymentMethod: string
}

// ─── User Types ──────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatarUrl: string
  membership: MembershipTier
  loyaltyPoints: number
  pets: Pet[]
  addresses: Address[]
}

export interface Address {
  id: string
  label: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

// ─── Emergency Types ─────────────────────────────────────────────────────────

export interface EmergencyVet {
  id: string
  name: string
  address: string
  phone: string
  distance: number
  is24Hours: boolean
  rating: number
  imageUrl: string
}

export interface ToxicSubstance {
  id: string
  name: string
  category: string
  petTypes: PetSpecies[]
  severity: "mild" | "moderate" | "severe" | "fatal"
  symptoms: string[]
  firstAid: string
}
