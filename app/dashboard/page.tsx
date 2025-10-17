"use client";

import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { ProductsFilter } from "@/components/products/products-filter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { containerVariants, pageVariants } from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCategories } from "@/lib/store/slices/categories-slice";
import {
  fetchProducts,
  searchProducts,
  setCurrentPage,
  setSearchQuery,
} from "@/lib/store/slices/products-slice";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading,
    error,
    searchQuery,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.products);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Debounce the search input for real-time search
  const debouncedSearch = useDebounce(localSearch, 400);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ offset: 0, limit: 100 }));
  }, [dispatch]);

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      dispatch(setCurrentPage(1));
      dispatch(
        fetchProducts({
          offset: 0,
          limit: 100,
          categoryId: categoryId || undefined,
        })
      );
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    setLocalSearch("");
    setSelectedCategory("");
    dispatch(setSearchQuery(""));
    dispatch(setCurrentPage(1));
    dispatch(fetchProducts({ offset: 0, limit: 100 }));
  }, [dispatch]);

  const handleResetSearch = useCallback(() => {
    setLocalSearch("");
    dispatch(setSearchQuery(""));
    dispatch(setCurrentPage(1));
    if (selectedCategory) {
      dispatch(
        fetchProducts({ offset: 0, limit: 100, categoryId: selectedCategory })
      );
    } else {
      dispatch(fetchProducts({ offset: 0, limit: 100 }));
    }
  }, [dispatch, selectedCategory]);

  const handleClearSearch = useCallback(() => {
    setLocalSearch("");
  }, []);

  // Real-time debounced search - simplified dependencies
  useEffect(() => {
    if (debouncedSearch) {
      dispatch(setSearchQuery(debouncedSearch));
      dispatch(searchProducts(debouncedSearch));
      dispatch(setCurrentPage(1));
    } else if (searchQuery && !debouncedSearch) {
      // If search is cleared, reset to all products
      setLocalSearch("");
      dispatch(setSearchQuery(""));
      dispatch(setCurrentPage(1));
      if (selectedCategory) {
        dispatch(
          fetchProducts({ offset: 0, limit: 100, categoryId: selectedCategory })
        );
      } else {
        dispatch(fetchProducts({ offset: 0, limit: 100 }));
      }
    }
  }, [debouncedSearch]); // Intentionally minimal dependencies to avoid loops

  // Memoized pagination calculations
  const { totalPages, paginatedProducts } = useMemo(() => {
    const total = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = products.slice(startIndex, endIndex);
    return { totalPages: total, paginatedProducts: paginated };
  }, [products, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch]
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Products
          </h1>
          <p className="text-pretty text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push("/dashboard/products/new")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex flex-col gap-4 md:flex-row"
      >
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
            <Input
              placeholder="Search products in real-time..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 pr-9 transition-all focus:ring-2"
            />
            <AnimatePresence>
              {localSearch && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
            {debouncedSearch && debouncedSearch !== localSearch && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              </div>
            )}
          </div>
        </div>
        <ProductsFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onClearFilters={handleClearFilters}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} index={index} />
          ))}
        </motion.div>
      ) : products.length === 0 ? (
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleResetSearch}
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4" />
                  {selectedCategory ? "Clear Search" : "Show All Products"}
                </Button>
              </motion.div>
            )}
            {!searchQuery && !selectedCategory && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4 grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              </motion.div>

              <div className="flex items-center gap-1 flex-wrap">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <motion.div
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
