"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageVariants } from "@/lib/animations";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-destructive/5 to-background p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <Card className="w-full max-w-lg border-destructive/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
            >
              <motion.div
                animate={{
                  rotate: [0, -5, 5, -5, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-2xl font-bold">
                Something Went Wrong
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {error.message ||
                  "An unexpected error occurred. Please try again."}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={reset}
                  className="w-full gap-2"
                  size="lg"
                  variant="default"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Try Again
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => (window.location.href = "/dashboard")}
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                >
                  <Home className="h-4 w-4" />
                  Go to Dashboard
                </Button>
              </motion.div>
            </motion.div>

            {process.env.NODE_ENV === "development" && error.stack && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 rounded-lg bg-muted p-4 text-xs"
              >
                <summary className="cursor-pointer font-semibold text-sm mb-2 hover:text-primary transition-colors">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs leading-relaxed">
                  {error.stack}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-muted-foreground">
                    <span className="font-semibold">Error Digest:</span>{" "}
                    {error.digest}
                  </p>
                )}
              </motion.details>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-2 text-center"
            >
              <p className="text-sm text-muted-foreground">
                If this problem persists, please contact support
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
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-destructive/10 to-transparent rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
}
