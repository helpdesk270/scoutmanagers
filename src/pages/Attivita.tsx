
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
import { Calendar, Clock, MapPin, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";

type Activity = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  participants: number;
  maxParticipants: number;
  type: "prossima" | "passata" | "suggerita";
  badges?: string[];
};

// Sample data for activities
const activities: Activity[] = [
  {
    id: "1",
    title: "Escursione al Lago",
    date: "15/05/2025",
    time: "09:00 - 17:00",
    location: "Lago di Garda",
    description: "Escursione guidata intorno al lago con attività di team building.",
    participants: 15,
    maxParticipants: 20,
    type: "prossima",
    badges: ["Natura", "Team Building"]
  },
  {
    id: "2",
    title: "Lezione di Primo Soccorso",
    date: "25/05/2025",
    time: "14:00 - 17:00",
    location: "Sede Centrale",
    description: "Corso base di primo soccorso con certificazione.",
    participants: 8,
    maxParticipants: 12,
    type: "prossima",
    badges: ["Salute", "Formazione"]
  },
  {
    id: "3",
    title: "Campeggio nel Bosco",
    date: "10/06/2025",
    time: "15:00 - 12:00 (giorno dopo)",
    location: "Bosco Nazionale",
    description: "Campeggio con attività di orientamento e sopravvivenza.",
    participants: 20,
    maxParticipants: 20,
    type: "prossima",
    badges: ["Natura", "Sopravvivenza"]
  },
  {
    id: "4",
    title: "Pulizia del Parco",
    date: "12/03/2025",
    time: "10:00 - 14:00",
    location: "Parco Comunale",
    description: "Attività di volontariato per la pulizia del parco cittadino.",
    participants: 18,
    maxParticipants: 25,
    type: "passata",
    badges: ["Ambiente", "Volontariato"]
  },
  {
    id: "5",
    title: "Torneo di Orienteering",
    date: "28/02/2025",
    time: "09:30 - 16:00",
    location: "Riserva Naturale",
    description: "Competizione di orienteering tra gruppi.",
    participants: 30,
    maxParticipants: 30,
    type: "passata",
    badges: ["Sport", "Orientamento"]
  },
  {
    id: "6",
    title: "Workshop di Nodi",
    date: "20/06/2025",
    time: "16:00 - 18:00",
    location: "Sede Centrale",
    description: "Impara i nodi essenziali per le attività all'aperto.",
    participants: 0,
    maxParticipants: 15,
    type: "suggerita",
    badges: ["Tecnica", "Manualità"]
  },
  {
    id: "7",
    title: "Visita all'Osservatorio",
    date: "15/07/2025",
    time: "21:00 - 00:00",
    location: "Osservatorio Astronomico",
    description: "Osservazione delle stelle e pianeti con astronomi professionisti.",
    participants: 0,
    maxParticipants: 20,
    type: "suggerita",
    badges: ["Astronomia", "Educazione"]
  }
];

const Attivita: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("prossime");
  
  const isAdminOrDirector = user?.role === "direttore" || user?.role === "admin";

  const filteredActivities = activities.filter(activity => {
    if (activeTab === "prossime") return activity.type === "prossima";
    if (activeTab === "passate") return activity.type === "passata";
    if (activeTab === "suggerite") return activity.type === "suggerita";
    return false;
  });

  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Attività</h1>
      
      <Tabs defaultValue="prossime" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="prossime" className="text-xs md:text-sm">Prossime Attività</TabsTrigger>
          <TabsTrigger value="passate" className="text-xs md:text-sm">Attività Passate</TabsTrigger>
          <TabsTrigger value="suggerite" className="text-xs md:text-sm">Attività Suggerite</TabsTrigger>
        </TabsList>

        {["prossime", "passate", "suggerite"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6">
            {tabValue === "prossime" && isAdminOrDirector && (
              <div className="flex justify-end mb-4">
                <Button className="flex items-center gap-2">
                  <span className="hidden sm:inline">Crea Nuova Attività</span>
                  <span className="sm:hidden">Nuova</span>
                </Button>
              </div>
            )}
            
            {filteredActivities.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">Nessuna attività {
                    tabValue === "prossime" ? "imminente" :
                    tabValue === "passate" ? "passata" : "suggerita"
                  } disponibile al momento.</p>
                </CardContent>
              </Card>
            ) : (
              <ScrollArea className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                  {filteredActivities.map((activity) => (
                    <Card key={activity.id} className="w-full h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{activity.title}</CardTitle>
                          {activity.badges && (
                            <div className="flex flex-wrap gap-1 justify-end">
                              {activity.badges.map((badge) => (
                                <span
                                  key={badge}
                                  className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <CardDescription>
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{activity.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{activity.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{activity.location}</span>
                            </div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {activity.participants}/{activity.maxParticipants} partecipanti
                            </span>
                          </div>
                          
                          {activity.participants < activity.maxParticipants && activity.type === "prossima" && (
                            <Button size="sm" variant={
                              activity.participants > 0 ? "outline" : "default"
                            }>
                              {activity.participants > 0 ? "Iscriviti" : "Partecipa"}
                            </Button>
                          )}
                          
                          {activity.type === "passata" && (
                            <Button size="sm" variant="outline">
                              Dettagli
                            </Button>
                          )}
                          
                          {activity.type === "suggerita" && (
                            <Button size="sm">
                              Vota
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Attivita;
