
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
import Specializzazioni from "./pages/Specializzazioni";
import Membri from "./pages/Membri";
import Biblioteca from "./pages/Biblioteca";
import Attivita from "./pages/Attivita";
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
            <Route path="/specializzazioni" element={
              <ProtectedRoute>
                <Sidebar>
                  <Specializzazioni />
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/membri" element={
              <ProtectedRoute allowedRoles={["animatore", "direttore", "admin"]}>
                <Sidebar>
                  <Membri />
                </Sidebar>
              </ProtectedRoute>
            } />
            
            {/* Biblioteca route */}
            <Route path="/biblioteca" element={
              <ProtectedRoute>
                <Sidebar>
                  <Biblioteca />
                </Sidebar>
              </ProtectedRoute>
            } />
            
            {/* Attività route using our new component */}
            <Route path="/attivita" element={
              <ProtectedRoute>
                <Sidebar>
                  <Attivita />
                </Sidebar>
              </ProtectedRoute>
            } />
            
            {/* Placeholder routes for future implementation */}
            <Route path="/rapporti" element={
              <ProtectedRoute allowedRoles={["direttore", "admin"]}>
                <Sidebar>
                  <div className="container py-8">
                    <h1 className="text-3xl font-bold">Rapporti</h1>
                    <p className="text-muted-foreground mt-2">Pagina in costruzione</p>
                  </div>
                </Sidebar>
              </ProtectedRoute>
            } />
            <Route path="/impostazioni" element={
              <ProtectedRoute>
                <Sidebar>
                  <div className="container py-8">
                    <h1 className="text-3xl font-bold">Impostazioni</h1>
                    <p className="text-muted-foreground mt-2">Pagina in costruzione</p>
                  </div>
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
