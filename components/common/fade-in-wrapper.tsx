"use client";

import { fadeInVariants } from "@/lib/animations";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reusable fade-in animation wrapper
 * Provides consistent fade-in animations across the app
 */
export function FadeInWrapper({
  children,
  delay = 0,
  className = "",
}: FadeInWrapperProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
