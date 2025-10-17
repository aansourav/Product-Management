import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api/client"
import type { Category } from "@/lib/types/product"

interface CategoriesState {
  items: Category[]
  loading: boolean
  error: string | null
  lastFetch: number | null
  cacheValidityDuration: number
}

const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes (categories change less frequently)

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
  lastFetch: null,
  cacheValidityDuration: CACHE_DURATION,
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, { rejectWithValue }) => {
  const response = await apiClient.get<Category[]>("/categories")

  if (response.error) {
    return rejectWithValue(response.error)
  }

  return response.data!
})

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    invalidateCache: (state) => {
      state.lastFetch = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        // Only show loading if cache is invalid or doesn't exist
        if (!state.lastFetch || Date.now() - state.lastFetch > state.cacheValidityDuration) {
          state.loading = true
        }
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.lastFetch = Date.now()
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { invalidateCache } = categoriesSlice.actions

// Selector to check if cache is valid
export const selectIsCategoriesCacheValid = (state: { categories: CategoriesState }) => {
  const { lastFetch, cacheValidityDuration } = state.categories
  if (!lastFetch) return false
  return Date.now() - lastFetch < cacheValidityDuration
}

export default categoriesSlice.reducer
