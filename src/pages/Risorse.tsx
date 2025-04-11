
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
import {
  Package,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Archive,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const Risorse: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin";
  
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Gestione Risorse</h1>
      
      <Tabs defaultValue="inventario" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="inventario" className="text-xs md:text-sm">Inventario</TabsTrigger>
          <TabsTrigger value="prestiti" className="text-xs md:text-sm">Prestiti</TabsTrigger>
          <TabsTrigger value="pianificazione" className="text-xs md:text-sm">Pianificazione</TabsTrigger>
        </TabsList>
        
        {/* Inventario Tab */}
        <TabsContent value="inventario">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Inventario Materiali</h2>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cerca materiale..." className="pl-8" />
              </div>
              {isAdmin && (
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Materiale
                </Button>
              )}
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Codice</TableHead>
                      <TableHead>Materiale</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Quantità</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead>Ubicazione</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>MAT-001</TableCell>
                      <TableCell>Tende da campo (4 persone)</TableCell>
                      <TableCell>Attrezzatura campeggio</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Disponibile
                        </Badge>
                      </TableCell>
                      <TableCell>Magazzino centrale</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MAT-002</TableCell>
                      <TableCell>Kit pronto soccorso</TableCell>
                      <TableCell>Salute e sicurezza</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Disponibile
                        </Badge>
                      </TableCell>
                      <TableCell>Armadietto sicurezza</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MAT-003</TableCell>
                      <TableCell>Corde da arrampicata</TableCell>
                      <TableCell>Attrezzatura sportiva</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          In prestito
                        </Badge>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MAT-004</TableCell>
                      <TableCell>Proiettore portatile</TableCell>
                      <TableCell>Tecnologia</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          In manutenzione
                        </Badge>
                      </TableCell>
                      <TableCell>Centro assistenza</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Prestiti Tab */}
        <TabsContent value="prestiti">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Gestione Prestiti</h2>
            {isAdmin && (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Prestito
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Prestiti Attivi</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  4
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Aggiornato al 11/04/2025
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Prestiti In Ritardo</CardDescription>
                <CardTitle className="text-2xl flex items-center text-amber-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Necessario sollecito
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Prestiti Completati</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Archive className="h-5 w-5 mr-2 text-blue-600" />
                  12
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Ultimi 30 giorni
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Prestiti Attivi</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[40vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Materiale</TableHead>
                      <TableHead>Richiedente</TableHead>
                      <TableHead>Data Prestito</TableHead>
                      <TableHead>Data Restituzione</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>PR-2023-001</TableCell>
                      <TableCell>Tenda da campo</TableCell>
                      <TableCell>Marco Rossi</TableCell>
                      <TableCell>05/04/2025</TableCell>
                      <TableCell>12/04/2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Attivo
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Gestisci</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PR-2023-002</TableCell>
                      <TableCell>Corde da arrampicata</TableCell>
                      <TableCell>Sofia Bianchi</TableCell>
                      <TableCell>03/04/2025</TableCell>
                      <TableCell>10/04/2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          In ritardo
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Gestisci</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PR-2023-003</TableCell>
                      <TableCell>Kit orienteering</TableCell>
                      <TableCell>Luca Verdi</TableCell>
                      <TableCell>08/04/2025</TableCell>
                      <TableCell>15/04/2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Attivo
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Gestisci</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pianificazione Tab */}
        <TabsContent value="pianificazione">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Pianificazione Risorse</h2>
            {isAdmin && (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuova Prenotazione
              </Button>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendario Prenotazioni</CardTitle>
              <CardDescription>
                Pianificazione dell'utilizzo delle risorse per eventi e attività future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-20 flex flex-col items-center justify-center border rounded-md bg-accent/20">
                <Calendar className="h-16 w-16 text-primary/50 mb-4" />
                <p className="text-center text-muted-foreground">
                  Il calendario delle prenotazioni sarà visualizzato qui
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Prossimi Eventi</CardTitle>
                <CardDescription>Eventi che richiedono risorse</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Campeggio Estivo</h4>
                        <Badge>15-20/06/2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Richiede: tende, kit primo soccorso, attrezzatura cucina
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Escursione Montagna</h4>
                        <Badge>30/04/2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Richiede: kit orienteering, corde, radio
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risorse più richieste</CardTitle>
                <CardDescription>Materiali frequentemente utilizzati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>Tende da campo</span>
                    </div>
                    <Badge variant="outline">12 prenotazioni</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>Kit primo soccorso</span>
                    </div>
                    <Badge variant="outline">8 prenotazioni</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span>Attrezzatura cucina</span>
                    </div>
                    <Badge variant="outline">6 prenotazioni</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Risorse;
