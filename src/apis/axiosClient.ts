import type { AxiosError, AxiosResponse } from 'axios'
import axios from "axios"

const axiosClient = axios.create({
     baseURL: import.meta.env.VITE_APP_API_URL as string,
     headers: {},
     // Prevent axios from following redirects automatically
     maxRedirects: 0,
     // Increase timeout for debugging
     timeout: 30000,
     // Additional debugging
     validateStatus: function (status) {
          // Log all status codes for debugging
          console.log('API Response Status:', status)
          if (status >= 300 && status < 400) {
               console.warn('REDIRECT STATUS DETECTED:', status)
          }
          // Accept all status codes to prevent axios from throwing errors
          return true
     }
})

axiosClient.interceptors.request.use(
     (config) => {
          console.log('Request config:', {
               url: config.url,
               method: config.method,
               headers: config.headers,
               data: config.data instanceof FormData ? 'FormData (cannot display)' : config.data
          })

          const token = localStorage.getItem("accessToken")
          const tokenAdmin = localStorage.getItem("adminToken")
          if (tokenAdmin) {
               config.headers["Authorization"] = `Bearer ${tokenAdmin}`
          } else if (token) {
               config.headers["Authorization"] = `Bearer ${token}`
          }
          return config
     },
     (error) => {
          console.error('Request error:', error)
          return Promise.reject(error)
     }
)

axiosClient.interceptors.response.use(
     (response: AxiosResponse) => {
          console.log('Response:', {
               status: response.status,
               statusText: response.statusText,
               headers: response.headers,
               data: response.data
          })
          return response
     },
     (error: AxiosError) => {
          console.error('Response error:', {
               status: error.response?.status,
               statusText: error.response?.statusText,
               headers: error.response?.headers,
               data: error.response?.data,
               message: error.message
          })
          return Promise.reject(error)
     }
)

export default axiosClient