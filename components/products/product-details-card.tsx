"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";

interface ProductDetailsCardProps {
  description: string;
  createdAt: string;
  updatedAt: string;
  formatDate: (date: string) => string;
}

export function ProductDetailsCard({
  description,
  createdAt,
  updatedAt,
  formatDate,
}: ProductDetailsCardProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-3 font-semibold text-lg">Description</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-3 font-semibold text-lg">Product Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Created: {formatDate(createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Updated: {formatDate(updatedAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
