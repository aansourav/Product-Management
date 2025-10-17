"use client";

import { Package2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>([]);

  const isValidImageUrl = (url: string) => {
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  };

  const hasValidImages =
    images &&
    images.length > 0 &&
    isValidImageUrl(images[selectedImageIndex]) &&
    !imageError[selectedImageIndex];

  if (!hasValidImages) {
    return (
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
          <span className="text-sm text-muted-foreground">No valid image</span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        key={selectedImageIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-square overflow-hidden rounded-lg border bg-muted shadow-lg"
      >
        <Image
          src={images[selectedImageIndex]}
          alt={productName}
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
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-2 sm:gap-3"
        >
          <AnimatePresence mode="popLayout">
            {images.map((image, index) => (
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
                    alt={`${productName} ${index + 1}`}
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
  );
}
