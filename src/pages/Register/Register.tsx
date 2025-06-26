import logo from "../../assets/logo/logo.svg"


export default function Register() {
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign Up</h2>
          <p className="text-gray-500 text-center mb-6">Enter your credentials to access your account</p>
          <form>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 18c0-2.209 2.686-4 6-4s6 1.791 6 4v2H6v-2Z"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 18c0-2.209 2.686-4 6-4s6 1.791 6 4v2H6v-2Z"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/>
                  <path stroke="#94a3b8" strokeWidth="2" d="m3 8 8.125 5.5c.622.418 1.45.418 2.072 0L21 8"/>
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M16 12v-2a4 4 0 0 0-8 0v2m4-4V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m-4 4h4v8H8v-8Zm-4 0a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z"/>
                </svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
              />
              <span className="absolute right-4 top-3 text-gray-400 cursor-pointer">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
                </svg>
              </span>
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M16 12v-2a4 4 0 0 0-8 0v2m4-4V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1m-4 4h4v8H8v-8Zm-4 0a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z"/>
                </svg>
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
              />
              <span className="absolute right-4 top-3 text-gray-400 cursor-pointer">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="#94a3b8" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
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

          
        </div>
      </div>
      
    </div>
  );
}
