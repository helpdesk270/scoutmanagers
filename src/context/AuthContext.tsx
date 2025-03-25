
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the different roles available in the system
export type UserRole = "integrante" | "animatore" | "direttore" | "admin";

// User interface with relevant data
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitName?: string;
  avatarUrl?: string;
}

// Mock user type including password for internal use
interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  unitName?: string;
  avatarUrl: string;
}

// Mock data for initial testing
const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "admin@scout.it",
    password: "admin123",
    name: "Admin Scout",
    role: "admin" as UserRole,
    avatarUrl: "/lovable-uploads/c773e33a-db69-4582-aa20-c0235f627a11.png"
  },
  {
    id: "2",
    email: "direttore@scout.it",
    password: "direttore123",
    name: "Marco Bianchi",
    role: "direttore" as UserRole,
    unitName: "Tizzoni",
    avatarUrl: "/placeholder.svg"
  },
  {
    id: "3",
    email: "animatore@scout.it",
    password: "animatore123",
    name: "Giulia Verdi",
    role: "animatore" as UserRole,
    unitName: "Tizzoni",
    avatarUrl: "/placeholder.svg"
  },
  {
    id: "4",
    email: "scout@scout.it",
    password: "scout123",
    name: "Laura Rossi",
    role: "integrante" as UserRole,
    unitName: "Tizzoni",
    avatarUrl: "/placeholder.svg"
  }
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthorized: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  logout: () => {},
  isAuthenticated: false,
  isAuthorized: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("scoutUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user", error);
        localStorage.removeItem("scoutUser");
      }
    }
    setLoading(false);
  }, []);

  // Login function - in a real app, this would make an API request
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate server request
      const matchedUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!matchedUser) {
        return false;
      }

      // Create a user object without the password
      const loggedInUser: User = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
        unitName: matchedUser.unitName,
        avatarUrl: matchedUser.avatarUrl,
      };

      // Store in state and localStorage
      setUser(loggedInUser);
      localStorage.setItem("scoutUser", JSON.stringify(loggedInUser));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Register function - in a real app, this would make an API request
  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    try {
      // Check if email already exists
      const emailExists = MOCK_USERS.some((u) => u.email === userData.email);
      if (emailExists) {
        return false;
      }

      // In a real app, we would send this to a server and get back the created user
      const newUser: User = {
        id: String(MOCK_USERS.length + 1),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        unitName: userData.unitName,
        avatarUrl: userData.avatarUrl || "/placeholder.svg",
      };

      // Add to mock users (in a real app this would be done server-side)
      MOCK_USERS.push({
        ...newUser,
        password: userData.password,
        avatarUrl: newUser.avatarUrl || "/placeholder.svg",
      });

      // Log in the user automatically
      setUser(newUser);
      localStorage.setItem("scoutUser", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("scoutUser");
  };

  // Check if user is authorized for specific roles
  const isAuthorized = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAuthorized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
