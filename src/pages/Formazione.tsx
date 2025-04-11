
import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import FormazioneHeader from "@/components/formazione/FormazioneHeader";
import PercorsoTab from "@/components/formazione/PercorsoTab";
import EsamiTab from "@/components/formazione/EsamiTab";
import ProgressiTab from "@/components/formazione/ProgressiTab";
import MaterialiTab from "@/components/formazione/MaterialiTab";

// Tipos de grupos de idade
type AgeGroup = "gemme" | "tizzoni" | "esploratori" | "animatori";

const Formazione: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("esploratori");
  
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <FormazioneHeader 
        title="Formazione" 
        description="Gestione del percorso formativo e progressione dei membri" 
      />
      
      <Tabs defaultValue="percorso" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="percorso" className="text-xs md:text-sm">Percorso Formativo</TabsTrigger>
          <TabsTrigger value="esami" className="text-xs md:text-sm">Esami e Requisiti</TabsTrigger>
          <TabsTrigger value="progressi" className="text-xs md:text-sm">Progressi</TabsTrigger>
          <TabsTrigger value="materiali" className="text-xs md:text-sm">Materiali Didattici</TabsTrigger>
        </TabsList>
        
        {/* Percorso Formativo Tab */}
        <TabsContent value="percorso">
          <PercorsoTab 
            selectedAgeGroup={selectedAgeGroup} 
            setSelectedAgeGroup={setSelectedAgeGroup} 
            isAdmin={isAdmin} 
          />
        </TabsContent>
        
        {/* Esami e Requisiti Tab */}
        <TabsContent value="esami">
          <EsamiTab isAdmin={isAdmin} />
        </TabsContent>
        
        {/* Progressi Tab */}
        <TabsContent value="progressi">
          <ProgressiTab isAdmin={isAdmin} />
        </TabsContent>
        
        {/* Materiali Didattici Tab */}
        <TabsContent value="materiali">
          <MaterialiTab isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Formazione;
