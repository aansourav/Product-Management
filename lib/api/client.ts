const API_BASE_URL = "https://api.bitechx.com"

interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string) {
    this.token = token
  }

  clearToken() {
    this.token = null
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status

    try {
      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.message || "An error occurred",
          status,
        }
      }

      return {
        data,
        status,
      }
    } catch (error) {
      return {
        error: "Failed to parse response",
        status,
      }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: this.getHeaders(),
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      return {
        error: "Network error occurred",
        status: 0,
      }
    }
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      return {
        error: "Network error occurred",
        status: 0,
      }
    }
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      return {
        error: "Network error occurred",
        status: 0,
      }
    }
  }

  async delete<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      })

      return this.handleResponse<T>(response)
    } catch (error) {
      return {
        error: "Network error occurred",
        status: 0,
      }
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
