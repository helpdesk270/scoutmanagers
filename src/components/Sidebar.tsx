
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Award,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  BarChart3,
  MapPin,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Specializzazioni",
      icon: <Award className="h-5 w-5" />,
      path: "/specializzazioni",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Attività",
      icon: <Calendar className="h-5 w-5" />,
      path: "/attivita",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Biblioteca",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/biblioteca",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    },
    {
      title: "Membri",
      icon: <Users className="h-5 w-5" />,
      path: "/membri",
      allowed: ["animatore", "direttore", "admin"]
    },
    {
      title: "Campi",
      icon: <MapPin className="h-5 w-5" />,
      path: "/campi",
      allowed: ["animatore", "direttore", "admin"]
    },
    {
      title: "Rapporti",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/rapporti",
      allowed: ["direttore", "admin"]
    },
    {
      title: "Impostazioni",
      icon: <Settings className="h-5 w-5" />,
      path: "/impostazioni",
      allowed: ["integrante", "animatore", "direttore", "admin"]
    }
  ];

  const filteredNavigation = navigationItems.filter(item => 
    user && item.allowed.includes(user.role)
  );

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-primary/20">
                <img
                  src="/lovable-uploads/c773e33a-db69-4582-aa20-c0235f627a11.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-semibold">Scout Avventista</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <Separator />
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {filteredNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <Separator />
        <div className="p-4">
          {user && (
            <div className={cn(
              "flex items-center justify-between", 
              collapsed ? "flex-col space-y-4" : "space-x-2"
            )}>
              <div className={cn("flex items-center", collapsed ? "flex-col" : "space-x-2")}>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "sm"}
                onClick={logout}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {collapsed ? <LogOut className="h-4 w-4" /> : "Esci"}
              </Button>
            </div>
          )}
        </div>
      </aside>
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all duration-300",
          collapsed ? "pl-16" : "pl-64"
        )}
      >
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
