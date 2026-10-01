import axios from 'axios'

export const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true, timeout: 10000, headers: { 'Content-Type': 'application/json' } })
apiClient.interceptors.response.use((response) => response, (error: unknown) => Promise.reject(error))
