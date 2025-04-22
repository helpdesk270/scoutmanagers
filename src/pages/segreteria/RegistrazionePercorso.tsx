
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BookOpen, Pencil } from "lucide-react";

const RegistrazionePercorso = () => {
  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Registrazione Percorso</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Registrazione Percorso
          </CardTitle>
          <CardDescription>
            Gestisci i percorsi formativi per gemma, tizzoni, esploratori e animatori
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-20 text-muted-foreground">
            <Pencil className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Funzionalità in fase di sviluppo</p>
            <p className="max-w-md mx-auto mt-2">
              Questa sezione permetterà di gestire i percorsi formativi e le checklist per ogni percorso.
              Torna a visitarci presto!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrazionePercorso;
