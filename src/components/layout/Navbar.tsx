import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 glass-effect shadow-lg border-b border-gray-700/50">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 ease-out">
        Civic<span className="text-gray-200">Upvote</span>
      </Link>

      <div className="flex items-center gap-8 text-gray-300 font-medium">
        <Link
          to="/"
          className="hover:text-blue-400 transition-colors duration-300 ease-out relative group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/create"
              className="hover:text-blue-400 transition-colors duration-300 ease-out relative group"
            >
              Create
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
            {user && (
              <Link
                to={`/profile/${user.username}`}
                className="hover:text-blue-400 transition-colors duration-300 ease-out relative group"
              >
                Profile
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
            )}
            <button
              className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 hover:border-red-600/50 transition-all duration-300 ease-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30 hover:border-blue-600/50 transition-all duration-300 ease-out"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all duration-300 ease-out"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
