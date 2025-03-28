
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music, FileText, Image } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Biblioteca = () => {
  const { user } = useAuth();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Biblioteca</h1>
      <p className="text-muted-foreground mb-8">
        Accedi alla raccolta di musiche, manuali e foto del Club Comando Celeste
      </p>

      <Tabs defaultValue="musica" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="musica" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Musica</span>
          </TabsTrigger>
          <TabsTrigger value="manuali" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Manuali</span>
          </TabsTrigger>
          <TabsTrigger value="foto" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Foto</span>
          </TabsTrigger>
        </TabsList>

        {/* Musica Section */}
        <TabsContent value="musica">
          <Card>
            <CardHeader>
              <CardTitle>Raccolta Musicale</CardTitle>
              <CardDescription>
                Canzoni e inni utilizzati nelle attività del club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titolo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Durata</TableHead>
                    <TableHead className="text-right">Azione</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Inno del Club</TableCell>
                    <TableCell>Cerimoniale</TableCell>
                    <TableCell>2:45</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Ascolta
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marcia Scout</TableCell>
                    <TableCell>Attività</TableCell>
                    <TableCell>3:10</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Ascolta
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Canzone del Fuoco</TableCell>
                    <TableCell>Serata</TableCell>
                    <TableCell>4:05</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Ascolta
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Alba Scout</TableCell>
                    <TableCell>Mattutino</TableCell>
                    <TableCell>2:30</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Ascolta
                      </a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manuali Section */}
        <TabsContent value="manuali">
          <Card>
            <CardHeader>
              <CardTitle>Manuali e Documenti</CardTitle>
              <CardDescription>
                Guide, manuali e documenti utili per le attività
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titolo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Azione</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Manuale Base</TableCell>
                    <TableCell>Formazione</TableCell>
                    <TableCell>10/01/2023</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Scarica PDF
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Guida alle Specializzazioni</TableCell>
                    <TableCell>Specializzazioni</TableCell>
                    <TableCell>15/03/2023</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Scarica PDF
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Protocollo di Sicurezza</TableCell>
                    <TableCell>Sicurezza</TableCell>
                    <TableCell>22/05/2023</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Scarica PDF
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Guida alle Attività Outdoor</TableCell>
                    <TableCell>Attività</TableCell>
                    <TableCell>07/06/2023</TableCell>
                    <TableCell className="text-right">
                      <a href="#" className="text-primary hover:underline">
                        Scarica PDF
                      </a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Foto Section */}
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
