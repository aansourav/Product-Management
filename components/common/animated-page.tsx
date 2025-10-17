"use client";

import { pageVariants } from "@/lib/animations";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable page wrapper with consistent enter/exit animations
 * Use this instead of wrapping every page with motion.div
 */
export function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
