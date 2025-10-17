"use client";

import { AnimatedBackground } from "@/components/landing/animated-background";
import { FeaturesSection } from "@/components/landing/features-section";
import { GettingStartedSection } from "@/components/landing/getting-started-section";
import { HeroSection } from "@/components/landing/hero-section";
import { LoadingRedirect } from "@/components/landing/loading-redirect";
import { pageVariants } from "@/lib/animations";
import { useAppSelector } from "@/lib/store/hooks";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Show landing page for non-authenticated users
  if (!isAuthenticated) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #eff1f3 0%, #ffffff 50%, #e0e3e6 100%)",
        }}
      >
        <HeroSection />
        <FeaturesSection />
        <GettingStartedSection />
        <AnimatedBackground />
      </motion.div>
    );
  }

  // Loading state for authenticated users
  return <LoadingRedirect />;
}
