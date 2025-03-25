
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const AccessoDenied = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-destructive">
          Accesso Negato
        </h1>
        <p className="mt-4 text-muted-foreground">
          Non hai i permessi necessari per accedere a questa pagina.
          {user && (
            <span>
              {" "}
              Il tuo ruolo attuale è{" "}
              <span className="capitalize font-medium">{user.role}</span>.
            </span>
          )}
        </p>
        <div className="mt-8 space-y-4">
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla dashboard
          </Button>
          {!user && (
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full"
            >
              Accedi con un altro account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessoDenied;
