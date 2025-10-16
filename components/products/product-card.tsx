"use client"

import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <Card className="group animate-fade-in flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl text-muted-foreground">📦</span>
          </div>
        )}
        <Badge className="absolute right-2 top-2 text-xs transition-transform duration-300 group-hover:scale-105">
          {product.category.name}
        </Badge>
      </div>

      <CardContent className="flex-1 p-3">
        <h3 className="mb-1 line-clamp-1 text-sm font-semibold transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{product.description}</p>
        <p className="text-base font-bold">{formatPrice(product.price)}</p>
      </CardContent>

      <CardFooter className="flex gap-2 border-t p-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 text-xs transition-all hover:bg-secondary bg-transparent"
          onClick={() => router.push(`/dashboard/products/${product.slug}`)}
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1 gap-1.5 text-xs transition-all"
          onClick={() => router.push(`/dashboard/products/${product.slug}/edit`)}
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}
