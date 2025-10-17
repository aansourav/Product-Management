"use client";

import { DeleteProductDialog } from "@/components/products/delete-product-dialog";
import { ProductActions } from "@/components/products/product-actions";
import { ProductDetailsCard } from "@/components/products/product-details-card";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductNotFound } from "@/components/products/product-not-found";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  pageVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  clearCurrentProduct,
  deleteProduct,
  fetchProductBySlug,
} from "@/lib/store/slices/products-slice";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { currentProduct, loading, error } = useAppSelector(
    (state) => state.products
  );
  const slug = params.slug as string;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (slug === "new") {
      router.replace("/dashboard/products/new");
      return;
    }

    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [slug, dispatch, router]);

  const handleDelete = useCallback(async () => {
    if (!currentProduct) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteProduct(currentProduct.id)).unwrap();
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  }, [currentProduct, dispatch, router, toast]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  if (slug === "new") {
    return null;
  }

  if (loading) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
            />
            <p className="text-muted-foreground">Loading product...</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (error || !currentProduct) {
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate">
        <ProductNotFound error={error} />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link href="/dashboard">
          <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Products</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12">
        {/* Left side - Images */}
        <motion.div
          variants={slideInLeftVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <ProductImageGallery
            images={currentProduct.images}
            productName={currentProduct.name}
          />
        </motion.div>

        {/* Right side - Product Information */}
        <motion.div
          variants={slideInRightVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <ProductInfo
            name={currentProduct.name}
            categoryName={currentProduct.category.name}
            price={currentProduct.price}
            formatPrice={formatPrice}
          />

          <ProductDetailsCard
            description={currentProduct.description}
            createdAt={currentProduct.createdAt}
            updatedAt={currentProduct.updatedAt}
            formatDate={formatDate}
          />

          <ProductActions
            slug={currentProduct.slug}
            onDelete={() => setShowDeleteDialog(true)}
          />
        </motion.div>
      </div>

      <DeleteProductDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        productName={currentProduct.name}
        isDeleting={isDeleting}
      />
    </motion.div>
  );
}
