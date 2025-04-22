
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-comando-background p-4">
      <Card className="w-full max-w-[460px] border-none bg-white p-4 shadow-none">
        <CardHeader className="space-y-6 text-center">
          <div className="mx-auto flex flex-col items-center">
            <img
              src="/lovable-uploads/87809f08-cac2-4e69-a8b7-223abe92d210.png"
              alt="Logo AISA"
              className="mb-4 h-24 w-auto"
            />
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-comando-primary">COMANDO</span>{" "}
              <span className="text-comando-accent">CELESTE</span>
            </h1>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-comando-text">
                Indirizzo email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-comando-border bg-white text-comando-text"
                placeholder="tuoemail@esempio.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm text-comando-text">
                  Password
                </Label>
                <Link
                  to="#"
                  className="text-sm text-comando-primary hover:underline"
                >
                  Password dimenticata?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-comando-border bg-white pr-10 text-comando-text"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-comando-muted hover:text-comando-text"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-comando-border text-comando-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm text-comando-text"
              >
                Mantieni la sessione attiva
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-comando-primary hover:bg-comando-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Accesso in corso..." : "Accedi"}
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-comando-border" />
              <span className="relative bg-white px-2 text-sm text-comando-muted">
                oppure accedi con
              </span>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center space-x-2 rounded-md border border-comando-border bg-white px-4 py-2 text-sm text-comando-text transition-colors hover:bg-comando-background"
            >
              <img
                src="/lovable-uploads/d3253037-51d0-4987-8c69-568d05d938b2.png"
                alt="Google"
                className="h-5 w-5"
              />
              <span>Continua con Google</span>
            </button>

            <p className="text-center text-sm text-comando-muted">
              Non hai un account?{" "}
              <Link
                to="/registrazione"
                className="text-comando-primary hover:underline"
              >
                Crea un account
              </Link>
            </p>
          </form>

          <div className="mt-4 text-center text-xs text-comando-muted">
            <p>
              Demo: <code>animatore@example.com</code> / <code>password</code>
            </p>
            <p>
              (Altri ruoli: integrante, direttore, admin, accompagnatore)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
