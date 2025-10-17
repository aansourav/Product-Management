"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Edit, Package, Search, Trash2, Zap } from "lucide-react";
import { motion } from "motion/react";

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

export function FeaturesSection() {
  return (
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
              <Card className="h-full border-border/50 transition-all hover:shadow-lg hover:border-[#4e6e5d]/30">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(78, 110, 93, 0.1)",
                    }}
                  >
                    <feature.icon
                      className="h-6 w-6"
                      style={{ color: "#4e6e5d" }}
                    />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
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
  );
}
