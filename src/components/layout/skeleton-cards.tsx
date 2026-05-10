import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/2] animate-pulse bg-muted" />
      <CardHeader>
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 animate-pulse rounded bg-muted" />
          <div className="h-3 w-12 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ServiceCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="size-12 animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="h-4 w-96 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-3">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="h-8 w-28 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-muted" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="size-20 animate-pulse rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
