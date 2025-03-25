import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Award, ChevronRight, CheckCircle, Lock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Specialization {
  id: string;
  name: string;
  description: string;
  category: "Natura" | "Arte" | "Servizio" | "Tecnica" | "Spirituale";
  level: number;
  maxLevel: number;
  progress: number;
  imageUrl: string;
  color: string;
  requirements: string[];
  isLocked: boolean;
}

const specializations: Specialization[] = [
  {
    id: "1",
    name: "Orientamento",
    description: "Impara a navigare usando mappe e bussola",
    category: "Tecnica",
    level: 2,
    maxLevel: 3,
    progress: 65,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-blue",
    requirements: [
      "Saper leggere una mappa topografica",
      "Usare correttamente una bussola",
      "Completare un percorso di orientamento"
    ],
    isLocked: false
  },
  {
    id: "2",
    name: "Primo soccorso",
    description: "Apprendi le tecniche di base del primo soccorso",
    category: "Servizio",
    level: 1,
    maxLevel: 3,
    progress: 30,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-red",
    requirements: [
      "Conoscere le basi del primo soccorso",
      "Saper gestire una situazione di emergenza",
      "Conoscere i numeri di emergenza"
    ],
    isLocked: false
  },
  {
    id: "3",
    name: "Natura e animali",
    description: "Scopri la flora e la fauna del territorio",
    category: "Natura",
    level: 3,
    maxLevel: 3,
    progress: 100,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-green",
    requirements: [
      "Identificare 10 specie di piante",
      "Identificare 10 specie di animali",
      "Preparare una presentazione sulla biodiversità"
    ],
    isLocked: false
  },
  {
    id: "4",
    name: "Arte e creatività",
    description: "Sviluppa le tue abilità artistiche",
    category: "Arte",
    level: 1,
    maxLevel: 3,
    progress: 20,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-purple",
    requirements: [
      "Creare un'opera d'arte originale",
      "Partecipare a un workshop creativo",
      "Organizzare una mostra per il gruppo"
    ],
    isLocked: false
  },
  {
    id: "5",
    name: "Vita all'aperto",
    description: "Impara a sopravvivere e vivere nella natura",
    category: "Tecnica",
    level: 2,
    maxLevel: 3,
    progress: 70,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-orange",
    requirements: [
      "Montare una tenda correttamente",
      "Accendere un fuoco in sicurezza",
      "Preparare un pasto all'aperto"
    ],
    isLocked: false
  },
  {
    id: "6",
    name: "Studio della Bibbia",
    description: "Approfondisci la conoscenza delle Scritture",
    category: "Spirituale",
    level: 1,
    maxLevel: 3,
    progress: 45,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-yellow",
    requirements: [
      "Leggere regolarmente la Bibbia",
      "Partecipare a uno studio biblico",
      "Preparare una riflessione spirituale"
    ],
    isLocked: false
  },
  {
    id: "7",
    name: "Comunicazione",
    description: "Sviluppa le tue capacità comunicative",
    category: "Servizio",
    level: 0,
    maxLevel: 3,
    progress: 0,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-blue",
    requirements: [
      "Fare una presentazione di 5 minuti",
      "Scrivere un articolo per il giornalino scout",
      "Condurre una discussione di gruppo"
    ],
    isLocked: true
  },
  {
    id: "8",
    name: "Leadership",
    description: "Impara a guidare un gruppo e prendere decisioni",
    category: "Servizio",
    level: 0,
    maxLevel: 3,
    progress: 0,
    imageUrl: "/placeholder.svg",
    color: "bg-scout-purple",
    requirements: [
      "Coordinare un'attività di gruppo",
      "Dimostrare capacità di risoluzione dei problemi",
      "Ricevere feedback positivi dai membri del gruppo"
    ],
    isLocked: true
  }
];

