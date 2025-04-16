import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TizzoniChecklist from "./TizzoniChecklist";

// Tipi de grupos de idade
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

interface PercorsoTabProps {
  selectedAgeGroup: AgeGroup;
  setSelectedAgeGroup: React.Dispatch<React.SetStateAction<AgeGroup>>;
  isAdmin: boolean;
}

const PercorsoTab: React.FC<PercorsoTabProps> = ({ 
  selectedAgeGroup, 
  setSelectedAgeGroup,
  isAdmin
}) => {
  return (
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
          
          {selectedAgeGroup === "tizzoni" ? (
            <TizzoniChecklist />
          ) : (
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
          )}
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
  );
};

export { progressionPaths };
export default PercorsoTab;
