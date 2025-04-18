
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Music, FileText, Upload } from "lucide-react";

const MaterialiPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";

  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Materiali</h1>
          <p className="text-muted-foreground">Manuali, musiche e materiali didattici</p>
        </div>
        {isAdmin && (
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Carica Materiale
          </Button>
        )}
      </div>

      <Tabs defaultValue="manuali" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="manuali">Manuali</TabsTrigger>
          <TabsTrigger value="musiche">Musiche</TabsTrigger>
          <TabsTrigger value="altri">Altri Materiali</TabsTrigger>
        </TabsList>

        <TabsContent value="manuali">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  <span>Manuale del Tizzone</span>
                </CardTitle>
                <CardDescription>Guida completa per i Tizzoni</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Scarica PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="musiche">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  <span>Inno dei Tizzoni</span>
                </CardTitle>
                <CardDescription>Versione Ufficiale</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Riproduci
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="altri">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Calendario Attività</span>
                </CardTitle>
                <CardDescription>Anno 2024-2025</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Scarica
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialiPage;
