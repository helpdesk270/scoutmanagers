
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

// Pages
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione";
import Dashboard from "./pages/Dashboard";
import Secretaria from "./pages/Secretaria";
import SecretariaMembros from "./pages/secretaria/Membros";
import SecretariaPercurso from "./pages/secretaria/Percurso";
import SecretariaEspecialidades from "./pages/secretaria/Especialidades";
import SecretariaRelatorios from "./pages/secretaria/Relatorios";
import SecretariaImpressao from "./pages/secretaria/Impressao";
import Attivita from "./pages/Attivita";
import Formazione from "./pages/Formazione";
import Materiali from "./pages/Materiali";
import Risorse from "./pages/Risorse";
import Rapporti from "./pages/Rapporti";
import Configurazioni from "./pages/Configurazioni";
import AccessoDenied from "./pages/AccessoDenied";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/registrazione" element={<Registrazione />} />
            <Route path="/accesso-negato" element={<AccessoDenied />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </ProtectedRoute>
            } />
            
            {/* Secretaria routes */}
            <Route path="/secretaria" element={
              <ProtectedRoute allowedRoles={["animatore", "direttore", "admin"]}>
                <Sidebar>
                  <Secretaria />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/secretaria/membros" element={
              <ProtectedRoute allowedRoles={["animatore", "direttore", "admin"]}>
                <Sidebar>
                  <SecretariaMembros />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/secretaria/percurso" element={
              <ProtectedRoute allowedRoles={["animatore", "direttore", "admin"]}>
                <Sidebar>
                  <SecretariaPercurso />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/secretaria/especialidades" element={
              <ProtectedRoute allowedRoles={["animatore", "direttore", "admin"]}>
                <Sidebar>
                  <SecretariaEspecialidades />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/secretaria/relatorios" element={
              <ProtectedRoute allowedRoles={["direttore", "admin"]}>
                <Sidebar>
                  <SecretariaRelatorios />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/secretaria/impressao" element={
              <ProtectedRoute allowedRoles={["animatore", "direttore", "admin"]}>
                <Sidebar>
                  <SecretariaImpressao />
                </Sidebar>
              </ProtectedRoute>
            } />
            
            <Route path="/attivita" element={
              <ProtectedRoute>
                <Sidebar>
                  <Attivita />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/formazione" element={
              <ProtectedRoute>
                <Sidebar>
                  <Formazione />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/materiali" element={
              <ProtectedRoute>
                <Sidebar>
                  <Materiali />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/risorse" element={
              <ProtectedRoute>
                <Sidebar>
                  <Risorse />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/rapporti" element={
              <ProtectedRoute allowedRoles={["direttore", "admin"]}>
                <Sidebar>
                  <Rapporti />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/configurazioni" element={
              <ProtectedRoute allowedRoles={["direttore", "admin"]}>
                <Sidebar>
                  <Configurazioni />
                </Sidebar>
              </ProtectedRoute>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
