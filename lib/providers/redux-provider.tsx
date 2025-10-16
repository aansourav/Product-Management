"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store/store"
import { useEffect } from "react"
import { restoreAuth } from "@/lib/store/slices/auth-slice"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore auth from localStorage on mount
    const token = localStorage.getItem("auth_token")
    const email = localStorage.getItem("auth_email")

    if (token && email) {
      store.dispatch(restoreAuth({ token, email }))
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
