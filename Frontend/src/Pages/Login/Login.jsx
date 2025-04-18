"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, LucideLoader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import DLogo from "../../components/DLogo";
import Background from "../../components/Background";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [formFocus, setFormFocus] = useState(false);
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.from || `/${userRole || "student"}`;

  useEffect(() => {
    if (currentUser && userRole) {
      console.log(`User already logged in with role ${userRole}, redirecting to:`, returnPath);
      navigate(returnPath);
    }
  }, [currentUser, userRole, navigate, returnPath]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        throw loginError;
      }

      const userId = loginData.user.id;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (profileError) {
        throw profileError;
      }

      switch (profileData.role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;
        case "instructor":
          navigate("/instructor", { replace: true });
          break;
        case "student":
          navigate("/student", { replace: true });
          break;
        default:
          setError("Unknown role. Please contact support.");
          break;
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email, password, or role.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        throw error;
      }

      console.log("Google sign-in initiated successfully.");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const fillCredentials = (role) => {
    switch (role) {
      case "admin":
        setEmail("admin@demo.com");
        setPassword("admin123");
        break;
      case "instructor":
        setEmail("instructor@demo.com");
        setPassword("teacher123");
        break;
      case "student":
        setEmail("student@demo.com");
        setPassword("student123");
        break;
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-4">
      <Background />

      <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-sm"></div>

      <div className="relative z-10 grid md:grid-cols-2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
        {/* Left Side - Welcome Message */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 text-white">
          <div>
            <DLogo light />
            <h1 className="text-3xl font-bold mt-12">Welcome back!</h1>
            <p className="mt-3 text-indigo-100">
              Continue your learning journey and explore new educational content.
            </p>
            <div className="mt-8 flex justify-center">
              <img src="/login.svg" alt="Learning Illustration" className="w-64 h-auto" />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`p-8 md:p-12 transition-all duration-300 ${formFocus ? "bg-white" : "bg-gray-50"}`}>
          <div className="md:hidden mb-6">
            <DLogo />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in to your account</h2>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 mb-6"
          >
            {isGoogleLoading ? (
              <LucideLoader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </>
            )}
          </button>

          <div className="relative flex items-center justify-center my-8">
            <div className="border-t border-gray-300 absolute w-full"></div>
            <div className="bg-white px-4 relative z-10 text-sm text-gray-500">or continue with Institute Credentials</div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} onFocus={() => setFormFocus(true)} onBlur={() => setFormFocus(false)}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="block text-gray-700 font-medium text-sm">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Dropdown
            <div className="mb-6">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-2 text-sm">
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full block text-gray-700 font-medium mb-2 text-sm px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                <option value="student" className="block text-gray-700 font-medium mb-2 text-sm">Student</option>
                <option value="instructor" className="block text-gray-700 font-medium mb-2 text-sm">Instructor</option>
                <option value="admin" className="block text-gray-700 font-medium mb-2 text-sm">Admin</option>
              </select>
            </div> */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <LucideLoader2 className="animate-spin mr-2 h-5 w-5" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center font-medium">
                  Sign In <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Demo Credentials Card */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-fadeIn">
            <h3 className="text-amber-800 font-medium text-sm mb-2">Demo Credentials</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">Admin</span>
                  <div className="text-xs text-gray-600 mt-1">admin@demo.com / admin123</div>
                </div>
                <button
                  onClick={() => fillCredentials("admin")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">Instructor</span>
                  <div className="text-xs text-gray-600 mt-1">instructor@demo.com / teacher123</div>
                </div>
                <button
                  onClick={() => fillCredentials("instructor")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">Student</span>
                  <div className="text-xs text-gray-600 mt-1">student@demo.com / student123</div>
                </div>
                <button
                  onClick={() => fillCredentials("student")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Use
                </button>
              </div>
            </div>
            <p className="text-xs text-amber-700 mt-3">Click "Use" to automatically fill credentials for quick testing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;