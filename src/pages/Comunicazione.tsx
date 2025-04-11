
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
import { Bell, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Comunicazione: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";
  
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Comunicazione</h1>
      
      <Tabs defaultValue="messaggi" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="messaggi" className="text-xs md:text-sm">Messaggi</TabsTrigger>
          <TabsTrigger value="notifiche" className="text-xs md:text-sm">Notifiche</TabsTrigger>
          <TabsTrigger value="circolari" className="text-xs md:text-sm">Circolari</TabsTrigger>
        </TabsList>
        
        {/* Messaggi Tab */}
        <TabsContent value="messaggi">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Messaggi</h2>
            {isAdmin && (
              <Button size="sm">Nuovo Messaggio</Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-card text-card-foreground p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Contatti</h3>
              </div>
              <ScrollArea className="h-[60vh]">
                <div className="space-y-2">
                  <div className="p-2 rounded-md hover:bg-accent cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">MC</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Marco Colombo</p>
                        <p className="text-xs text-muted-foreground">Animatore</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 rounded-md hover:bg-accent cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">LR</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lucia Rossi</p>
                        <p className="text-xs text-muted-foreground">Direttrice</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 rounded-md hover:bg-accent cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">GV</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gruppo Verde</p>
                        <p className="text-xs text-muted-foreground">Gruppo (5 membri)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t my-2"></div>
                  <p className="text-xs text-muted-foreground p-2">Altri contatti verranno visualizzati qui</p>
                </div>
              </ScrollArea>
            </div>
            
            <div className="lg:col-span-2 bg-card text-card-foreground rounded-lg shadow-sm border flex flex-col h-[65vh]">
              <div className="border-b p-4">
                <h3 className="font-medium">Chat</h3>
              </div>
              
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground">
                    Seleziona un contatto per iniziare una conversazione
                  </p>
                </div>
              </ScrollArea>
              
              {isAdmin && (
                <div className="border-t p-4 flex gap-2">
                  <Textarea 
                    placeholder="Scrivi un messaggio..." 
                    className="min-h-10 resize-none"
                  />
                  <Button size="icon" variant="ghost">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Notifiche Tab */}
        <TabsContent value="notifiche">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Notifiche</h2>
            {isAdmin && (
              <Button size="sm">Invia Notifica</Button>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Centro Notifiche</CardTitle>
              <CardDescription>
                Visualizza e gestisci tutte le notifiche del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[50vh]">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/20">
                    <Bell className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Promemoria: Riunione Settimanale</h4>
                      <p className="text-sm text-muted-foreground">
                        La riunione settimanale si terrà domani alle 18:00 presso la sede centrale.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 ore fa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg">
                    <Bell className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-medium">Nuovo Documento Caricato</h4>
                      <p className="text-sm text-muted-foreground">
                        È stato caricato un nuovo documento nella sezione materiali didattici.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Ieri</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg">
                    <Bell className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-medium">Iscrizione Confermata: Campo Estivo</h4>
                      <p className="text-sm text-muted-foreground">
                        La tua iscrizione al campo estivo è stata confermata. Tutti i dettagli sono disponibili nella sezione Attività.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">3 giorni fa</p>
                    </div>
                  </div>
                  
                  <div className="border-t my-2"></div>
                  <p className="text-xs text-muted-foreground p-2 text-center">Le notifiche precedenti verranno visualizzate qui</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Circolari Tab */}
        <TabsContent value="circolari">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Circolari e Comunicazioni</h2>
            {isAdmin && (
              <Button size="sm">Nuova Circolare</Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Programmazione Annuale</CardTitle>
                </div>
                <CardDescription>Circolare #2023-01</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dettagli sulla programmazione annuale delle attività e degli eventi principali.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-xs text-muted-foreground">15/01/2023</p>
                <Button variant="outline" size="sm">Leggi</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Modifiche Regolamento</CardTitle>
                </div>
                <CardDescription>Circolare #2023-02</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Aggiornamenti al regolamento interno e nuove linee guida per le attività.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-xs text-muted-foreground">03/03/2023</p>
                <Button variant="outline" size="sm">Leggi</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground text-center">
                Altre circolari saranno visualizzate qui
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Comunicazione;
