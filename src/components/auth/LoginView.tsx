import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../layout/Navbar";

const LoginView: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(usernameOrEmail, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <main className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-800/50 shadow-2xl rounded-3xl border border-gray-700/50 backdrop-blur-sm p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/30 border-2 border-red-700/50 text-red-300 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">⚠</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-3 text-gray-200">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out"
                  placeholder="Enter your username or email"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-3 text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginView;

