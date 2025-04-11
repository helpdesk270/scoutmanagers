
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
  BarChart3,
  Download,
  FileText,
  PieChart,
  Users,
  Calendar,
  Activity,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Rapporti: React.FC = () => {
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Rapporti e Analisi</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Panoramica</TabsTrigger>
          <TabsTrigger value="partecipazione" className="text-xs md:text-sm">Partecipazione</TabsTrigger>
          <TabsTrigger value="personalizzati" className="text-xs md:text-sm">Report Personalizzati</TabsTrigger>
        </TabsList>
        
        {/* Panoramica Tab */}
        <TabsContent value="overview">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Panoramica</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="2025">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Anno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Membri Totali</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  120
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +15% rispetto all'anno scorso
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Attività Organizzate</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  24
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +8% rispetto all'anno scorso
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tasso di Partecipazione</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  78%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +5% rispetto all'anno scorso
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuzione Membri per Categoria</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="p-12 mb-4 w-full">
                  <PieChart className="h-32 w-32 mx-auto text-primary/50" />
                </div>
                <div className="grid grid-cols-3 w-full gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary/70 mb-2"></div>
                    <span className="text-sm font-medium">Gemme</span>
                    <span className="text-xs text-muted-foreground">35%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500/70 mb-2"></div>
                    <span className="text-sm font-medium">Tizzoni</span>
                    <span className="text-xs text-muted-foreground">40%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500/70 mb-2"></div>
                    <span className="text-sm font-medium">Esploratori</span>
                    <span className="text-xs text-muted-foreground">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progressione Mensile delle Attività</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="p-12 w-full">
                  <BarChart3 className="h-32 w-full mx-auto text-primary/50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Partecipazione Tab */}
        <TabsContent value="partecipazione">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Analisi Partecipazione</h2>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte</SelectItem>
                  <SelectItem value="gemme">Gemme</SelectItem>
                  <SelectItem value="tizzoni">Tizzoni</SelectItem>
                  <SelectItem value="esploratori">Esploratori</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="2025">
                <SelectTrigger className="w-full md:w-[100px]">
                  <SelectValue placeholder="Anno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtra
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tasso di Partecipazione per Attività</CardTitle>
              <CardDescription>Le attività più e meno frequentate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-12 flex flex-col items-center justify-center">
                <BarChart3 className="h-32 w-full mx-auto text-primary/50 mb-6" />
                <p className="text-center text-muted-foreground">
                  Il grafico di partecipazione sarà visualizzato qui
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tendenze di Partecipazione</CardTitle>
              <CardDescription>Analisi della partecipazione nel tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Attività più frequentate</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li className="text-sm">Campeggio Estivo (95% partecipazione)</li>
                    <li className="text-sm">Escursione al Lago (88% partecipazione)</li>
                    <li className="text-sm">Attività di Team Building (85% partecipazione)</li>
                    <li className="text-sm">Uscita Orienteering (82% partecipazione)</li>
                    <li className="text-sm">Festa di Natale (80% partecipazione)</li>
                  </ol>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Attività meno frequentate</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li className="text-sm">Corso Teorico (60% partecipazione)</li>
                    <li className="text-sm">Incontro con i Genitori (65% partecipazione)</li>
                    <li className="text-sm">Laboratorio Manuale (68% partecipazione)</li>
                    <li className="text-sm">Riunione di Pianificazione (70% partecipazione)</li>
                    <li className="text-sm">Attività di Servizio (72% partecipazione)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                <Download className="h-4 w-4 mr-2" />
                Esporta Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Report Personalizzati Tab */}
        <TabsContent value="personalizzati">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Report Personalizzati</h2>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Nuovo Report
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Genera Report Personalizzato</CardTitle>
              <CardDescription>Seleziona i parametri per generare un report su misura</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i dati</SelectItem>
                    <SelectItem value="membri">Membri</SelectItem>
                    <SelectItem value="attivita">Attività</SelectItem>
                    <SelectItem value="formazione">Formazione</SelectItem>
                    <SelectItem value="finanziario">Finanziario</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti</SelectItem>
                    <SelectItem value="mese">Ultimo Mese</SelectItem>
                    <SelectItem value="trimestre">Ultimo Trimestre</SelectItem>
                    <SelectItem value="semestre">Ultimo Semestre</SelectItem>
                    <SelectItem value="anno">Ultimo Anno</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Genera Report</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Recenti</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">Partecipazione Trimestrale</h4>
                        <p className="text-xs text-muted-foreground">Generato il 10/04/2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">Progressione Membri</h4>
                        <p className="text-xs text-muted-foreground">Generato il 05/04/2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">Analisi Finanziaria 2025</h4>
                        <p className="text-xs text-muted-foreground">Generato il 01/04/2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">Report Attività 2024</h4>
                        <p className="text-xs text-muted-foreground">Generato il 15/01/2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rapporti;
