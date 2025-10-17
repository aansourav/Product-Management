"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface DashboardSearchProps {
  localSearch: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSearching: boolean;
}

export function DashboardSearch({
  localSearch,
  onSearchChange,
  onClearSearch,
  isSearching,
}: DashboardSearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
      <Input
        placeholder="Search products in real-time..."
        value={localSearch}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 pr-9 transition-all focus:ring-2"
      />
      <AnimatePresence>
        {localSearch && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      {isSearching && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
      )}
    </div>
  );
}
