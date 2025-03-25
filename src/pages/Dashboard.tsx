import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/context/AuthContext";
import { Award, Calendar, BookOpen, CheckCircle2, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Interface for specialization data
interface Specialization {
  id: string;
  name: string;
  icon: React.ReactNode;
  progress: number;
  level: "Principiante" | "Intermedio" | "Avanzato" | "Esperto";
  color: string;
}

// Interface for achievement data
interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  progress: number;
  difficulty: "Facile" | "Medio" | "Difficile";
}

// Interface for upcoming activity
interface Activity {
  id: string;
  title: string;
  date: string;
  type: "Riunione" | "Campo" | "Evento" | "Formazione";
  location: string;
}

// Mock data for specializations
const specializations: Specialization[] = [
  {
    id: "1",
    name: "Ascolto",
    icon: <Award className="h-5 w-5" />,
    progress: 65,
    level: "Intermedio",
    color: "bg-scout-orange",
  },
  {
    id: "2",
    name: "Cognitivo",
    icon: <BookOpen className="h-5 w-5" />,
    progress: 55,
    level: "Intermedio",
    color: "bg-scout-purple",
  },
  {
    id: "3",
    name: "Vocabolario",
    icon: <CheckCircle2 className="h-5 w-5" />,
    progress: 30,
    level: "Principiante",
    color: "bg-scout-green",
  },
  {
    id: "4",
    name: "Sociale",
    icon: <Users className="h-5 w-5" />,
    progress: 70,
    level: "Intermedio",
    color: "bg-scout-blue",
  }
];

// Mock data for achievements
const achievements: Achievement[] = [
  {
    id: "1",
    title: "Prima scintilla",
    description: "Completamento delle attività di base",
    imageUrl: "/placeholder.svg",
    progress: 35,
    difficulty: "Facile",
  },
  {
    id: "2",
    title: "Esploratore della Bibbia",
    description: "Conoscenza delle storie bibliche",
    imageUrl: "/placeholder.svg",
    progress: 50,
    difficulty: "Medio",
  },
  {
    id: "3",
    title: "Navigatore della Natura",
    description: "Conoscenza dell'ambiente naturale",
    imageUrl: "/placeholder.svg",
    progress: 20,
    difficulty: "Difficile",
  }
];

// Mock data for upcoming activities
const activities: Activity[] = [
  {
    id: "1",
    title: "Riunione settimanale",
    date: "Oggi, 18:00",
    type: "Riunione",
    location: "Sede scout",
  },
  {
    id: "2",
    title: "Preparazione campo estivo",
    date: "Giovedì, 19:30",
    type: "Formazione",
    location: "Sede scout",
  },
  {
    id: "3",
    title: "Uscita domenicale",
    date: "Domenica, 09:00",
    type: "Evento",
    location: "Parco cittadino",
  }
];

