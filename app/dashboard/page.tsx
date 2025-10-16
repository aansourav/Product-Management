"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchProducts, searchProducts, setSearchQuery, setCurrentPage } from "@/lib/store/slices/products-slice"
import { fetchCategories } from "@/lib/store/slices/categories-slice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/products/product-card"
import { ProductsFilter } from "@/components/products/products-filter"
import { Plus, Search, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    items: products,
    loading,
    error,
    searchQuery,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.products)
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts({ offset: 0, limit: 100 }))
  }, [dispatch])

  useEffect(() => {
    if (!searchQuery) {
      setLocalSearch("")
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!localSearch.trim()) {
      return
    }
    dispatch(setSearchQuery(localSearch))
    dispatch(searchProducts(localSearch))
    dispatch(setCurrentPage(1))
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    dispatch(setCurrentPage(1))
    dispatch(fetchProducts({ offset: 0, limit: 100, categoryId: categoryId || undefined }))
  }

  const handleClearFilters = () => {
    setLocalSearch("")
    setSelectedCategory("")
    dispatch(setSearchQuery(""))
    dispatch(setCurrentPage(1))
    dispatch(fetchProducts({ offset: 0, limit: 100 }))
  }

  const handleResetSearch = () => {
    setLocalSearch("")
    dispatch(setSearchQuery(""))
    dispatch(setCurrentPage(1))
    if (selectedCategory) {
      dispatch(fetchProducts({ offset: 0, limit: 100, categoryId: selectedCategory }))
    } else {
      dispatch(fetchProducts({ offset: 0, limit: 100 }))
    }
  }

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto max-w-7xl animate-fade-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-pretty text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button onClick={() => router.push("/dashboard/products/new")} className="gap-2 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
            <Input
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 transition-all focus:ring-2"
            />
          </div>
          <Button type="submit" className="transition-all hover:scale-105">
            Search
          </Button>
        </form>
        <ProductsFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 animate-slide-in">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[400px] animate-fade-in flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
          <div className="rounded-full bg-muted p-4 transition-transform hover:scale-110">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="mb-1 text-balance text-lg font-semibold">No products found</h3>
            <p className="text-pretty text-sm text-muted-foreground">
              {searchQuery || selectedCategory
                ? "Try adjusting your search or filters"
                : "Get started by adding your first product"}
            </p>
          </div>
          <div className="flex gap-2">
            {(searchQuery || selectedCategory) && (
              <Button
                onClick={handleResetSearch}
                variant="outline"
                className="gap-2 transition-all hover:scale-105 bg-transparent"
              >
                <RotateCcw className="h-4 w-4" />
                {selectedCategory ? "Clear Search" : "Show All Products"}
              </Button>
            )}
            {!searchQuery && !selectedCategory && (
              <Button
                onClick={() => router.push("/dashboard/products/new")}
                className="gap-2 transition-all hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="min-w-[2.5rem]"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
