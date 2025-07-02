import register from "../../apis/register";
import logo from "../../assets/logo/logo.svg";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn page reload
    
    if (!fullName || !email || !password) {
      alert("Please fill in all required fields!");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Password confirmation does not match!");
      return;
    }

    setIsRegistering(true);
    
    try {
      const response = await register(email, password, fullName);
      console.log("Registration successful:", response);
      
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed! Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-right" />
      <div className="flex w-[900px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side */}
        <div className="w-1/2 bg-[#66CCFF] flex flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-100 h-100 ml-30" />
        </div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Sign Up
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your credentials to create your account
          </p>
          <form onSubmit={handleRegister}>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 18c0-2.209 2.686-4 6-4s6 1.791 6 4v2H6v-2Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                required
                disabled={isRegistering}
                autoComplete="name"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 18c0-2.209 2.686-4 6-4s6 1.791 6 4v2H6v-2Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                disabled={isRegistering}
                autoComplete="username"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"
                  />
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="m3 8 8.125 5.5c.622.418 1.45.418 2.072 0L21 8"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                required
                disabled={isRegistering}
                autoComplete="email"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M16 12v-2a4 4 0 0 0-8 0v2m4-4V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m-4 4h4v8H8v-8Zm-4 0a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0r0 1-1-1v-8Z"
                  />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                required
                disabled={isRegistering}
                autoComplete="new-password"
              />
              <span className="absolute right-4 top-3 text-gray-400 cursor-pointer">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M16 12v-2a4 4 0 0 0-8 0v2m4-4V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m-4 4h4v8H8v-8Zm-4 0a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z"
                  />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
                required
                disabled={isRegistering}
                autoComplete="new-password"
              />
              <span className="absolute right-4 top-3 text-gray-400 cursor-pointer">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#94a3b8"
                    strokeWidth="2"
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#66CCFF] text-white py-3 rounded-lg font-semibold hover:bg-[#0099FF] transition mb-4"
            >
              Create Account <span className="ml-2">&rarr;</span>
            </button>
          </form>
          <div className="text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-[#66CCFF] font-semibold hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}