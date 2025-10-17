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
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

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
        <Card className="w-full max-w-2xl border-destructive/20">
          <CardHeader className="text-center space-y-6 pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-destructive/10"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              >
                <AlertCircle
                  className="h-14 w-14 text-destructive"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <CardTitle className="text-3xl font-bold">
                Oops! Something Went Wrong
              </CardTitle>
              <CardDescription className="text-base">
                {error.message ||
                  "An unexpected error occurred in the dashboard."}
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
                Don't worry! Here's what you can try:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Click "Try Again" to reload the current page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Return to the dashboard home</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>If the problem persists, contact support</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={reset}
                  variant="default"
                  className="w-full gap-2"
                  size="lg"
                >
                  <RefreshCw className="h-4 w-4" />
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
                className="rounded-lg bg-muted p-4 text-xs"
              >
                <summary className="cursor-pointer font-semibold text-sm mb-2 hover:text-primary transition-colors">
                  Technical Details (Development Only)
                </summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="font-semibold text-xs text-muted-foreground mb-1">
                      Error Message:
                    </p>
                    <p className="text-destructive">{error.message}</p>
                  </div>
                  {error.digest && (
                    <div>
                      <p className="font-semibold text-xs text-muted-foreground mb-1">
                        Error Digest:
                      </p>
                      <p className="font-mono">{error.digest}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-xs text-muted-foreground mb-1">
                      Stack Trace:
                    </p>
                    <pre className="overflow-auto whitespace-pre-wrap text-xs leading-relaxed">
                      {error.stack}
                    </pre>
                  </div>
                </div>
              </motion.details>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
