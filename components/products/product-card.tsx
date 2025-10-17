"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cardVariants } from "@/lib/animations";
import type { Product } from "@/lib/types/product";
import { Edit, Eye } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Memoized component for better performance
export const ProductCard = memo(function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoize formatted price
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.price);
  }, [product.price]);

  // Memoize image validity check
  const isValidImage = useMemo(() => {
    if (!product.images || product.images.length === 0) return false;
    const url = product.images[0];
    // Check if url is not null/undefined before calling startsWith
    if (!url) return false;
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  }, [product.images]);

  // Memoize navigation handlers
  const handleViewClick = useCallback(() => {
    router.push(`/dashboard/products/${product.slug}`);
  }, [router, product.slug]);

  const handleEditClick = useCallback(() => {
    router.push(`/dashboard/products/${product.slug}/edit`);
  }, [router, product.slug]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover="hover"
      whileTap="tap"
      custom={index}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group flex h-full flex-col overflow-hidden border-border/50 transition-colors hover:border-border p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {isValidImage && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 1.1,
                }}
                transition={{ duration: 0.6 }}
                className="h-full w-full"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  priority={index < 4}
                />
              </motion.div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-6xl">📦</span>
                <span className="text-xs text-muted-foreground">No image</span>
              </motion.div>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="absolute right-2 top-2 text-xs backdrop-blur-sm bg-black/50">
              {product.category.name}
            </Badge>
          </motion.div>
        </div>

        <CardContent className="flex-1 p-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-1 line-clamp-1 text-sm font-semibold transition-colors group-hover:text-primary"
          >
            {product.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground"
          >
            {product.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-base font-bold text-primary"
          >
            {formattedPrice}
          </motion.p>
        </CardContent>

        <CardFooter className="flex gap-2 border-t p-2 sm:p-3">
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 text-xs bg-transparent"
              onClick={handleViewClick}
            >
              <Eye className="h-3.5 w-3.5" />
              View
            </Button>
          </motion.div>
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="default"
              size="sm"
              className="w-full gap-1.5 text-xs"
              onClick={handleEditClick}
            >
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
});
