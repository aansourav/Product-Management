import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
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

export type ProductFormValues = {
  name: string;
  description: string;
  price: number | string;
  categoryId: string;
  images: string[];
};
