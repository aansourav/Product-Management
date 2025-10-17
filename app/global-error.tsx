"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html>
      <body>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-red-950/20 to-zinc-950 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <Card className="w-full max-w-lg border-red-500/20 bg-zinc-900 shadow-2xl">
              <CardHeader className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10"
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
                    <AlertTriangle className="h-12 w-12 text-red-500" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle className="text-2xl font-bold text-white">
                    Critical Error
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-zinc-400">
                    A critical error has occurred. The application needs to
                    reload.
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
                      className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white"
                      size="lg"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reload Application
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => (window.location.href = "/")}
                      variant="outline"
                      className="w-full gap-2 border-zinc-700 text-white hover:bg-zinc-800"
                      size="lg"
                    >
                      <Home className="h-4 w-4" />
                      Go to Home
                    </Button>
                  </motion.div>
                </motion.div>

                {process.env.NODE_ENV === "development" && error.stack && (
                  <motion.details
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 rounded-lg bg-zinc-800 p-4 text-xs"
                  >
                    <summary className="cursor-pointer font-semibold text-sm mb-2 text-red-400 hover:text-red-300 transition-colors">
                      Error Details (Development Only)
                    </summary>
                    <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-zinc-300">
                      {error.stack}
                    </pre>
                    {error.digest && (
                      <p className="mt-2 text-zinc-400">
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
                  <p className="text-sm text-zinc-500">
                    Critical errors are logged automatically
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </body>
    </html>
  );
}
