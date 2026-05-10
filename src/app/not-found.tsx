import Link from "next/link"
import { PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
        <PawPrint className="size-10 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        The page you are looking for does not exist or has been moved. Let us help you find your way back.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop">Browse Shop</Link>
        </Button>
      </div>
    </div>
  )
}
