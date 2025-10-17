"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductNotFoundProps {
  error?: string | null;
}

export function ProductNotFound({ error }: ProductNotFoundProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-destructive/20 shadow-2xl">
            <CardContent className="pt-12 pb-8 px-6 sm:px-8">
              <div className="text-center space-y-6">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 12,
                  }}
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-destructive/20 to-destructive/5"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Package2 className="h-14 w-14 text-destructive" />
                  </motion.div>
                </motion.div>

                {/* Title & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    Product Not Found
                  </h1>
                  <p className="text-base text-muted-foreground max-w-md mx-auto">
                    {error ||
                      "The product slug you're looking for is invalid or doesn't exist."}
                  </p>
                </motion.div>

                {/* Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg bg-muted/50 p-6 space-y-3 text-left"
                >
                  <h3 className="font-semibold text-sm text-muted-foreground text-center">
                    What you can do:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        Check the URL for any typos in the product slug
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        Return to the dashboard and browse all products
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Use the search feature to find the product</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        Contact support if you believe this is an error
                      </span>
                    </li>
                  </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => router.push("/dashboard")}
                      size="lg"
                      className="w-full sm:w-auto gap-2 min-w-[160px]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Products
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => router.push("/dashboard/products/new")}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto gap-2 min-w-[160px]"
                    >
                      <Package2 className="h-4 w-4" />
                      Create New Product
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Additional Help */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 border-t"
                >
                  <p className="text-sm text-muted-foreground">
                    Need help finding a specific product?{" "}
                    <Link
                      href="/dashboard"
                      className="font-medium text-primary hover:underline"
                    >
                      Browse all products
                    </Link>
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-destructive/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-destructive/10 to-transparent rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
