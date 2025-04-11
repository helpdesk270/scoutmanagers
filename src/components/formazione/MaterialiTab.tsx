
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { progressionPaths } from "./PercorsoTab";

// Sample materials data
const materials = [
  {
    id: 1,
    title: "Manuale dell'Esploratore",
    category: "libro",
    targetAgeGroup: "esploratori",
    format: "PDF",
    fileSize: "5.4 MB",
    uploadDate: "2023-11-10"
  },
  {
    id: 2,
    title: "Guida alle Attività Gemme",
    category: "guida",
    targetAgeGroup: "gemme",
    format: "PDF",
    fileSize: "3.1 MB",
    uploadDate: "2023-12-05"
  },
  {
    id: 3,
    title: "Manuale per gli Animatori",
    category: "manuale",
    targetAgeGroup: "animatori",
    format: "PDF",
    fileSize: "7.8 MB",
    uploadDate: "2024-01-20"
  },
  {
    id: 4,
    title: "Attività per Tizzoni",
    category: "guida",
    targetAgeGroup: "tizzoni",
    format: "PDF",
    fileSize: "4.2 MB",
    uploadDate: "2023-10-15"
  }
];

interface MaterialiTabProps {
  isAdmin: boolean;
}

const MaterialiTab: React.FC<MaterialiTabProps> = ({ isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter materials based on search term
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.targetAgeGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Materiali Didattici</h2>
        {isAdmin && (
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Carica Materiale
          </Button>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Filtri</CardTitle>
            <CardDescription>Filtra i materiali didattici</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Cerca</label>
                <div className="relative">
                  <Input 
                    type="search" 
                    placeholder="Cerca materiali..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Categoria</label>
                <div className="space-y-2">
                  {["manuale", "guida", "libro", "scheda", "video"].map((category) => (
                    <Button key={category} variant="outline" size="sm" className="mr-2 mb-2 capitalize">
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Fascia d'età</label>
                <div className="space-y-2">
                  {Object.keys(progressionPaths).map((group) => (
                    <Button key={group} variant="outline" size="sm" className="mr-2 mb-2 capitalize">
                      {group}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Materiali Disponibili</CardTitle>
              <CardDescription>
                {filteredMaterials.length} materiali trovati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="grid grid-cols-1 gap-4">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-base">{material.title}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <Badge variant="outline" className="capitalize">
                                {material.category}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {material.targetAgeGroup}
                              </Badge>
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-1 rounded-full bg-muted px-2 py-1 text-xs">
                            <span>{material.format}</span>
                            <span>•</span>
                            <span>{material.fileSize}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="border-t p-3 flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          Aggiornato il {new Date(material.uploadDate).toLocaleDateString('it-IT')}
                        </span>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Scarica
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {filteredMaterials.length === 0 && (
                    <div className="bg-muted p-8 rounded-lg flex flex-col items-center justify-center text-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-semibold">Nessun materiale trovato</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Prova a modificare i filtri di ricerca
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MaterialiTab;
