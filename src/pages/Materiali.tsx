
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book, Music, FileText, Upload, Download, File } from "lucide-react";
import { toast } from "sonner";

interface Material {
  id: string;
  title: string;
  description: string;
  type: "manuale" | "musica" | "altro";
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

// Mock data for demonstration
const mockMaterials: Material[] = [
  {
    id: "1",
    title: "Manuale del Tizzone",
    description: "Guida completa per i Tizzoni",
    type: "manuale",
    fileUrl: "/path/to/file.pdf",
    uploadedBy: "Mario Rossi",
    uploadedAt: "2024-04-18",
  },
  {
    id: "2",
    title: "Inno dei Tizzoni",
    description: "Versione Ufficiale",
    type: "musica",
    fileUrl: "/path/to/audio.mp3",
    uploadedBy: "Luigi Verdi",
    uploadedAt: "2024-04-17",
  },
  {
    id: "3",
    title: "Calendario Attività",
    description: "Anno 2024-2025",
    type: "altro",
    fileUrl: "/path/to/calendar.pdf",
    uploadedBy: "Anna Bianchi",
    uploadedAt: "2024-04-16",
  },
];

const MaterialiPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "direttore" || user?.role === "admin" || user?.role === "animatore";
  
  const [materials] = useState<Material[]>(mockMaterials);
  const [uploadType, setUploadType] = useState<Material["type"]>("manuale");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !uploadTitle || !uploadDescription) {
      toast.error("Per favore, compila tutti i campi richiesti");
      return;
    }

    // Here you would typically upload the file to your backend
    toast.success("Materiale caricato con successo!");
    setIsDialogOpen(false);
    setUploadTitle("");
    setUploadDescription("");
    setSelectedFile(null);
  };

  const handleDownload = (material: Material) => {
    // Here you would typically handle the file download
    toast.success(`Scaricamento di ${material.title} iniziato`);
  };

  const renderMaterialCard = (material: Material) => (
    <Card key={material.id}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {material.type === "manuale" && <Book className="h-5 w-5 text-primary" />}
          {material.type === "musica" && <Music className="h-5 w-5 text-primary" />}
          {material.type === "altro" && <FileText className="h-5 w-5 text-primary" />}
          <span>{material.title}</span>
        </CardTitle>
        <CardDescription>{material.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Caricato da {material.uploadedBy} il{" "}
          {new Date(material.uploadedAt).toLocaleDateString()}
        </p>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleDownload(material)}
        >
          <Download className="w-4 h-4 mr-2" />
          Scarica
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Materiali</h1>
          <p className="text-muted-foreground">
            Manuali, musiche e materiali didattici
          </p>
        </div>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Carica Materiale
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Carica Nuovo Materiale</DialogTitle>
                <DialogDescription>
                  Carica un nuovo materiale per il club
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titolo</Label>
                  <Input
                    id="title"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Inserisci il titolo del materiale"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione</Label>
                  <Input
                    id="description"
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Inserisci una breve descrizione"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo di Materiale</Label>
                  <select
                    id="type"
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as Material["type"])}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="manuale">Manuale</option>
                    <option value="musica">Musica</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                </div>
                <Button onClick={handleUpload} className="w-full">
                  Carica
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
            {materials
              .filter((m) => m.type === "manuale")
              .map(renderMaterialCard)}
          </div>
        </TabsContent>

        <TabsContent value="musiche">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials
              .filter((m) => m.type === "musica")
              .map(renderMaterialCard)}
          </div>
        </TabsContent>

        <TabsContent value="altri">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials
              .filter((m) => m.type === "altro")
              .map(renderMaterialCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialiPage;
