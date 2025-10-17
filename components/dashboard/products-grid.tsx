"use client";

import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { containerVariants } from "@/lib/animations";
import type { Product } from "@/lib/types/product";
import { AnimatePresence, motion } from "motion/react";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
}

export function ProductsGrid({ products, loading }: ProductsGridProps) {
  if (loading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-2 grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} index={index} />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-2 grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
