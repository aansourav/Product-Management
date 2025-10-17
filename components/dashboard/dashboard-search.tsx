"use client";

import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { formatShortcut } from "@/hooks/use-keyboard-shortcuts";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef } from "react";

interface DashboardSearchProps {
  localSearch: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSearching: boolean;
}

export const DashboardSearch = forwardRef<
  HTMLInputElement,
  DashboardSearchProps
>(function DashboardSearch(
  { localSearch, onSearchChange, onClearSearch, isSearching },
  ref
) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
      <Input
        ref={ref}
        placeholder="Search products in real-time..."
        value={localSearch}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 pr-20 transition-all focus:ring-2"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {!localSearch && (
          <Kbd className="hidden sm:inline-flex text-xs">
            {formatShortcut("K")}
          </Kbd>
        )}
        <AnimatePresence>
          {localSearch && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClearSearch}
              className="text-muted-foreground hover:text-foreground transition-colors"
              type="button"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {isSearching && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
      )}
    </div>
  );
});
