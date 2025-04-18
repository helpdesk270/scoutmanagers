
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
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type AgeGroup = "gemme" | "tizzoni" | "esploratori" | "animatori";

const Formazione: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("esploratori");
  const [selectedMember, setSelectedMember] = useState<string>("");
  
  const mockMembers = [
    { id: "1", name: "Marco Rossi", unit: "Tizzoni" },
    { id: "2", name: "Lucia Verdi", unit: "Gemme" },
    { id: "3", name: "Giovanni Bianchi", unit: "Esploratori" },
    // Add more mock members as needed
  ];
  
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <FormazioneHeader 
        title="Formazione" 
        description="Gestione del percorso formativo e progressione dei membri" 
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="member-select">Seleziona Membro</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger id="member-select">
                  <SelectValue placeholder="Seleziona un membro" />
                </SelectTrigger>
                <SelectContent>
                  {mockMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} - {member.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="percorso" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="percorso" className="text-xs md:text-sm">Percorso Formativo</TabsTrigger>
          <TabsTrigger value="esami" className="text-xs md:text-sm">Esami e Requisiti</TabsTrigger>
          <TabsTrigger value="progressi" className="text-xs md:text-sm">Progressi</TabsTrigger>
          <TabsTrigger value="materiali" className="text-xs md:text-sm">Materiali Didattici</TabsTrigger>
        </TabsList>
        
        <TabsContent value="percorso">
          <PercorsoTab 
            selectedAgeGroup={selectedAgeGroup} 
            setSelectedAgeGroup={setSelectedAgeGroup} 
            isAdmin={isAdmin} 
          />
        </TabsContent>
        
        <TabsContent value="esami">
          <EsamiTab isAdmin={isAdmin} />
        </TabsContent>
        
        <TabsContent value="progressi">
          <ProgressiTab isAdmin={isAdmin} />
        </TabsContent>
        
        <TabsContent value="materiali">
          <MaterialiTab isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Formazione;
