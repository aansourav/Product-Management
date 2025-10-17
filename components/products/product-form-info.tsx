"use client";

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
import { fadeInVariants } from "@/lib/animations";
import type { ProductFormValues } from "@/lib/validations/product";
import type { FormikProps } from "formik";
import { AnimatePresence, motion } from "framer-motion";

interface ProductFormInfoProps {
  formik: FormikProps<ProductFormValues>;
  categories: Array<{ id: string; name: string }>;
  hasFieldError: (field: keyof ProductFormValues) => boolean;
  getFieldError: (field: keyof ProductFormValues) => string | undefined;
}

export function ProductFormInfo({
  formik,
  categories,
  hasFieldError,
  getFieldError,
}: ProductFormInfoProps) {
  return (
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
  );
}
