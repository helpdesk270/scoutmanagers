import React, { useState, useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type AgeGroup = "gemme" | "tizzoni" | "esploratori" | "animatori";

// Mock data interface
interface Member {
  id: string;
  name: string;
  age: number;
  unit: string;
  imageUrl?: string;
  joinDate: string;
  completedExams: number;
  totalExams: number;
}

const mockMembers: Member[] = [
  { 
    id: "1", 
    name: "Marco Rossi", 
    age: 8,
    unit: "Tizzoni", 
    joinDate: "2023-06-15",
    completedExams: 4,
    totalExams: 10
  },
  { 
    id: "2", 
    name: "Lucia Verdi", 
    age: 4,
    unit: "Gemme", 
    joinDate: "2024-01-10",
    completedExams: 2,
    totalExams: 5
  },
  { 
    id: "3", 
    name: "Giovanni Bianchi", 
    age: 13,
    unit: "Esploratori", 
    joinDate: "2022-09-01",
    completedExams: 8,
    totalExams: 12
  },
];

const getAgeGroupFromAge = (age: number): AgeGroup => {
  if (age >= 16) return "animatori";
  if (age >= 12) return "esploratori";
  if (age >= 6) return "tizzoni";
  return "gemme";
};

const Formazione: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("esploratori");
  const [activeTab, setActiveTab] = useState("percorso");
  
  const currentMember = mockMembers.find(m => m.id === selectedMember);

  useEffect(() => {
    if (currentMember) {
      const ageGroup = getAgeGroupFromAge(currentMember.age);
      setSelectedAgeGroup(ageGroup);
    }
  }, [currentMember]);

  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <FormazioneHeader 
        title="Formazione" 
        description="Gestione del percorso formativo e progressione dei membri" 
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {currentMember && (
              <div className="bg-accent/20 p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{currentMember.name}</h3>
                    <Badge variant="outline">{currentMember.unit}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Età: {currentMember.age} anni</p>
                    <p>Data di ingresso: {new Date(currentMember.joinDate).toLocaleDateString()}</p>
                    <p>Esami completati: {currentMember.completedExams}/{currentMember.totalExams}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="percorso" className="text-xs md:text-sm">Percorso Formativo</TabsTrigger>
          <TabsTrigger value="esami" className="text-xs md:text-sm">Esami e Requisiti</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default Formazione;
