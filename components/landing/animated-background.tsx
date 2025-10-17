"use client";

import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
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
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(78, 110, 93, 0.15) 0%, transparent 70%)",
        }}
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
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(173, 138, 100, 0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
