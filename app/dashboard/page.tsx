"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSearch } from "@/components/dashboard/dashboard-search";
import { ProductsEmptyState } from "@/components/dashboard/products-empty-state";
import { ProductsGrid } from "@/components/dashboard/products-grid";
import { ProductsPagination } from "@/components/dashboard/products-pagination";
import { ProductsFilter } from "@/components/products/products-filter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDebounce } from "@/hooks/use-debounce";
import { pageVariants } from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCategories } from "@/lib/store/slices/categories-slice";
import {
  fetchProducts,
  searchProducts,
  setCurrentPage,
  setSearchQuery,
} from "@/lib/store/slices/products-slice";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
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
  const isSearching = debouncedSearch !== localSearch && !!localSearch;

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
      <DashboardHeader />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex flex-col gap-4 md:flex-row"
      >
        <div className="flex flex-1 gap-2">
          <DashboardSearch
            localSearch={localSearch}
            onSearchChange={setLocalSearch}
            onClearSearch={handleClearSearch}
            isSearching={isSearching}
          />
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

      {products.length === 0 && !loading ? (
        <ProductsEmptyState
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onResetSearch={handleResetSearch}
        />
      ) : (
        <>
          <ProductsGrid products={paginatedProducts} loading={loading} />
          <ProductsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </motion.div>
  );
}
