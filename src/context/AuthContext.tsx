
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "integrante" | "animatore" | "direttore" | "admin" | "accompagnatore";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // For demonstration purposes, let's simulate a login without a real backend
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock users for different roles
      const users: Record<string, User> = {
        "integrante@example.com": {
          id: "1",
          name: "Laura Rossi",
          email: "integrante@example.com",
          role: "integrante",
          unitName: "Tizzoni",
          avatarUrl: "/placeholder.svg"
        },
        "animatore@example.com": {
          id: "2",
          name: "Marco Bianchi",
          email: "animatore@example.com",
          role: "animatore",
          unitName: "Animatori",
          avatarUrl: "/placeholder.svg"
        },
        "direttore@example.com": {
          id: "3",
          name: "Giuseppe Verdi",
          email: "direttore@example.com",
          role: "direttore",
          avatarUrl: "/placeholder.svg"
        },
        "admin@example.com": {
          id: "4",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          avatarUrl: "/placeholder.svg"
        },
        "accompagnatore@example.com": {
          id: "5",
          name: "Paolo Accompagnatore",
          email: "accompagnatore@example.com",
          role: "accompagnatore",
          avatarUrl: "/placeholder.svg"
        }
      };

      const user = users[email];

      if (user && password === "password") {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Login effettuato",
          description: `Benvenuto, ${user.name}!`,
        });
        navigate("/dashboard");
      } else {
        throw new Error("Credenziali non valide");
      }
    } catch (error) {
      toast({
        title: "Errore di login",
        description: error instanceof Error ? error.message : "Si è verificato un errore",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    toast({
      title: "Logout effettuato",
      description: "Hai effettuato il logout con successo.",
    });
  };

  React.useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
