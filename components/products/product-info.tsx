"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface ProductInfoProps {
  name: string;
  categoryName: string;
  price: number;
  formatPrice: (price: number) => string;
}

export function ProductInfo({
  name,
  categoryName,
  price,
  formatPrice,
}: ProductInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          {name}
        </h1>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="secondary" className="shrink-0 text-sm w-fit">
            {categoryName}
          </Badge>
        </motion.div>
      </div>
      <motion.p
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="text-2xl font-bold text-primary sm:text-3xl"
      >
        {formatPrice(price)}
      </motion.p>
    </motion.div>
  );
}
