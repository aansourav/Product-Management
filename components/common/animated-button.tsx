"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { motion } from "motion/react";
import { forwardRef, type ReactNode } from "react";

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  whileHoverScale?: number;
  whileTapScale?: number;
}

/**
 * Reusable animated button component
 * Wraps Button with consistent hover/tap animations
 */
export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    { children, whileHoverScale = 1.02, whileTapScale = 0.98, ...props },
    ref
  ) => {
    return (
      <motion.div
        whileHover={{ scale: whileHoverScale }}
        whileTap={{ scale: whileTapScale }}
        className="w-full"
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
