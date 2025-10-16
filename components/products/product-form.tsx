"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { createProduct, updateProduct } from "@/lib/store/slices/products-slice"
import { fetchCategories } from "@/lib/store/slices/categories-slice"
import type { Product, CreateProductDto } from "@/lib/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageUpload } from "@/components/products/image-upload"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  mode: "create" | "edit"
  product?: Product
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { loading, error } = useAppSelector((state) => state.products)
  const { items: categories } = useAppSelector((state) => state.categories)

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    categoryId: product?.category.id || "",
    images: product?.images || [],
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Product name is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      errors.price = "Valid price is required"
    }

    if (!formData.categoryId) {
      errors.categoryId = "Category is required"
    }

    if (formData.images.length === 0) {
      errors.images = "At least one image is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const productData: CreateProductDto = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      categoryId: formData.categoryId,
      images: formData.images,
    }

    try {
      if (mode === "create") {
        await dispatch(createProduct(productData)).unwrap()
        toast({
          title: "Success",
          description: "Product created successfully",
        })
        router.push("/dashboard")
      } else if (product) {
        const updatedProduct = await dispatch(updateProduct({ id: product.id, data: productData })).unwrap()
        toast({
          title: "Success",
          description: "Product updated successfully",
        })
        router.push(`/dashboard/products/${updatedProduct.slug}`)
      }
    } catch (err) {
      toast({
        title: "Error",
        description: error || "Failed to save product",
        variant: "destructive",
      })
    }
  }

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter product name"
              disabled={loading}
            />
            {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={4}
              disabled={loading}
            />
            {formErrors.description && <p className="text-sm text-destructive">{formErrors.description}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0.00"
                disabled={loading}
              />
              {formErrors.price && <p className="text-sm text-destructive">{formErrors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => handleChange("categoryId", value)}
                disabled={loading}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.categoryId && <p className="text-sm text-destructive">{formErrors.categoryId}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            images={formData.images}
            onChange={(images) => handleChange("images", images)}
            disabled={loading}
          />
          {formErrors.images && <p className="mt-2 text-sm text-destructive">{formErrors.images}</p>}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Saving...
            </>
          ) : mode === "create" ? (
            "Create Product"
          ) : (
            "Update Product"
          )}
        </Button>
      </div>
    </form>
  )
}
