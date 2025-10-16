"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchProductBySlug, deleteProduct, clearCurrentProduct } from "@/lib/store/slices/products-slice"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DeleteProductDialog } from "@/components/products/delete-product-dialog"
import { ArrowLeft, Edit, Trash2, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { currentProduct, loading, error } = useAppSelector((state) => state.products)
  const slug = params.slug as string
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (slug === "new") {
      router.replace("/dashboard/products/new")
      return
    }

    if (slug) {
      dispatch(fetchProductBySlug(slug))
    }

    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [slug, dispatch, router])

  const handleDelete = async () => {
    if (!currentProduct) return

    setIsDeleting(true)
    try {
      await dispatch(deleteProduct(currentProduct.id)).unwrap()
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      router.push("/dashboard")
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (slug === "new") {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error || "Invalid product slug."}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
        {/* Left side - Images */}
        <div className="space-y-4">
          {currentProduct.images && currentProduct.images.length > 0 ? (
            <>
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={currentProduct.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {currentProduct.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {currentProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-muted transition-all hover:border-primary ${
                        selectedImageIndex === index
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${currentProduct.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted">
              <span className="text-6xl">📦</span>
            </div>
          )}
        </div>

        {/* Right side - Product Information */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <h1 className="text-balance text-3xl font-bold tracking-tight">{currentProduct.name}</h1>
              <Badge variant="secondary" className="shrink-0 text-sm">
                {currentProduct.category.name}
              </Badge>
            </div>
            <p className="text-3xl font-bold text-primary">{formatPrice(currentProduct.price)}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-2 font-semibold">Description</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">{currentProduct.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-3 font-semibold">Product Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {formatDate(currentProduct.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Updated: {formatDate(currentProduct.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={() => router.push(`/dashboard/products/${currentProduct.slug}/edit`)}
              className="flex-1 gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Product
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <DeleteProductDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        productName={currentProduct.name}
        isDeleting={isDeleting}
      />
    </div>
  )
}
