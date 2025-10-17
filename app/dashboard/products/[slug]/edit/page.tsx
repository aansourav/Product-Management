"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchProductBySlug, clearCurrentProduct } from "@/lib/store/slices/products-slice"
import { ProductForm } from "@/components/products/product-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { pageVariants } from "@/lib/animations"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentProduct, loading, error } = useAppSelector((state) => state.products)
  const slug = params.slug as string

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug))
    }

    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [slug, dispatch])

  if (loading) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
            />
            <p className="text-muted-foreground">Loading product...</p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (error || !currentProduct) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error || "Product not found"}</AlertDescription>
          </Alert>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={() => router.push("/dashboard")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link href="/dashboard">
          <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Products</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </motion.div>
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-balance text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Edit Product
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-pretty text-muted-foreground mt-1"
        >
          Update product information
        </motion.p>
      </motion.div>

      <ProductForm mode="edit" product={currentProduct} />
    </motion.div>
  )
}