const Specializzazioni = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | null>(null);
  const isMobile = useIsMobile();

  const filteredSpecializations = specializations.filter((spec) => {
    const matchesSearch = spec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          spec.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || spec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completedSpecializations = specializations.filter(spec => spec.progress === 100).length;
  const inProgressSpecializations = specializations.filter(spec => spec.progress > 0 && spec.progress < 100).length;
  const lockedSpecializations = specializations.filter(spec => spec.isLocked).length;
  const totalProgress = specializations.reduce((acc, spec) => acc + spec.progress, 0) / specializations.length;

  return (
    <div className="container animate-fade-in space-y-4 sm:space-y-6 py-4 sm:py-8">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Specializzazioni</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Sviluppa le tue competenze e guadagna distintivi
        </p>
      </header>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">Progresso totale</p>
              <div className="flex items-end justify-between">
                <span className="text-lg sm:text-2xl font-bold">{Math.round(totalProgress)}%</span>
                <Progress value={totalProgress} className="h-2 w-full max-w-[100px] sm:max-w-[180px]" />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">Completate</p>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-2xl font-bold">{completedSpecializations}</span>
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-scout-green" />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">In corso</p>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-2xl font-bold">{inProgressSpecializations}</span>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-scout-orange" />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">Da sbloccare</p>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-2xl font-bold">{lockedSpecializations}</span>
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-scout-blue" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative w-full max-w-[100%] sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca specializzazioni..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full grid-cols-3 sm:w-auto sm:grid-cols-6">
            <TabsTrigger value="all">Tutte</TabsTrigger>
            {!isMobile && <TabsTrigger value="Natura">Natura</TabsTrigger>}
            <TabsTrigger value="Tecnica">Tecnica</TabsTrigger>
            <TabsTrigger value="Servizio">Servizio</TabsTrigger>
            {!isMobile && <TabsTrigger value="Arte">Arte</TabsTrigger>}
            {!isMobile && <TabsTrigger value="Spirituale">Spirituale</TabsTrigger>}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSpecializations.map((spec) => (
          <Card
            key={spec.id}
            className={cn(
              "group overflow-hidden transition-all hover:shadow-md",
              spec.isLocked && "opacity-60"
            )}
            onClick={() => setSelectedSpecialization(spec)}
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-muted">
              <img
                src={spec.imageUrl}
                alt={spec.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              {spec.isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <div className="rounded-full bg-black/50 p-2 sm:p-3">
                    <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
              )}
              <Badge
                className={cn(
                  "absolute right-2 top-2 text-xs",
                  spec.category === "Natura" && "bg-scout-green",
                  spec.category === "Arte" && "bg-scout-purple",
                  spec.category === "Servizio" && "bg-scout-red",
                  spec.category === "Tecnica" && "bg-scout-blue",
                  spec.category === "Spirituale" && "bg-scout-yellow"
                )}
              >
                {spec.category}
              </Badge>
            </div>
            <CardHeader className="px-3 py-2 sm:px-6 sm:pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base sm:text-lg">{spec.name}</CardTitle>
                <div className="flex items-center space-x-1 rounded-full bg-muted px-2 py-1 text-xs">
                  <span>Livello {spec.level}</span>
                  <span>/</span>
                  <span>{spec.maxLevel}</span>
                </div>
              </div>
              <CardDescription className="text-xs sm:text-sm">{spec.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-2">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Progresso</span>
                  <span className="text-xs sm:text-sm font-medium">{spec.progress}%</span>
                </div>
                <Progress 
                  value={spec.progress} 
                  className="h-1.5 sm:h-2"
                  indicatorClassName={cn(spec.color)} 
                />
              </div>
            </CardContent>
            <CardFooter className="px-3 sm:px-6 py-2">
              <Button
                variant="ghost"
                className="w-full justify-between text-xs sm:text-sm"
                disabled={spec.isLocked}
              >
                {spec.isLocked ? "Bloccata" : "Dettagli"}
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredSpecializations.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="rounded-full bg-muted p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Nessuna specializzazione trovata</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Prova a modificare i filtri o a cercare un altro termine.
          </p>
        </div>
      )}

      {(user?.role === "admin" || user?.role === "direttore" || user?.role === "animatore") && (
        <Card>
          <CardHeader>
            <CardTitle>Strumenti per {user.role}</CardTitle>
            <CardDescription>
              Gestisci le specializzazioni per la tua unità
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="justify-start">
                <Award className="mr-2 h-4 w-4" />
                Crea nuova specializzazione
              </Button>
              <Button variant="outline" className="justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approva requisiti completati
              </Button>
              <Button variant="outline" className="justify-start">
                <Search className="mr-2 h-4 w-4" />
                Visualizza report progressi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Specializzazioni;
