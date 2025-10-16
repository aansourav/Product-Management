"use client"

import { ProductForm } from "@/components/products/product-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewProductPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <h1 className="text-balance text-3xl font-bold tracking-tight">Create New Product</h1>
        <p className="text-pretty text-muted-foreground">Add a new product to your inventory</p>
      </div>

      <ProductForm mode="create" />
    </div>
  )
}
