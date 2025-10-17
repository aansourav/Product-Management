"use client";

import { ImageUpload } from "@/components/products/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInVariants } from "@/lib/animations";
import type { ProductFormValues } from "@/lib/validations/product";
import type { FormikProps } from "formik";
import { AnimatePresence, motion } from "framer-motion";

interface ProductFormImagesProps {
  formik: FormikProps<ProductFormValues>;
  getFieldError: (field: keyof ProductFormValues) => string | undefined;
}

export function ProductFormImages({
  formik,
  getFieldError,
}: ProductFormImagesProps) {
  return (
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
  );
}
