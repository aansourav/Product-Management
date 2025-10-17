"use client";

import { DeleteProductDialog } from "@/components/products/delete-product-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { ArrowLeft, Calendar, Edit, Package2, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>([]);

  const isValidImageUrl = (url: string) => {
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  };

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
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {error || "Invalid product slug."}
            </AlertDescription>
          </Alert>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={() => router.push("/dashboard")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </motion.div>
        </motion.div>
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
          {currentProduct.images &&
          currentProduct.images.length > 0 &&
          isValidImageUrl(currentProduct.images[selectedImageIndex]) &&
          !imageError[selectedImageIndex] ? (
            <>
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square overflow-hidden rounded-lg border bg-muted shadow-lg"
              >
                <Image
                  src={currentProduct.images[selectedImageIndex]}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => {
                    setImageError((prev) => {
                      const newErrors = [...prev];
                      newErrors[selectedImageIndex] = true;
                      return newErrors;
                    });
                  }}
                />
              </motion.div>
              {currentProduct.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-4 gap-2 sm:gap-3"
                >
                  <AnimatePresence mode="popLayout">
                    {currentProduct.images.map((image, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImageIndex(index)}
                        disabled={!isValidImageUrl(image) || imageError[index]}
                        className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-muted transition-all ${
                          selectedImageIndex === index
                            ? "border-primary ring-2 ring-primary ring-offset-2 shadow-lg"
                            : "border-transparent hover:border-border"
                        } ${
                          !isValidImageUrl(image) || imageError[index]
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isValidImageUrl(image) && !imageError[index] ? (
                          <Image
                            src={image}
                            alt={`${currentProduct.name} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 12vw"
                            onError={() => {
                              setImageError((prev) => {
                                const newErrors = [...prev];
                                newErrors[index] = true;
                                return newErrors;
                              });
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package2 className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex aspect-square items-center justify-center rounded-lg border bg-gradient-to-br from-muted to-muted/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-3"
              >
                <Package2 className="h-24 w-24 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  No valid image
                </span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Right side - Product Information */}
        <motion.div
          variants={slideInRightVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                {currentProduct.name}
              </h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary" className="shrink-0 text-sm w-fit">
                  {currentProduct.category.name}
                </Badge>
              </motion.div>
            </div>
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-2xl font-bold text-primary sm:text-3xl"
            >
              {formatPrice(currentProduct.price)}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="mb-3 font-semibold text-lg">Description</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {currentProduct.description}
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
                    <span>Created: {formatDate(currentProduct.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Updated: {formatDate(currentProduct.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                onClick={() =>
                  router.push(`/dashboard/products/${currentProduct.slug}/edit`)
                }
                className="w-full gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Product
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="w-full sm:w-auto gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </motion.div>
          </motion.div>
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
