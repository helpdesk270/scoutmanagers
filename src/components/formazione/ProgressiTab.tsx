
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, BarChart4, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface ProgressiTabProps {
  isAdmin: boolean;
}

const ProgressiTab: React.FC<ProgressiTabProps> = ({ isAdmin }) => {
  return (
    <>
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
    </>
  );
};

export default ProgressiTab;
