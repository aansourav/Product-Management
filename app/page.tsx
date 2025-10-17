"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInVariants, pageVariants } from "@/lib/animations";
import { useAppSelector } from "@/lib/store/hooks";
import {
  ArrowRight,
  BarChart3,
  Edit,
  LogIn,
  Package,
  Search,
  Shield,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const features = [
  {
    icon: Package,
    title: "Product Management",
    description:
      "Create, edit, and organize your products with a beautiful and intuitive interface.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find products instantly with real-time search and category filtering.",
  },
  {
    icon: Edit,
    title: "Easy Editing",
    description:
      "Update product information seamlessly with our user-friendly forms and validation.",
  },
  {
    icon: Trash2,
    title: "Safe Deletion",
    description:
      "Delete products with confidence using our confirmation dialogs and soft-delete features.",
  },
  {
    icon: BarChart3,
    title: "Data Insights",
    description:
      "Track product performance and manage your inventory with detailed analytics.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance with caching, pagination, and instant updates.",
  },
];

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
        className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background"
      >
        {/* Hero Section */}
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
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-2xl"
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
                <Package className="h-12 w-12 text-primary-foreground" />
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
                The modern way to manage your products. Create, organize, and
                track your inventory with ease.
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure • Fast • Reliable</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mx-auto max-w-6xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your products efficiently in one
                place.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Instructions Section */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mx-auto max-w-3xl"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8 sm:p-10 space-y-6">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Ready to Get Started?
                  </h2>
                  <p className="text-muted-foreground">
                    Sign in to access all features and start managing your
                    products today.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      1
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Sign In</p>
                      <p className="text-muted-foreground">
                        Click the "Sign In" button and enter your email to
                        authenticate.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      2
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Access Dashboard</p>
                      <p className="text-muted-foreground">
                        Browse, search, and filter through all your products in
                        the dashboard.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      3
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Manage Products</p>
                      <p className="text-muted-foreground">
                        Create new products, edit existing ones, or delete
                        products with a single click.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <Link href="/login">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button size="lg" className="gap-2 w-full sm:w-auto">
                        <LogIn className="h-4 w-4" />
                        Sign In Now
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Animated background elements */}
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
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
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
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    );
  }

  // Loading state for authenticated users
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
        />
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </motion.div>
    </div>
  );
}
