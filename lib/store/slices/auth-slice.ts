import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api/client"

interface AuthState {
  token: string | null
  email: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: null,
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const login = createAsyncThunk("auth/login", async (email: string, { rejectWithValue }) => {
  const response = await apiClient.post<{ token: string }>("/auth", { email })

  if (response.error) {
    return rejectWithValue(response.error)
  }

  return { token: response.data!.token, email }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.email = null
      state.isAuthenticated = false
      apiClient.clearToken()
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_email")
      }
    },
    restoreAuth: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state.isAuthenticated = true
      apiClient.setToken(action.payload.token)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.email = action.payload.email
        state.isAuthenticated = true
        apiClient.setToken(action.payload.token)

        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", action.payload.token)
          localStorage.setItem("auth_email", action.payload.email)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, restoreAuth } = authSlice.actions
export default authSlice.reducer
