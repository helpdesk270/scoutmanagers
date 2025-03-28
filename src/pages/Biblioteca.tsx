import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, FileText, Image, Download, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Biblioteca = () => {
  const { user } = useAuth();

  return (
    <div className="container py-8 max-w-full overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-6">Biblioteca</h1>
      <p className="text-muted-foreground mb-8">
        Accedi alla raccolta di musiche, manuali e foto del Club Comando Celeste
      </p>

      <Tabs defaultValue="musica" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="musica" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span className="truncate">Musica</span>
          </TabsTrigger>
          <TabsTrigger value="manuali" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="truncate">Manuali</span>
          </TabsTrigger>
          <TabsTrigger value="foto" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="truncate">Foto</span>
          </TabsTrigger>
        </TabsList>

        {/* Musica Section - Card Layout */}
        <TabsContent value="musica">
          <Card>
            <CardHeader>
              <CardTitle>Raccolta Musicale</CardTitle>
              <CardDescription>
                Canzoni e inni utilizzati nelle attività del club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Music Card 1 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Inno del Club</CardTitle>
                        <CardDescription>Cerimoniale • 2:45</CardDescription>
                      </div>
                      <Badge>Ufficiale</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>Ascolta</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Music Card 2 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Marcia Scout</CardTitle>
                        <CardDescription>Attività • 3:10</CardDescription>
                      </div>
                      <Badge>Popolare</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>Ascolta</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Music Card 3 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Canzone del Fuoco</CardTitle>
                        <CardDescription>Serata • 4:05</CardDescription>
                      </div>
                      <Badge>Tradizionale</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>Ascolta</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Music Card 4 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Alba Scout</CardTitle>
                        <CardDescription>Mattutino • 2:30</CardDescription>
                      </div>
                      <Badge>Tradizionale</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>Ascolta</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manuali Section - Card Layout */}
        <TabsContent value="manuali">
          <Card>
            <CardHeader>
              <CardTitle>Manuali e Documenti</CardTitle>
              <CardDescription>
                Guide, manuali e documenti utili per le attività
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Manual Card 1 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Manuale Base</CardTitle>
                        <CardDescription>Formazione • 10/01/2023</CardDescription>
                      </div>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Scarica</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Manual Card 2 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Guida alle Specializzazioni</CardTitle>
                        <CardDescription>Specializzazioni • 15/03/2023</CardDescription>
                      </div>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Scarica</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Manual Card 3 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Protocollo di Sicurezza</CardTitle>
                        <CardDescription>Sicurezza • 22/05/2023</CardDescription>
                      </div>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Scarica</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Manual Card 4 */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Guida alle Attività Outdoor</CardTitle>
                        <CardDescription>Attività • 07/06/2023</CardDescription>
                      </div>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Scarica</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Foto Section - Keep the existing grid layout */}
        <TabsContent value="foto">
          <Card>
            <CardHeader>
              <CardTitle>Galleria Fotografica</CardTitle>
              <CardDescription>
                Ricordi delle attività e degli eventi del club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* Photo 1 */}
                <div className="overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img 
                      src="/lovable-uploads/33c06b28-4bba-4755-ba53-2b0e1d2ae42e.png" 
                      alt="Attività all'aperto"
                      className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">Campeggio Estivo 2023</p>
                  <p className="text-xs text-muted-foreground">Luglio 2023</p>
                </div>
                
                {/* Photo 2 */}
                <div className="overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img 
                      src="/lovable-uploads/a4a9c84c-b5c0-4b04-8e59-65187e7638ba.png" 
                      alt="Cerimonia di premiazione"
                      className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">Cerimonia di Premiazione</p>
                  <p className="text-xs text-muted-foreground">Maggio 2023</p>
                </div>
                
                {/* Photo 3 */}
                <div className="overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img 
                      src="/lovable-uploads/5a8bf83b-33ac-4043-97e0-3dc4195f776d.png" 
                      alt="Attività di gruppo"
                      className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">Giornata di Formazione</p>
                  <p className="text-xs text-muted-foreground">Marzo 2023</p>
                </div>
                
                {/* Photo 4 */}
                <div className="overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img 
                      src="/lovable-uploads/c773e33a-db69-4582-aa20-c0235f627a11.png" 
                      alt="Evento speciale"
                      className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">Festa di Fine Anno</p>
                  <p className="text-xs text-muted-foreground">Dicembre 2022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Biblioteca;
