"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchProductBySlug, clearCurrentProduct } from "@/lib/store/slices/products-slice"
import { ProductForm } from "@/components/products/product-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentProduct, loading, error } = useAppSelector((state) => state.products)
  const slug = params.slug as string

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug))
    }

    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [slug, dispatch])

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !currentProduct) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error || "Product not found"}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <h1 className="text-balance text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-pretty text-muted-foreground">Update product information</p>
      </div>

      <ProductForm mode="edit" product={currentProduct} />
    </div>
  )
}
