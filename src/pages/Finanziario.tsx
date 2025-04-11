
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
  DollarSign,
  Download,
  FileText,
  Plus,
  PlusCircle,
  Receipt,
  TrendingDown,
  TrendingUp,
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

const Finanziario: React.FC = () => {
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Gestione Finanziaria</h1>
      
      <Tabs defaultValue="riepilogo" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="riepilogo" className="text-xs md:text-sm">Riepilogo</TabsTrigger>
          <TabsTrigger value="transazioni" className="text-xs md:text-sm">Transazioni</TabsTrigger>
          <TabsTrigger value="report" className="text-xs md:text-sm">Report</TabsTrigger>
        </TabsList>
        
        {/* Riepilogo Tab */}
        <TabsContent value="riepilogo">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Riepilogo Finanziario</h2>
            <div className="space-x-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuova Transazione
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Saldo Attuale</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  €4,250.00
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
                <CardDescription>Entrate (Mese Corrente)</CardDescription>
                <CardTitle className="text-2xl flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  €1,200.00
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +15% rispetto al mese precedente
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Uscite (Mese Corrente)</CardDescription>
                <CardTitle className="text-2xl flex items-center text-red-600">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  €820.00
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  -5% rispetto al mese precedente
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Transazioni Recenti</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrizione</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-right">Importo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>10/04/2025</TableCell>
                        <TableCell>Quote mensili membri</TableCell>
                        <TableCell>Entrata</TableCell>
                        <TableCell className="text-right text-green-600">+€450.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>08/04/2025</TableCell>
                        <TableCell>Acquisto materiale didattico</TableCell>
                        <TableCell>Uscita</TableCell>
                        <TableCell className="text-right text-red-600">-€120.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>05/04/2025</TableCell>
                        <TableCell>Iscrizioni campo estivo</TableCell>
                        <TableCell>Entrata</TableCell>
                        <TableCell className="text-right text-green-600">+€750.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>02/04/2025</TableCell>
                        <TableCell>Affitto sede mensile</TableCell>
                        <TableCell>Uscita</TableCell>
                        <TableCell className="text-right text-red-600">-€350.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  Visualizza Tutte
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Registra Quota Mensile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  Emetti Ricevuta
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Crea Rapporto Mensile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Esporta Dati Fiscali
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Transazioni Tab */}
        <TabsContent value="transazioni">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Registro Transazioni</h2>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nuova Transazione
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrizione</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Riferimento</TableHead>
                      <TableHead className="text-right">Importo</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TR-2023-001</TableCell>
                      <TableCell>10/04/2025</TableCell>
                      <TableCell>Quote mensili membri</TableCell>
                      <TableCell>Entrata</TableCell>
                      <TableCell>Quote associative</TableCell>
                      <TableCell className="text-right text-green-600">+€450.00</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TR-2023-002</TableCell>
                      <TableCell>08/04/2025</TableCell>
                      <TableCell>Acquisto materiale didattico</TableCell>
                      <TableCell>Uscita</TableCell>
                      <TableCell>Materiali</TableCell>
                      <TableCell className="text-right text-red-600">-€120.00</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TR-2023-003</TableCell>
                      <TableCell>05/04/2025</TableCell>
                      <TableCell>Iscrizioni campo estivo</TableCell>
                      <TableCell>Entrata</TableCell>
                      <TableCell>Eventi</TableCell>
                      <TableCell className="text-right text-green-600">+€750.00</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TR-2023-004</TableCell>
                      <TableCell>02/04/2025</TableCell>
                      <TableCell>Affitto sede mensile</TableCell>
                      <TableCell>Uscita</TableCell>
                      <TableCell>Spazi</TableCell>
                      <TableCell className="text-right text-red-600">-€350.00</TableCell>
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
        
        {/* Report Tab */}
        <TabsContent value="report">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Report Finanziari</h2>
            <div className="space-x-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Mensili</CardTitle>
                <CardDescription>Report finanziari mensili generati automaticamente</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 hover:bg-accent rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Report Aprile 2025</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-accent rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Report Marzo 2025</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-accent rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Report Febbraio 2025</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Report Personalizzati</CardTitle>
                <CardDescription>Crea report personalizzati in base alle tue esigenze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Report per Categoria
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Report per Evento
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Report Annuale
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Report Fiscale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finanziario;
