"use client";

import { ProductFormActions } from "@/components/products/product-form-actions";
import { ProductFormImages } from "@/components/products/product-form-images";
import { ProductFormInfo } from "@/components/products/product-form-info";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCategories } from "@/lib/store/slices/categories-slice";
import {
  clearError,
  createProduct,
  updateProduct,
} from "@/lib/store/slices/products-slice";
import type { CreateProductDto, Product } from "@/lib/types/product";
import {
  productValidationSchema,
  type ProductFormValues,
} from "@/lib/validations/product";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
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

  // Clear any existing errors on mount to prevent stale errors from previous pages
  useEffect(() => {
    dispatch(clearError());
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

      <ProductFormInfo
        formik={formik}
        categories={categories}
        hasFieldError={hasFieldError}
        getFieldError={getFieldError}
      />

      <ProductFormImages formik={formik} getFieldError={getFieldError} />

      <ProductFormActions mode={mode} isSubmitting={formik.isSubmitting} />
    </form>
  );
}
