
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart3, Pencil } from "lucide-react";

const Rapporti = () => {
  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Rapporti</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Rapporti Segreteria
          </CardTitle>
          <CardDescription>
            Visualizza panoramica, partecipazione e rapporti personalizzati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-20 text-muted-foreground">
            <Pencil className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Funzionalità in fase di sviluppo</p>
            <p className="max-w-md mx-auto mt-2">
              Questa sezione permetterà di visualizzare panoramiche, report sulla partecipazione e creare rapporti personalizzati.
              Torna a visitarci presto!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rapporti;
