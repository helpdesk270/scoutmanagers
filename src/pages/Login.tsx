
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login effettuato con successo");
        navigate("/dashboard");
      } else {
        toast.error("Credenziali non valide");
      }
    } catch (error) {
      toast.error("Si è verificato un errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative h-32 w-32 overflow-hidden p-2">
            <img 
              src="/lovable-uploads/a7a65f60-faab-465f-a5cf-09cf39dde5c0.png" 
              alt="Logo Club Comando Celeste" 
              className="h-full w-full object-contain animate-float"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Club Comando Celeste
          </h1>
          <p className="text-muted-foreground">
            Sistema di gestione per gli scout avventisti
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Accedi</TabsTrigger>
            <TabsTrigger value="info">Informazioni</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Accedi al tuo account</CardTitle>
                <CardDescription>
                  Inserisci le tue credenziali per accedere
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nome@scout.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/password-reset" className="text-xs text-primary hover:underline">
                        Password dimenticata?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        Accesso in corso...
                      </span>
                    ) : (
                      "Accedi"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Credenziali di esempio:</span><br />
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    scout@scout.it / scout123
                  </code>
                </div>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Non hai un account?</span>{" "}
                  <Link to="/registrazione" className="text-primary hover:underline">
                    Registrati
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="info">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Informazioni di accesso</CardTitle>
                <CardDescription>
                  Informazioni sui diversi livelli di accesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 rounded-lg bg-primary/5 p-3">
                  <h3 className="font-medium text-primary">Ruoli del sistema</h3>
                  <ul className="space-y-2 pl-5 text-sm list-disc">
                    <li><span className="font-semibold">Integrante:</span> Membri scout con accesso alle proprie attività e specializzazioni</li>
                    <li><span className="font-semibold">Animatore:</span> Responsabili di gruppi che gestiscono le attività</li>
                    <li><span className="font-semibold">Direttore:</span> Direttori di unità con accesso completo alla propria unità</li>
                    <li><span className="font-semibold">Admin:</span> Accesso completo a tutte le funzionalità del sistema</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Credenziali di esempio</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="rounded-md bg-muted p-2">
                      <p>Admin: <code>admin@scout.it / admin123</code></p>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <p>Direttore: <code>direttore@scout.it / direttore123</code></p>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <p>Animatore: <code>animatore@scout.it / animatore123</code></p>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <p>Integrante: <code>scout@scout.it / scout123</code></p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/registrazione")}>
                  Vai alla registrazione
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
