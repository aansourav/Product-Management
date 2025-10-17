"use client";

import { Button } from "@/components/ui/button";
import { Plus, RotateCcw, Search } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface ProductsEmptyStateProps {
  searchQuery: string;
  selectedCategory: string;
  onResetSearch: () => void;
}

export function ProductsEmptyState({
  searchQuery,
  selectedCategory,
  onResetSearch,
}: ProductsEmptyStateProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center"
    >
      <motion.div
        className="rounded-full bg-muted p-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <Search className="h-8 w-8 text-muted-foreground" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="mb-1 text-balance text-lg font-semibold">
          No products found
        </h3>
        <p className="text-pretty text-sm text-muted-foreground">
          {searchQuery || selectedCategory
            ? "Try adjusting your search or filters"
            : "Get started by adding your first product"}
        </p>
      </motion.div>
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {(searchQuery || selectedCategory) && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onResetSearch}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <RotateCcw className="h-4 w-4" />
              {selectedCategory ? "Clear Search" : "Show All Products"}
            </Button>
          </motion.div>
        )}
        {!searchQuery && !selectedCategory && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push("/dashboard/products/new")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
