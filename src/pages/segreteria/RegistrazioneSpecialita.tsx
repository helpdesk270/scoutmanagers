
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Award, Pencil } from "lucide-react";

const RegistrazioneSpecialita = () => {
  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Registrazione Specialità</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Registrazione Specialità
          </CardTitle>
          <CardDescription>
            Gestisci le specialità per gemma, tizzoni, esploratori e animatori
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-20 text-muted-foreground">
            <Pencil className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Funzionalità in fase di sviluppo</p>
            <p className="max-w-md mx-auto mt-2">
              Questa sezione permetterà di gestire le specialità per ciascuna formazione con le relative categorie.
              Torna a visitarci presto!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrazioneSpecialita;
