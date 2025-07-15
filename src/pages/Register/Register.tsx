import { useState } from 'react';
import logo from "../../assets/logo/logo.svg";
import { useNavigate, Link } from 'react-router';
import { register } from '@/apis/login';
import { Toaster, toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- Add loading state

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // <-- Start loading
    try {
      const res = await register(email, password, fullName);
      toast.success("Register successful!");
      console.log(res);
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // <-- Stop loading
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Toaster position="top-right" />
      <div className="flex w-[1000px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side */}
        <div className="w-1/2 bg-[#EF4444] flex flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-100 h-100 ml-30" />
        </div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign Up</h2>
          <p className="text-gray-500 text-center mb-6">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <InputField
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
            />

            {/* Username */}
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />

            {/* Email */}
            <InputField
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />

            {/* Password */}
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            />

            {/* Confirm Password */}
            <InputField
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              rightIcon={showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              onRightIconClick={() => setShowConfirm(!showConfirm)}
              disabled={isLoading}
            />

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
                  <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                <>
                  Create Account <span className="ml-2">&rarr;</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to='/login' className="text-[#EF4444] font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 👇 Reusable InputField component
function InputField({
  type,
  placeholder,
  value,
  onChange,
  rightIcon,
  onRightIconClick,
  disabled = false,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mb-4 relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444] disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      {rightIcon && (
        <span
          className="absolute right-4 top-3 text-gray-400 cursor-pointer"
          onClick={onRightIconClick}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
}
