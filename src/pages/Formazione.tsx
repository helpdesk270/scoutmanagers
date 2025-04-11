
import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Formazione: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin";
  
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Formazione</h1>
      
      <Tabs defaultValue="progressi" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="progressi" className="text-xs md:text-sm">Progressi</TabsTrigger>
          <TabsTrigger value="specializzazioni" className="text-xs md:text-sm">Specializzazioni</TabsTrigger>
          <TabsTrigger value="materiali" className="text-xs md:text-sm">Materiali Didattici</TabsTrigger>
        </TabsList>
        
        {/* Progressi Tab */}
        <TabsContent value="progressi">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Progressi Individuali</h2>
            {isAdmin && (
              <Button size="sm">Registra Progresso</Button>
            )}
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border">
            <p className="text-muted-foreground text-center py-10">
              Sezione in costruzione. Qui verranno visualizzati i progressi individuali dei membri.
            </p>
          </div>
        </TabsContent>
        
        {/* Specializzazioni Tab */}
        <TabsContent value="specializzazioni">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Specializzazioni</h2>
            {isAdmin && (
              <Button size="sm">Aggiungi Specializzazione</Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample card for specialization */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle>Pronto Soccorso</CardTitle>
                </div>
                <CardDescription>Abilità di primo soccorso e assistenza</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Conoscenza delle tecniche di base di primo soccorso, gestione delle emergenze
                  e assistenza alla persona.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">Dettagli</Button>
              </CardFooter>
            </Card>
            
            {/* Placeholder */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground text-center">
                Altre specializzazioni saranno visualizzate qui
              </p>
            </Card>
          </div>
        </TabsContent>
        
        {/* Materiali Didattici Tab */}
        <TabsContent value="materiali">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Materiali Didattici</h2>
            {isAdmin && (
              <Button size="sm">Carica Materiale</Button>
            )}
          </div>
          
          <ScrollArea className="h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample material card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Manuale dell'Esploratore</CardTitle>
                  </div>
                  <CardDescription>Manuale base</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Guida completa per tutti gli esploratori con tecniche, attività e regole di base.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto">Scarica PDF</Button>
                </CardFooter>
              </Card>
              
              {/* Sample material card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Schede Attività</CardTitle>
                  </div>
                  <CardDescription>Materiale didattico</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Collezione di schede per attività pratiche da svolgere durante gli incontri.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto">Scarica PDF</Button>
                </CardFooter>
              </Card>
              
              {/* Placeholder */}
              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
                <p className="text-muted-foreground text-center">
                  Altri materiali didattici saranno visualizzati qui
                </p>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Formazione;
