"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageVariants, scaleVariants } from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { login } from "@/lib/store/slices/auth-slice";
import { loginValidationSchema } from "@/lib/validations/auth";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false, // Don't validate on mount
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(login(values.email.trim())).unwrap();
      } catch (err) {
        // Error is handled by Redux slice
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Helper to check if field has error
  const hasEmailError = Boolean(formik.touched.email && formik.errors.email);
  const emailError =
    formik.touched.email && formik.errors.email
      ? String(formik.errors.email)
      : undefined;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eff1f3] via-[#e0e3e6] to-[#eff1f3] p-4"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #eff1f3 0%, #ffffff 50%, #e0e3e6 100%)",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <Card className="w-full max-w-md min-w-xs sm:min-w-lg border-border/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="show"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #4e6e5d 0%, #6b8577 100%)",
              }}
            >
              <Package className="h-7 w-7 text-[#eff1f3]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-balance text-2xl font-bold">
                Welcome Back
                <br />
                Product Management App
              </CardTitle>
              <CardDescription className="text-pretty mt-2">
                Enter your email to access the admin dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4"
              noValidate
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading || formik.isSubmitting}
                  className={`transition-all focus:ring-2 ${
                    hasEmailError ? "border-destructive" : ""
                  }`}
                  aria-invalid={hasEmailError}
                  aria-describedby={hasEmailError ? "email-error" : undefined}
                />
                <AnimatePresence mode="wait">
                  {emailError && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-destructive break-words"
                      role="alert"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                {error && !formik.isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert variant="destructive">
                      <AlertDescription className="break-words whitespace-normal">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: formik.isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: formik.isSubmitting ? 1 : 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || formik.isSubmitting}
                >
                  {loading || formik.isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2 h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                      />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
