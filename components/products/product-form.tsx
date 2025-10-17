"use client";

import { ImageUpload } from "@/components/products/image-upload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fadeInVariants } from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCategories } from "@/lib/store/slices/categories-slice";
import {
  createProduct,
  updateProduct,
} from "@/lib/store/slices/products-slice";
import type { CreateProductDto, Product } from "@/lib/types/product";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Yup from "yup";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

// Validation Schema using Yup
const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be greater than 0")
    .min(0.01, "Price must be at least $0.01")
    .max(999999.99, "Price must not exceed $999,999.99")
    .test(
      "decimal-places",
      "Price can have at most 2 decimal places",
      (value) => {
        if (value === undefined || value === null) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }
    ),
  categoryId: Yup.string()
    .required("Category is required")
    .min(1, "Category is required"),
  images: Yup.array()
    .of(
      Yup.string()
        .required("Image URL is required")
        .test("valid-image-url", "Invalid image URL", (value) => {
          if (!value) return false;
          // Accept http/https URLs or data URIs or any path starting with /
          return (
            value.startsWith("http://") ||
            value.startsWith("https://") ||
            value.startsWith("data:image/") ||
            value.startsWith("/") ||
            value.length > 0 // Accept any non-empty string as fallback
          );
        })
    )
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
    .required("At least one image is required"),
});

// Form values type
interface ProductFormValues {
  name: string;
  description: string;
  price: number | string;
  categoryId: string;
  images: string[];
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { error: reduxError } = useAppSelector((state) => state.products);
  const { items: categories } = useAppSelector((state) => state.categories);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Initialize Formik
  const formik = useFormik<ProductFormValues>({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      categoryId: product?.category.id || "",
      images: product?.images || [],
    },
    validationSchema: productValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: mode === "edit", // Validate on mount for edit mode
    enableReinitialize: mode === "edit", // Allow form to reinitialize when editing
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const productData: CreateProductDto = {
          name: values.name.trim(),
          description: values.description.trim(),
          price:
            typeof values.price === "string"
              ? parseFloat(values.price)
              : values.price,
          categoryId: values.categoryId,
          images: values.images,
        };

        if (mode === "create") {
          const createdProduct = await dispatch(
            createProduct(productData)
          ).unwrap();

          toast({
            title: "Success",
            description: "Product created successfully",
          });

          router.push(`/dashboard/products/${createdProduct.slug}`);
        } else if (product) {
          const updatedProduct = await dispatch(
            updateProduct({ id: product.id, data: productData })
          ).unwrap();

          toast({
            title: "Success",
            description: "Product updated successfully",
          });

          router.push(`/dashboard/products/${updatedProduct.slug}`);
        }
      } catch (err: any) {
        // Handle specific field errors if returned from API
        if (err?.fieldErrors) {
          Object.entries(err.fieldErrors).forEach(([field, message]) => {
            setFieldError(field, message as string);
          });
        }

        toast({
          title: "Error",
          description: err?.message || reduxError || "Failed to save product",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Helper to get error message for a field
  const getFieldError = (
    fieldName: keyof ProductFormValues
  ): string | undefined => {
    return formik.touched[fieldName] && formik.errors[fieldName]
      ? String(formik.errors[fieldName])
      : undefined;
  };

  // Helper to check if field has error
  const hasFieldError = (fieldName: keyof ProductFormValues): boolean => {
    return Boolean(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
      {/* Global Error Alert */}
      <AnimatePresence>
        {reduxError && !formik.isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive">
              <AlertDescription>{reduxError}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Information Card */}
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter product name"
                disabled={formik.isSubmitting}
                className={hasFieldError("name") ? "border-destructive" : ""}
                aria-invalid={hasFieldError("name")}
                aria-describedby={
                  hasFieldError("name") ? "name-error" : undefined
                }
              />
              <AnimatePresence mode="wait">
                {getFieldError("name") && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {getFieldError("name")}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter product description"
                rows={4}
                disabled={formik.isSubmitting}
                className={
                  hasFieldError("description") ? "border-destructive" : ""
                }
                aria-invalid={hasFieldError("description")}
                aria-describedby={
                  hasFieldError("description") ? "description-error" : undefined
                }
              />
              <AnimatePresence mode="wait">
                {getFieldError("description") && (
                  <motion.p
                    id="description-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {getFieldError("description")}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Price and Category */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="0.00"
                  disabled={formik.isSubmitting}
                  className={hasFieldError("price") ? "border-destructive" : ""}
                  aria-invalid={hasFieldError("price")}
                  aria-describedby={
                    hasFieldError("price") ? "price-error" : undefined
                  }
                />
                <AnimatePresence mode="wait">
                  {getFieldError("price") && (
                    <motion.p
                      id="price-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {getFieldError("price")}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formik.values.categoryId}
                  onValueChange={async (value) => {
                    // Set value first, then mark as touched to ensure proper validation order
                    await formik.setFieldValue("categoryId", value, true);
                    formik.setFieldTouched("categoryId", true, false);
                  }}
                  disabled={formik.isSubmitting}
                >
                  <SelectTrigger
                    id="category"
                    className={
                      hasFieldError("categoryId") ? "border-destructive" : ""
                    }
                    aria-invalid={hasFieldError("categoryId")}
                    aria-describedby={
                      hasFieldError("categoryId") ? "category-error" : undefined
                    }
                    onBlur={() => formik.setFieldTouched("categoryId", true)}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <AnimatePresence mode="wait">
                  {getFieldError("categoryId") && (
                    <motion.p
                      id="category-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {getFieldError("categoryId")}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Product Images Card */}
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              images={formik.values.images}
              onChange={async (images) => {
                // Set value first, then mark as touched to ensure proper validation order
                await formik.setFieldValue("images", images, true);
                formik.setFieldTouched("images", true, false);
              }}
              disabled={formik.isSubmitting}
            />
            <AnimatePresence mode="wait">
              {getFieldError("images") && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-sm text-destructive"
                  role="alert"
                >
                  {getFieldError("images")}
                </motion.p>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row sm:gap-4"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={formik.isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </motion.div>
        <motion.div
          className="flex-1"
          whileHover={{ scale: formik.isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: formik.isSubmitting ? 1 : 0.98 }}
        >
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full"
          >
            {formik.isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                />
                Saving...
              </>
            ) : mode === "create" ? (
              "Create Product"
            ) : (
              "Update Product"
            )}
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
}
