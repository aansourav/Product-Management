"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function GettingStartedSection() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mx-auto max-w-3xl"
      >
        <Card
          className="border-border/50"
          style={{
            background:
              "linear-gradient(135deg, rgba(78, 110, 93, 0.05) 0%, rgba(173, 138, 100, 0.03) 100%)",
          }}
        >
          <CardContent className="p-8 sm:p-10 space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground">
                Sign in to access all features and start managing your products
                today.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-semibold text-xs"
                  style={{
                    background: "#4e6e5d",
                    color: "#eff1f3",
                  }}
                >
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
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-semibold text-xs"
                  style={{
                    background: "#4e6e5d",
                    color: "#eff1f3",
                  }}
                >
                  2
                </div>
                <div>
                  <p className="font-semibold mb-1">Access Dashboard</p>
                  <p className="text-muted-foreground">
                    Browse, search, and filter through all your products in the
                    dashboard.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-semibold text-xs"
                  style={{
                    background: "#4e6e5d",
                    color: "#eff1f3",
                  }}
                >
                  3
                </div>
                <div>
                  <p className="font-semibold mb-1">Manage Products</p>
                  <p className="text-muted-foreground">
                    Create new products, edit existing ones, or delete products
                    with a single click.
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
  );
}
