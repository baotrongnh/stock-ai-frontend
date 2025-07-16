import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react"
import { loginAdmin } from "@/apis/admin"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

// Style overrides to ensure light mode even when dark mode is active in the system
import "./admin-styles.css"

export default function AdminLogin() {
     const navigate = useNavigate()
     const [formData, setFormData] = useState({
          username: "",
          password: "",
          email: ''
     })
     const [showPassword, setShowPassword] = useState(false)
     const [error, setError] = useState("")
     const [isLoading, setIsLoading] = useState(false)

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }))
          // Clear error when user starts typing
          if (error) setError("")
     }

     const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault()
          setIsLoading(true)
          setError("")
          const res = await loginAdmin(formData)
          if (!res?.data.error) {
               localStorage.setItem('adminToken', res?.data.data.access_token)
               toast.success(res?.data.message)
               navigate('/admin')
          }
          setIsLoading(false)
     }

     return (
          <div className="min-h-screen w-full bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4 admin-login-page">
               <div className="w-full max-w-md">
                    <Card className="border-red-200 shadow-xl bg-white admin-login-card">
                         <CardHeader className="space-y-4 text-center bg-white admin-login-card-header">
                              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                                   <Shield className="h-8 w-8 text-white" />
                              </div>
                              <div>
                                   <CardTitle className="text-2xl font-bold text-red-900 admin-login-title">Admin Login</CardTitle>
                                   <CardDescription className="text-red-700 admin-login-description">Sign in to access the admin dashboard</CardDescription>
                              </div>
                         </CardHeader>

                         <CardContent className="bg-white admin-login-card-content">
                              <form onSubmit={handleLogin} className="space-y-4">
                                   {error && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                             <AlertCircle className="h-4 w-4 text-red-600" />
                                             <AlertDescription className="text-red-800">{error}</AlertDescription>
                                        </Alert>
                                   )}

                                   <div className="space-y-2">
                                        <Label htmlFor="username" className="text-red-900 font-medium admin-login-label">
                                             Username
                                        </Label>
                                        <Input
                                             id="username"
                                             name="username"
                                             placeholder="Username admin"
                                             value={formData.username}
                                             onChange={handleInputChange}
                                             required
                                             className="border-red-200 focus:border-red-400 focus:ring-red-400 bg-white text-gray-900 admin-login-input"
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <Label htmlFor="password" className="text-red-900 font-medium admin-login-label">
                                             Password
                                        </Label>
                                        <div className="relative">
                                             <Input
                                                  id="password"
                                                  name="password"
                                                  type={showPassword ? "text" : "password"}
                                                  placeholder="Enter your password"
                                                  value={formData.password}
                                                  onChange={handleInputChange}
                                                  required
                                                  className="border-red-200 focus:border-red-400 focus:ring-red-400 pr-10 bg-white text-gray-900 admin-login-input"
                                             />
                                             <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="sm"
                                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-red-600"
                                                  onClick={() => setShowPassword(!showPassword)}
                                             >
                                                  {showPassword ? (
                                                       <EyeOff className="h-4 w-4 text-red-600" />
                                                  ) : (
                                                       <Eye className="h-4 w-4 text-red-600" />
                                                  )}
                                             </Button>
                                        </div>
                                   </div>

                                   <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 focus:ring-red-500 admin-login-button"
                                   >
                                        {isLoading ? "Signing in..." : "Sign In"}
                                   </Button>
                              </form>
                         </CardContent>
                    </Card>
               </div>
          </div>
     )
}
