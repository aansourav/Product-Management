"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { restoreAuth } from "@/lib/store/slices/auth-slice"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    // Try to restore auth from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      const email = localStorage.getItem("auth_email")

      if (token && email) {
        dispatch(restoreAuth({ token, email }))
      } else if (!isAuthenticated) {
        router.push("/login")
      }
    }
  }, [dispatch, isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
