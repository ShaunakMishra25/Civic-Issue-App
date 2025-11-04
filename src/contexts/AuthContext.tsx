import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, logout as authLogout, login as authLogin, signUp as authSignUp, type User } from "../lib/auth";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (usernameOrEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = authLogin(usernameOrEmail, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const signUp = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = authSignUp(username, email, password);
    if (result.success) {
      const loginResult = authLogin(username, password);
      if (loginResult.success && loginResult.user) {
        setUser(loginResult.user);
      }
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signUp,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

