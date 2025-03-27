
import React, { useState, useEffect } from "react";
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
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavigation from "./MobileNavigation";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  
  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

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
          "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-sidebar transition-all duration-300 md:block",
          collapsed ? "w-16" : "w-64",
          isMobile ? "hidden" : ""
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  src="/lovable-uploads/a7a65f60-faab-465f-a5cf-09cf39dde5c0.png"
                  alt="Logo Club Comando Celeste"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-semibold">Club Comando Celeste</span>
            </div>
          ) : (
            <div className="mx-auto h-8 w-8 overflow-hidden rounded-full">
              <img
                src="/lovable-uploads/a7a65f60-faab-465f-a5cf-09cf39dde5c0.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={collapsed ? "ml-auto" : ""}
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
                onClick={() => isMobile && setCollapsed(true)}
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
              "flex items-center", 
              collapsed ? "flex-col space-y-4" : "space-x-2"
            )}>
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
          )}
        </div>
      </aside>
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all duration-300",
          collapsed ? "md:pl-16" : "md:pl-64",
          "pl-0" // No padding on mobile
        )}
      >
        {user && (
          <div className="fixed top-4 right-4 z-30">
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-1 bg-white shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Esci</span>
            </Button>
          </div>
        )}
        
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
};

export default Sidebar;
