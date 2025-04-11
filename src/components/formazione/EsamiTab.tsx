
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface EsamiTabProps {
  isAdmin: boolean;
}

const EsamiTab: React.FC<EsamiTabProps> = ({ isAdmin }) => {
  return (
    <>
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
    </>
  );
};

export default EsamiTab;
