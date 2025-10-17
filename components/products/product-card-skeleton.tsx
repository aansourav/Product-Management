"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { memo } from "react";

interface ProductCardSkeletonProps {
  index?: number;
}

export const ProductCardSkeleton = memo(function ProductCardSkeleton({
  index = 0,
}: ProductCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="flex h-full flex-col overflow-hidden">
        <Skeleton className="aspect-[4/3] w-full" />

        <CardContent className="flex-1 px-3 pb-3 pt-0 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-5 w-1/3 mt-2" />
        </CardContent>

        <CardFooter className="flex gap-2 border-t p-3">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </CardFooter>
      </Card>
    </motion.div>
  );
});
