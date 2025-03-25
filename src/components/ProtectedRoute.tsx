
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ["integrante", "animatore", "direttore", "admin"],
}) => {
  const { isAuthenticated, user, loading, isAuthorized } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized(allowedRoles)) {
    return <Navigate to="/accesso-negato" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