// Dashboard component with role-specific content
const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container animate-fade-in space-y-4 py-4 sm:space-y-6 sm:py-8">
      {/* Welcome header */}
      <header className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            Benvenuto, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {user.unitName && `Unità: ${user.unitName} • `}
            <span className="capitalize">{user.role}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs uppercase text-scout-blue">
            {new Date().toLocaleDateString("it-IT", { 
              weekday: isMobile ? undefined : "long", 
              day: "numeric", 
              month: isMobile ? "short" : "long" 
            })}
          </Badge>
        </div>
      </header>

      {/* Congratulation card */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-scout-cream to-white shadow-md">
        <CardContent className="grid grid-cols-1 gap-4 p-4 sm:p-6 sm:gap-8 lg:grid-cols-3">
          <div className="col-span-2 flex flex-col justify-center space-y-2">
            <div className="inline-flex space-x-2">
              <div className="rounded-full bg-scout-yellow/20 px-3 py-1 text-xs font-medium text-scout-purple">
                Ottimo lavoro!
                <span className="ml-1">🎉</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-scout-purple">
              Continua così!
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {user.role === "integrante" && "Hai completato 3 riunioni consecutive senza mancare!"}
              {user.role === "animatore" && "Le attività che hai pianificato hanno ricevuto ottimi feedback!"}
              {user.role === "direttore" && "La tua unità sta facendo grandi progressi questo mese!"}
              {user.role === "admin" && "Gli aggiornamenti del sistema sono stati implementati con successo!"}
            </p>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <div className="h-24 w-24 sm:h-32 sm:w-32 overflow-hidden">
              <Trophy className="h-full w-full text-yellow-500" />
            </div>
          </div>
        </CardContent>
        <div className="wave-divider"></div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Specializations card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-lg sm:text-xl">Le tue specializzazioni</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Progresso nelle tue specializzazioni
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {specializations.map((spec) => (
                <div key={spec.id} className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={cn("rounded-full p-1 sm:p-1.5", `${spec.color}/20`)}>
                        {spec.icon}
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-medium">{spec.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{spec.level}</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{spec.progress}%</span>
                  </div>
                  <Progress
                    value={spec.progress}
                    className="h-1.5 sm:h-2"
                    indicatorClassName={cn(spec.color)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activities card */}
        <Card>
          <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-lg sm:text-xl">Prossime attività</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Attività in programma
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="rounded-full bg-primary/10 p-1 sm:p-1.5">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium leading-tight">{activity.title}</p>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs text-muted-foreground">
                      <span>{activity.date}</span>
                      <span>•</span>
                      <span>{activity.location}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] sm:text-xs", 
                        activity.type === "Riunione" && "border-scout-blue text-scout-blue",
                        activity.type === "Formazione" && "border-scout-purple text-scout-purple",
                        activity.type === "Evento" && "border-scout-green text-scout-green",
                        activity.type === "Campo" && "border-scout-orange text-scout-orange"
                      )}
                    >
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Tabs defaultValue="achievements" className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="achievements">Conquiste</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="achievements" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="px-4 py-2 sm:px-6 sm:pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base sm:text-xl">{achievement.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] sm:text-xs",
                        achievement.difficulty === "Facile" && "border-scout-green text-scout-green",
                        achievement.difficulty === "Medio" && "border-scout-orange text-scout-orange",
                        achievement.difficulty === "Difficile" && "border-scout-red text-scout-red"
                      )}
                    >
                      {achievement.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-3 sm:px-6">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground">Progresso</span>
                      <span className="text-xs sm:text-sm font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1.5 sm:h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="progress">
          <Card>
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">Progresso complessivo</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Il tuo progresso in tutte le aree
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4 sm:px-6 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Prima scintilla</span>
                  <span className="text-[10px] sm:text-sm">12/36 completati</span>
                </div>
                <Progress value={33} className="h-2 sm:h-3" />
              </div>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-xs sm:text-sm font-medium">Suddivisione per categoria</h4>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  {specializations.map((spec) => (
                    <div key={spec.id} className="flex items-center space-x-2 sm:space-x-3">
                      <div className={cn("progress-badge h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20", spec.color)}>
                        <div className="z-20 text-xs sm:text-sm font-medium">{spec.progress}%</div>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium">{spec.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{spec.level}</p>
                      </div>
                      <style>
                        {`.${spec.color.replace('bg-', '')}::after {
                          width: ${spec.progress}%;
                          background: ${spec.color.replace('bg-', '')};
                        }`}
                      </style>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Admin/Director specific content */}
      {(user.role === "admin" || user.role === "direttore") && (
        <Card>
          <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-lg sm:text-xl">Panoramica dell'unità</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Informazioni generali sull'unità {user.unitName}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
              <div className="rounded-lg bg-primary/10 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Totale membri</p>
                    <p className="text-lg sm:text-2xl font-bold">24</p>
                  </div>
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
              </div>
              <div className="rounded-lg bg-scout-green/10 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Eventi attivi</p>
                    <p className="text-lg sm:text-2xl font-bold">7</p>
                  </div>
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-scout-green" />
                </div>
              </div>
              <div className="rounded-lg bg-scout-orange/10 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Specializzazioni</p>
                    <p className="text-lg sm:text-2xl font-bold">15</p>
                  </div>
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-scout-orange" />
                </div>
              </div>
              <div className="rounded-lg bg-scout-blue/10 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Materiali</p>
                    <p className="text-lg sm:text-2xl font-bold">32</p>
                  </div>
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-scout-blue" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;

