"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageVariants, scaleVariants } from "@/lib/animations";
import { Home, Package } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <Card className="w-full min-w-xs sm:min-w-lg border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="show"
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/50"
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              >
                <Package className="h-16 w-16 text-muted-foreground" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-4">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                >
                  404
                </motion.span>
              </div>
              <CardTitle className="text-3xl font-bold">
                Page Not Found
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Oops! The page you're looking for doesn't exist or has been
                moved.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Link href="/dashboard" className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full gap-2" size="lg">
                    <Home className="h-4 w-4" />
                    Go to Dashboard
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Need help? Check our{" "}
                <Link
                  href="/dashboard"
                  className="font-medium text-primary hover:underline"
                >
                  product catalog
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
}
