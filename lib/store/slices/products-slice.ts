import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api/client"
import type { Product, CreateProductDto, UpdateProductDto } from "@/lib/types/product"

interface ProductsState {
  items: Product[]
  currentProduct: Product | null
  loading: boolean
  error: string | null
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  totalItems: number
  lastFetch: number | null
  cacheValidityDuration: number // in milliseconds
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  lastFetch: null,
  cacheValidityDuration: CACHE_DURATION,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { offset = 0, limit = 12, categoryId }: { offset?: number; limit?: number; categoryId?: string },
    { rejectWithValue },
  ) => {
    let endpoint = `/products?offset=${offset}&limit=${limit}`
    if (categoryId) {
      endpoint += `&categoryId=${categoryId}`
    }

    const response = await apiClient.get<Product[]>(endpoint)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    return response.data!
  },
)

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchText: string, { rejectWithValue }) => {
    const response = await apiClient.get<Product[]>(`/products/search?searchedText=${encodeURIComponent(searchText)}`)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    return response.data!
  },
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string, { rejectWithValue }) => {
    const response = await apiClient.get<Product>(`/products/${slug}`)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    return response.data!
  },
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: CreateProductDto, { rejectWithValue }) => {
    const response = await apiClient.post<Product>("/products", productData)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    return response.data!
  },
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: string; data: UpdateProductDto }, { rejectWithValue }) => {
    const response = await apiClient.put<Product>(`/products/${id}`, data)

    if (response.error) {
      return rejectWithValue(response.error)
    }

    return response.data!
  },
)

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string, { rejectWithValue }) => {
  const response = await apiClient.delete<Product>(`/products/${id}`)

  if (response.error) {
    return rejectWithValue(response.error)
  }

  return id
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    invalidateCache: (state) => {
      state.lastFetch = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.totalItems = action.payload.length
        state.lastFetch = Date.now()
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch product by slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items.unshift(action.payload)
        state.lastFetch = null // Invalidate cache
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.currentProduct = action.payload
        state.lastFetch = null // Invalidate cache
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Delete product - with optimistic update
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((p) => p.id !== action.payload)
        state.lastFetch = null // Invalidate cache
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSearchQuery, setCurrentPage, clearCurrentProduct, invalidateCache } = productsSlice.actions

// Selector to check if cache is valid
export const selectIsCacheValid = (state: { products: ProductsState }) => {
  const { lastFetch, cacheValidityDuration } = state.products
  if (!lastFetch) return false
  return Date.now() - lastFetch < cacheValidityDuration
}

export default productsSlice.reducer
