"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  slug: string;
  onDelete: () => void;
}

export function ProductActions({ slug, onDelete }: ProductActionsProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <motion.div
        className="flex-1"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => router.push(`/dashboard/products/${slug}/edit`)}
          className="w-full gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Product
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="destructive"
          onClick={onDelete}
          className="w-full sm:w-auto gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </motion.div>
    </motion.div>
  );
}
