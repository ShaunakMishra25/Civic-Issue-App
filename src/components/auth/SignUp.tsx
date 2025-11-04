import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../layout/Navbar";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(username, email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Sign up failed");
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
                Create Account
              </h2>
              <p className="text-gray-400 text-sm">Join our community and start reporting issues</p>
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
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out"
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-3 text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out"
                  placeholder="Enter your email"
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
                  placeholder="Create a password (min 6 characters)"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-3 text-gray-200">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;

