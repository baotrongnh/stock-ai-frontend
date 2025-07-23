import { UserServices } from "@/apis/user"
import { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import { login } from '../../apis/login'
import logo from "../../assets/logo/logo.svg"
import { GoogleButton } from "./components/GoogleButton.tsx"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) navigate('/blog')
  }, [navigate])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const res = await login(email, password)

      if (res?.access_token && res?.user?.userId) {
        localStorage.setItem("userId", res.user.userId)
        localStorage.setItem("accessToken", res.access_token)

        const userProfile = await UserServices.getUserById(res.userId)

        toast.success("Login successful!")

        navigate("/blog", { state: { user: userProfile.data } })

      } else {
        toast.error("Invalid email or password")
        setError("Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please try again.")
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-right" />

      <div className="flex w-[1000px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side */}
        <div className="w-6/12 bg-[#EF4444] flex flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-100 h-100 ml-30" />
        </div>

        {/* Right side */}
        <div className="w-6/12 flex flex-col justify-center px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign In</h2>
          <p className="text-gray-500 text-center mb-6">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="mb-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <span
                className="absolute right-4 top-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                  <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2" />
                </svg>
              </span>
            </div>

            <div className="flex justify-end mb-4">
              <a href="#" className="text-[#EF4444] text-sm hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-3 rounded-lg font-semibold transition mb-4 flex items-center justify-center ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#EF4444] hover:bg-[#DC2626]'
                }`}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Signing In...</span>
                </>
              ) : (
                <>
                  Sign In <span className="ml-2">&rarr;</span>
                </>
              )}
            </button>
          </form>

          {error && <div className="text-red-500 text-center mb-2">{error}</div>}

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="mx-2 text-gray-400">or continue with</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <GoogleButton />
            {/* <FacebookButton /> */}
          </div>

          <div className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link to='/register' className="text-[#EF4444] font-semibold hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
