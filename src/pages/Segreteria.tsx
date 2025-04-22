
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  Printer,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Segreteria = () => {
  const segreteriaModules = [
    {
      title: "Registrazione Membri",
      description: "Gestisci i membri (bambini, animatori, accompagnatore)",
      icon: <Users className="h-10 w-10 text-primary" />,
      path: "/segreteria/membri",
      color: "bg-blue-50"
    },
    {
      title: "Registrazione Percorso",
      description: "Gestisci i percorsi formativi",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      path: "/segreteria/percorso",
      color: "bg-green-50"
    },
    {
      title: "Registrazione Specialità",
      description: "Gestisci le specialità per formazione",
      icon: <Award className="h-10 w-10 text-primary" />,
      path: "/segreteria/specialita",
      color: "bg-amber-50"
    },
    {
      title: "Rapporti",
      description: "Visualizza panoramica, partecipazione e rapporti personalizzati",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      path: "/segreteria/rapporti",
      color: "bg-indigo-50"
    },
    {
      title: "Stampa",
      description: "Genera moduli di registrazione e adesioni per la stampa",
      icon: <Printer className="h-10 w-10 text-primary" />,
      path: "/segreteria/stampa",
      color: "bg-rose-50"
    }
  ];

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">SEGRETERIA</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segreteriaModules.map((module) => (
          <Card key={module.path} className="overflow-hidden">
            <CardHeader className={`${module.color} p-4 space-y-2`}>
              <div className="flex items-center justify-between">
                {module.icon}
              </div>
              <CardTitle className="text-xl">{module.title}</CardTitle>
              <CardDescription className="text-gray-700">
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end p-4 pt-3">
              <Button asChild variant="ghost" className="gap-1">
                <Link to={module.path}>
                  <span>Accedi</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Segreteria;
