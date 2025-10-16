"use client"

import { useAppSelector } from "@/lib/store/hooks"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface ProductsFilterProps {
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  onClearFilters: () => void
}

export function ProductsFilter({ selectedCategory, onCategoryChange, onClearFilters }: ProductsFilterProps) {
  const { items: categories } = useAppSelector((state) => state.categories)

  const hasFilters = selectedCategory !== ""

  return (
    <div className="flex gap-2">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="icon" onClick={onClearFilters} title="Clear filters">
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
