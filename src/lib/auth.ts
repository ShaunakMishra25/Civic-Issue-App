export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  joinDate: string;
  bio?: string;
  totalIssues?: number;
  totalVotes?: number;
}

const STORAGE_KEY = "civic_users";
const CURRENT_USER_KEY = "civic_current_user";

export const getUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return [];
  }
};

export const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

export const signUp = (username: string, email: string, password: string): { success: boolean; error?: string } => {
  const users = getUsers();
  
  if (users.find(u => u.username === username)) {
    return { success: false, error: "Username already exists" };
  }
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: "Email already registered" };
  }
  
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    username,
    email,
    password,
    joinDate: new Date().toISOString().split("T")[0],
    bio: "",
    totalIssues: 0,
    totalVotes: 0,
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true };
};

export const login = (usernameOrEmail: string, password: string): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  const user = users.find(
    u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
  );
  
  if (!user) {
    return { success: false, error: "Invalid username/email or password" };
  }
  
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return { success: true, user: userWithoutPassword as User };
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): Omit<User, "password"> | null => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error("Error reading current user from localStorage:", error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

