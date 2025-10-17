"use client";

import { Button } from "@/components/ui/button";
import { fadeInVariants } from "@/lib/animations";
import { ArrowRight, LogIn, Package, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl text-center space-y-8"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #4e6e5d 0%, #6b8577 100%)",
          }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Package className="h-12 w-12 text-[#eff1f3]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Product Management
            </h1>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="h-8 w-8 text-primary hidden sm:block" />
            </motion.div>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            The modern way to manage your products. Create, organize, and track
            your inventory with ease.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="gap-2 text-base px-8 py-6">
                <LogIn className="h-5 w-5" />
                Sign In to Continue
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Shield className="h-4 w-4" style={{ color: "#4e6e5d" }} />
          <span>Secure • Fast • Reliable</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
