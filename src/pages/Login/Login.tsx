import { useState } from "react"
import { useNavigate } from "react-router";
import logo from "../../assets/logo/logo.svg"
import { GoogleButton } from "./components/GoogleButton"
import { FacebookButton } from "./components/FacebookButton"
import { login } from '../../apis/login'
import { UserServices } from "@/apis/user";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    const res = await login(email, password);
    console.log(res); // Debug: see what is returned
    if (res?.data?.access_token && res?.data.user?.userId) {
      localStorage.setItem("userId", res.data.user.userId);
      localStorage.setItem("access_token", res.data.access_token);
      const userProfile = await UserServices.getUserById(res.data.userId);
      navigate("/profile", { state: { user: userProfile.data } });
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-[900px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side */}
        <div className="w-1/2 bg-[#66CCFF] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center ">
            <img src={logo} alt="logo" className="w-100 h-100 ml-30 " />
          </div>
        </div>
        {/* Right side */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign In</h2>
          <p className="text-gray-500 text-center mb-6">Enter your credentials to access your account</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                required
              />
            </div>
            <div className="mb-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                required
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
              <a href="#" className="text-[#66CCFF] text-sm hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#66CCFF] text-white py-3 rounded-lg font-semibold hover:bg-[#0099FF] transition mb-4"
            >
              Sign In <span className="ml-2">&rarr;</span>
            </button>
          </form>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="mx-2 text-gray-400">or continue with</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>
          <div className="flex justify-center gap-4 mb-4">
            {/* Tạm thời disable để tránh lỗi OAuth */}
            {/* <GoogleButton />
            <FacebookButton /> */}
          </div>
          <div className="text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-[#66CCFF] font-semibold hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  )
}
