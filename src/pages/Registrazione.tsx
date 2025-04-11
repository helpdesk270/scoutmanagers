import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Registrazione = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "integrante" as UserRole,
    unitName: "Tizzoni",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
  };

  const handleUnitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, unitName: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Le password non corrispondono");
      setLoading(false);
      return;
    }

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        unitName: formData.unitName,
      });

      if (success) {
        toast.success("Registrazione effettuata con successo");
        navigate("/dashboard");
      } else {
        toast.error("Email già registrata o errore durante la registrazione");
      }
    } catch (error) {
      toast.error("Si è verificato un errore durante la registrazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary/10 p-2">
            <img 
              src="/lovable-uploads/c773e33a-db69-4582-aa20-c0235f627a11.png" 
              alt="Logo Scout" 
              className="h-full w-full object-contain animate-float"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Registrazione Scout
          </h1>
          <p className="text-muted-foreground">
            Crea un nuovo account scout
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Crea il tuo account</CardTitle>
            <CardDescription>
              Inserisci i tuoi dati per registrarti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Mario Rossi"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nome@scout.it"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Ruolo</Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Seleziona ruolo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="integrante">Integrante</SelectItem>
                      <SelectItem value="animatore">Animatore</SelectItem>
                      <SelectItem value="direttore">Direttore</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Il ruolo Admin può essere assegnato solo dagli amministratori
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitName">Unità</Label>
                  <Select
                    value={formData.unitName}
                    onValueChange={handleUnitChange}
                  >
                    <SelectTrigger id="unitName">
                      <SelectValue placeholder="Seleziona unità" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gemme">Gemme</SelectItem>
                      <SelectItem value="Tizzoni">Tizzoni</SelectItem>
                      <SelectItem value="Esploratori">Esploratori</SelectItem>
                      <SelectItem value="Animatori">Animatori</SelectItem>
                      <SelectItem value="Aquile">Aquile</SelectItem>
                      <SelectItem value="Leoni">Leoni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Registrazione in corso...
                  </span>
                ) : (
                  "Registrati"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna al login
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Hai già un account?</span>{" "}
              <Link to="/login" className="text-primary hover:underline">
                Accedi
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Registrazione;
