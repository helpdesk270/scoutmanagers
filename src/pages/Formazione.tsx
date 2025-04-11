import React, { useState } from "react";
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
import { Award, BookOpen, FileText, Users, GraduationCap, BarChart4, Filter, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Tipos de grupos de idade
type AgeGroup = "gemme" | "tizzoni" | "esploratori" | "animatori";

// Data for progression paths
const progressionPaths = {
  gemme: [
    { name: "Gemme 1", age: "3 anni", color: "bg-scout-green", progress: 0 },
    { name: "Gemme 2", age: "4 anni", color: "bg-scout-green", progress: 0 },
    { name: "Gemme 3", age: "5 anni", color: "bg-scout-green", progress: 0 },
  ],
  tizzoni: [
    { name: "Tizzoni", age: "6 anni", color: "bg-scout-red", progress: 0 },
    { name: "1 Scintilla", age: "7 anni", color: "bg-scout-red", progress: 0 },
    { name: "2 Scintilla", age: "8 anni", color: "bg-scout-red", progress: 0 },
    { name: "3 Scintilla", age: "9 anni", color: "bg-scout-red", progress: 0 },
    { name: "4 Scintilla", age: "10 anni", color: "bg-scout-red", progress: 0 },
    { name: "Master Tizzoni", age: "11 anni", color: "bg-scout-red", progress: 0 },
  ],
  esploratori: [
    { name: "Aiuto", age: "12 anni", color: "bg-scout-yellow", progress: 0 },
    { name: "Messaggero", age: "13 anni", color: "bg-scout-yellow", progress: 0 },
    { name: "Esploratore", age: "14 anni", color: "bg-scout-yellow", progress: 0 },
    { name: "Viaggiatore", age: "15 anni", color: "bg-scout-yellow", progress: 0 },
  ],
  animatori: [
    { name: "Assistente Guida", age: "16 anni", color: "bg-scout-blue", progress: 0 },
    { name: "Guida", age: "18 anni", color: "bg-scout-blue", progress: 0 },
    { name: "Capo Guida", age: "21 anni", color: "bg-scout-blue", progress: 0 },
  ]
};

// Sample exam data
const exams = [
  { 
    id: 1, 
    title: "Conoscenza Nodi Base", 
    category: "tecnico", 
    level: "Aiuto", 
    description: "Apprendimento dei nodi principali utilizzati nelle attività di campo.",
    completed: true,
    completionDate: "2024-01-15"
  },
  { 
    id: 2, 
    title: "Primo Soccorso Livello 1", 
    category: "salute", 
    level: "Messaggero", 
    description: "Conoscenze di base del primo soccorso.",
    completed: false,
    completionDate: null
  },
  { 
    id: 3, 
    title: "Orientamento", 
    category: "tecnico", 
    level: "Esploratore", 
    description: "Capacità di orientarsi con mappa e bussola.",
    completed: false,
    completionDate: null
  },
];

// Sample materials data
const materials = [
  {
    id: 1,
    title: "Manuale dell'Esploratore",
    category: "libro",
    targetAgeGroup: "esploratori",
    format: "PDF",
    fileSize: "5.4 MB",
    uploadDate: "2023-11-10"
  },
  {
    id: 2,
    title: "Guida alle Attività Gemme",
    category: "guida",
    targetAgeGroup: "gemme",
    format: "PDF",
    fileSize: "3.1 MB",
    uploadDate: "2023-12-05"
  },
  {
    id: 3,
    title: "Manuale per gli Animatori",
    category: "manuale",
    targetAgeGroup: "animatori",
    format: "PDF",
    fileSize: "7.8 MB",
    uploadDate: "2024-01-20"
  },
  {
    id: 4,
    title: "Attività per Tizzoni",
    category: "guida",
    targetAgeGroup: "tizzoni",
    format: "PDF",
    fileSize: "4.2 MB",
    uploadDate: "2023-10-15"
  }
];

const Formazione: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("esploratori");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter materials based on search term
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.targetAgeGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Formazione</h1>
        <p className="text-muted-foreground">
          Gestione del percorso formativo e progressione dei membri
        </p>
      </header>
      
      <Tabs defaultValue="percorso" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="percorso" className="text-xs md:text-sm">Percorso Formativo</TabsTrigger>
          <TabsTrigger value="esami" className="text-xs md:text-sm">Esami e Requisiti</TabsTrigger>
          <TabsTrigger value="progressi" className="text-xs md:text-sm">Progressi</TabsTrigger>
          <TabsTrigger value="materiali" className="text-xs md:text-sm">Materiali Didattici</TabsTrigger>
        </TabsList>
        
        {/* Percorso Formativo Tab */}
        <TabsContent value="percorso">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card 
                className={cn(
                  "cursor-pointer border-2 transition-all",
                  selectedAgeGroup === "gemme" ? "border-scout-green bg-green-50" : "hover:bg-green-50/50"
                )}
                onClick={() => setSelectedAgeGroup("gemme")}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-scout-green">Gemme</CardTitle>
                  <CardDescription>3-5 anni</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Primo approccio al mondo dello scoutismo.</p>
                </CardContent>
              </Card>
              
              <Card 
                className={cn(
                  "cursor-pointer border-2 transition-all",
                  selectedAgeGroup === "tizzoni" ? "border-scout-red bg-red-50" : "hover:bg-red-50/50"
                )}
                onClick={() => setSelectedAgeGroup("tizzoni")}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-scout-red">Tizzoni</CardTitle>
                  <CardDescription>6-11 anni</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Apprendimento attraverso il gioco e attività di gruppo.</p>
                </CardContent>
              </Card>
              
              <Card 
                className={cn(
                  "cursor-pointer border-2 transition-all",
                  selectedAgeGroup === "esploratori" ? "border-scout-yellow bg-yellow-50" : "hover:bg-yellow-50/50"
                )}
                onClick={() => setSelectedAgeGroup("esploratori")}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-scout-yellow">Esploratori</CardTitle>
                  <CardDescription>12-15 anni</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Avventura, tecniche e sviluppo di competenze.</p>
                </CardContent>
              </Card>
              
              <Card 
                className={cn(
                  "cursor-pointer border-2 transition-all",
                  selectedAgeGroup === "animatori" ? "border-scout-blue bg-blue-50" : "hover:bg-blue-50/50"
                )}
                onClick={() => setSelectedAgeGroup("animatori")}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-scout-blue">Animatori</CardTitle>
                  <CardDescription>16+ anni</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Formazione leadership e coordinamento.</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Percorso {selectedAgeGroup.charAt(0).toUpperCase() + selectedAgeGroup.slice(1)}</CardTitle>
                <CardDescription>
                  Progressione dettagliata per fascia d'età
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative py-10">
                  {/* Progress path visualization */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                  <div className="flex justify-between relative">
                    {progressionPaths[selectedAgeGroup].map((level, index) => (
                      <div key={index} className="flex flex-col items-center relative">
                        <div className={cn("w-6 h-6 rounded-full border-2 border-white shadow-md", level.color)}></div>
                        <div className="mt-4 text-center w-24">
                          <p className="font-semibold text-sm">{level.name}</p>
                          <p className="text-xs text-muted-foreground">{level.age}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold">Obiettivi formativi</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedAgeGroup === "gemme" && (
                      <>
                        <li>Sviluppo relazioni sociali</li>
                        <li>Crescita spirito di gruppo</li>
                        <li>Scoperta della natura</li>
                        <li>Autonomia di base</li>
                      </>
                    )}
                    {selectedAgeGroup === "tizzoni" && (
                      <>
                        <li>Gioco comunitario</li>
                        <li>Sviluppo responsabilità</li>
                        <li>Conoscenza dell'ambiente</li>
                        <li>Creatività e manualità</li>
                        <li>Partecipazione alla vita del gruppo</li>
                      </>
                    )}
                    {selectedAgeGroup === "esploratori" && (
                      <>
                        <li>Tecniche di vita all'aperto</li>
                        <li>Autonomia e spirito d'avventura</li>
                        <li>Responsabilità verso la comunità</li>
                        <li>Sviluppo competenze specializzate</li>
                        <li>Collaborazione e lavoro di squadra</li>
                      </>
                    )}
                    {selectedAgeGroup === "animatori" && (
                      <>
                        <li>Leadership e coordinamento</li>
                        <li>Pianificazione attività</li>
                        <li>Gestione gruppi</li>
                        <li>Formazione pedagogica</li>
                        <li>Amministrazione e organizzazione</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                {isAdmin && (
                  <Button size="sm" className="ml-auto">
                    Modifica percorso
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Esami e Requisiti Tab */}
        <TabsContent value="esami">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Esami e Requisiti</h2>
            {isAdmin && (
              <Button size="sm">
                <GraduationCap className="mr-2 h-4 w-4" />
                Crea Nuovo Esame
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Lista Esami</CardTitle>
                    <CardDescription>Requisiti di formazione per livello</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtra
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titolo</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Livello</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {exam.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{exam.level}</TableCell>
                        <TableCell>
                          {exam.completed ? (
                            <Badge className="bg-green-500">Completato</Badge>
                          ) : (
                            <Badge variant="outline">Da completare</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Dettagli</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dettaglio Requisiti</CardTitle>
                <CardDescription>
                  Seleziona un esame per visualizzare i requisiti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-8 rounded-lg flex flex-col items-center justify-center text-center">
                  <GraduationCap className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-semibold">Nessun esame selezionato</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Seleziona un esame dalla lista per visualizzare i dettagli
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Progressi Tab */}
        <TabsContent value="progressi">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Progressi Individuali</h2>
            {isAdmin && (
              <Button size="sm">
                <BarChart4 className="mr-2 h-4 w-4" />
                Registra Progresso
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Membri</CardTitle>
                <CardDescription>Seleziona un membro per visualizzare i progressi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Input 
                    placeholder="Cerca membro..." 
                    className="pl-8"
                  />
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start font-normal">
                      <Users className="mr-2 h-4 w-4" />
                      Visualizza per gruppo
                    </Button>
                    <Separator className="my-2" />
                    {["Marco Rossi", "Lucia Bianchi", "Alessandro Verdi", "Sofia Gialli", "Lorenzo Neri"].map((name, i) => (
                      <Button key={i} variant="ghost" className="w-full justify-start font-normal">
                        {name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Stato Progressi</CardTitle>
                <CardDescription>
                  Seleziona un membro dalla lista per visualizzare i progressi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-8 rounded-lg flex flex-col items-center justify-center text-center h-[300px]">
                  <Users className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-semibold">Nessun membro selezionato</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Seleziona un membro dalla lista per visualizzare i progressi
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Materiali Didattici Tab */}
        <TabsContent value="materiali">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Materiali Didattici</h2>
            {isAdmin && (
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Carica Materiale
              </Button>
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="w-full lg:w-1/3">
              <CardHeader>
                <CardTitle>Filtri</CardTitle>
                <CardDescription>Filtra i materiali didattici</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Cerca</label>
                    <div className="relative">
                      <Input 
                        type="search" 
                        placeholder="Cerca materiali..." 
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Categoria</label>
                    <div className="space-y-2">
                      {["manuale", "guida", "libro", "scheda", "video"].map((category) => (
                        <Button key={category} variant="outline" size="sm" className="mr-2 mb-2 capitalize">
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Fascia d'età</label>
                    <div className="space-y-2">
                      {Object.keys(progressionPaths).map((group) => (
                        <Button key={group} variant="outline" size="sm" className="mr-2 mb-2 capitalize">
                          {group}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="w-full lg:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Materiali Disponibili</CardTitle>
                  <CardDescription>
                    {filteredMaterials.length} materiali trovati
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredMaterials.map((material) => (
                        <Card key={material.id} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-base">{material.title}</CardTitle>
                                <CardDescription className="flex items-center space-x-2">
                                  <Badge variant="outline" className="capitalize">
                                    {material.category}
                                  </Badge>
                                  <Badge variant="outline" className="capitalize">
                                    {material.targetAgeGroup}
                                  </Badge>
                                </CardDescription>
                              </div>
                              <div className="flex items-center space-x-1 rounded-full bg-muted px-2 py-1 text-xs">
                                <span>{material.format}</span>
                                <span>•</span>
                                <span>{material.fileSize}</span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardFooter className="border-t p-3 flex justify-between">
                            <span className="text-xs text-muted-foreground">
                              Aggiornato il {new Date(material.uploadDate).toLocaleDateString('it-IT')}
                            </span>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Scarica
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      
                      {filteredMaterials.length === 0 && (
                        <div className="bg-muted p-8 rounded-lg flex flex-col items-center justify-center text-center">
                          <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                          <h3 className="text-lg font-semibold">Nessun materiale trovato</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Prova a modificare i filtri di ricerca
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Formazione;
