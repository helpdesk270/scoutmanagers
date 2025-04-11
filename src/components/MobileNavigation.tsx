
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  Calendar, 
  Award, 
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Navigation items with their corresponding icons
  const navigationItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Membri",
      icon: <Users className="h-5 w-5" />,
      path: "/membri",
      allowed: ["animatore", "direttore", "admin"]
    },
    {
      title: "Attività",
      icon: <Calendar className="h-5 w-5" />,
      path: "/attivita",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Formazione",
      icon: <Award className="h-5 w-5" />,
      path: "/formazione",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Comunicazione",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/comunicazione",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    }
  ];

  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter(item => 
    user && item.allowed.includes(user.role)
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t shadow-lg">
      <div className="flex justify-around items-center">
        {filteredNavigation.slice(0, 5).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-3",
              location.pathname === item.path
                ? "text-primary"
                : "text-sidebar-foreground"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg",
              location.pathname === item.path
                ? "bg-primary/20"
                : ""
            )}>
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
