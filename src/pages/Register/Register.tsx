import { useState } from 'react';
import logo from "../../assets/logo/logo.svg";
import { useNavigate } from 'react-router';
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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register(email, password, fullName);
      toast.success("Register successful!");
      console.log(res);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign Up</h2>
          <p className="text-gray-500 text-center mb-6">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <InputField
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Username */}
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email */}
            <InputField
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            {/* Confirm Password */}
            <InputField
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              rightIcon={showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              onRightIconClick={() => setShowConfirm(!showConfirm)}
            />

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

// 👇 Reusable InputField component
function InputField({
  type,
  placeholder,
  value,
  onChange,
  rightIcon,
  onRightIconClick,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}) {
  return (
    <div className="mb-4 relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
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
