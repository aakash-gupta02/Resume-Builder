import { useState } from "react";
import axios from "axios";
import BackgroundComponent from "../components/BackgroundComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axiosInstance";
import { Eye, EyeOff, Loader2, X } from "lucide-react"; // Import eye icons and spinner

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", form);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundComponent>
      <div className="flex items-center justify-center min-h-screen px-4 py-8 ">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm shadow-xl p-8 rounded-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-start">
              <div className="flex-1">
                <p className="font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a
                onClick={() => {
                  navigate("/register");
                }}
                className="text-blue-500 hover:underline"
              >
                Register
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </BackgroundComponent>
  );
};

export default Login;
