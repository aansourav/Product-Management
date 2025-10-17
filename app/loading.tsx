"use client";

import { Loader2, Package } from "lucide-react";
import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg"
        >
          <Package className="h-10 w-10 text-primary-foreground" />

          {/* Pulse effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-2xl bg-primary"
          />
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2 className="h-8 w-8 text-primary" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2"
        >
          <p className="text-lg font-semibold text-foreground">Loading...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </motion.div>

        {/* Animated dots */}
        <motion.div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
