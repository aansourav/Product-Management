"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fadeInVariants, pageVariants } from "@/lib/animations";
import { ArrowLeft, Home, Package2, Search } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="container mx-auto px-4 py-12"
    >
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <Card className="w-full max-w-2xl border-border/50">
          <CardHeader className="text-center space-y-6 pb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Package2 className="h-16 w-16 text-primary" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <CardTitle className="text-4xl font-bold">
                Product Not Found
              </CardTitle>
              <CardDescription className="text-base">
                The product you're looking for doesn't exist or may have been
                removed.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-muted/50 p-6 space-y-3"
            >
              <h3 className="font-semibold text-sm text-muted-foreground">
                What you can do:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Check the product URL for any typos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Browse all products in the dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use the search feature to find similar products</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              <Link href="/dashboard" className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="default" className="w-full gap-2" size="lg">
                    <Home className="h-4 w-4" />
                    All Products
                  </Button>
                </motion.div>
              </Link>

              <Link href="/dashboard/products/new" className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    <Search className="h-4 w-4" />
                    Create New Product
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2 text-center"
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Dashboard
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
