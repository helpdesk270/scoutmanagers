
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Edit, 
  Trash2, 
  Award, 
  Calendar, 
  AlertCircle, 
  Phone 
} from "lucide-react";
import { MemberType } from "@/types/member";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFGenerator from "./PDFGenerator";

interface MemberDetailsProps {
  member: MemberType;
  onBack: () => void;
  onEdit: () => void;
  onDelete?: (id: string) => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onBack, onEdit, onDelete }) => {
  const renderMemberTypeSpecificTabs = () => {
    if (member.memberType === "bambini") {
      return (
        <>
          <TabsTrigger value="health">Salute</TabsTrigger>
          <TabsTrigger value="parent">Genitori</TabsTrigger>
          <TabsTrigger value="authorizations">Autorizzazioni</TabsTrigger>
        </>
      );
    } else {
      return <TabsTrigger value="document">Documento</TabsTrigger>;
    }
  };

  const renderHealthTab = () => {
    return (
      <TabsContent value="health" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Gruppo Sanguigno:</p>
            <p className="text-sm">{member.bloodType || "-"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Allergie:</p>
            <p className="text-sm whitespace-pre-wrap">{member.allergies || "Nessuna allergia registrata"}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Farmaci:</p>
          <p className="text-sm whitespace-pre-wrap">{member.medications || "Nessun farmaco registrato"}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Note Mediche:</p>
          <p className="text-sm whitespace-pre-wrap">{member.healthNotes || "Nessuna nota medica"}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Segue un trattamento medico?</p>
          <p className="text-sm">{member.followsMedicalTreatment ? "Sì" : "No"}</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Malattie pregresse:</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {member.illnesses && Object.entries(member.illnesses).map(([key, value]) => (
              <Badge key={key} variant={value ? "default" : "outline"} className="justify-center">
                {key === "rosolia" ? "Rosolia" : 
                 key === "varicella" ? "Varicella" : 
                 key === "angina" ? "Angina" : 
                 key === "febbreReumatica" ? "Febbre Reumatica" : 
                 key === "scarlattina" ? "Scarlattina" : 
                 key === "pertosse" ? "Pertosse" : 
                 key === "otite" ? "Otite" : 
                 key === "morbillo" ? "Morbillo" : 
                 key === "parotite" ? "Parotite" : key}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Dettagli Allergie:</p>
          <p className="text-sm whitespace-pre-wrap">{member.allergyDetails || "-"}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Difficoltà di Salute:</p>
          <p className="text-sm whitespace-pre-wrap">{member.healthDifficulties || "-"}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Raccomandazioni dai Genitori:</p>
          <p className="text-sm whitespace-pre-wrap">{member.parentRecommendations || "-"}</p>
        </div>
        
        {(!member.bloodType && !member.allergies && 
          !member.medications && !member.healthNotes && 
          !member.allergyDetails && !member.healthDifficulties && 
          !member.parentRecommendations) && (
          <div className="flex items-center justify-center p-4 text-muted-foreground">
            <AlertCircle className="mr-2 h-4 w-4" />
            <p>Nessuna informazione medica registrata</p>
          </div>
        )}
      </TabsContent>
    );
  };

  const renderParentTab = () => {
    return (
      <TabsContent value="parent" className="space-y-4">
        <div className="border rounded-md p-4">
          <p className="text-sm font-semibold mb-2">Informazioni Genitore/Tutore</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Nome e Cognome</p>
              <p className="text-sm">{member.parentName || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Telefono</p>
              <div className="flex items-center">
                <p className="text-sm">{member.parentPhone || "-"}</p>
                {member.parentPhone && (
                  <a 
                    href={`tel:${member.parentPhone}`} 
                    className="ml-2 text-primary hover:text-primary/80"
                  >
                    <Phone className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Indirizzo</p>
              <p className="text-sm">{member.parentAddress || "-"}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Codice Fiscale</p>
              <p className="text-sm">{member.parentFiscalCode || "-"}</p>
            </div>
          </div>
        </div>
        
        {(!member.parentName && !member.parentPhone && 
          !member.parentAddress && !member.parentFiscalCode) && (
          <div className="flex items-center justify-center p-4 text-muted-foreground">
            <AlertCircle className="mr-2 h-4 w-4" />
            <p>Nessuna informazione sul genitore/tutore registrata</p>
          </div>
        )}
        
        {(member.emergencyContact1Name || member.emergencyContact1Phone) && (
          <div className="border rounded-md p-4 mt-4">
            <p className="text-sm font-semibold mb-2">Contatto di Emergenza</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Nome</p>
                <p className="text-sm">{member.emergencyContact1Name || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Relazione</p>
                <p className="text-sm">{member.emergencyContact1Relation || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Telefono</p>
                <div className="flex items-center">
                  <p className="text-sm">{member.emergencyContact1Phone || "-"}</p>
                  {member.emergencyContact1Phone && (
                    <a 
                      href={`tel:${member.emergencyContact1Phone}`} 
                      className="ml-2 text-primary hover:text-primary/80"
                    >
                      <Phone className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </TabsContent>
    );
  };

  const renderAuthorizationsTab = () => {
    return (
      <TabsContent value="authorizations" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Consenso Trattamento Dati</p>
                <p className="text-sm text-muted-foreground">
                  Autorizzazione al trattamento dei dati personali
                </p>
              </div>
              <Badge variant={member.dataProcessingConsent ? "default" : "destructive"}>
                {member.dataProcessingConsent ? "Concesso" : "Non concesso"}
              </Badge>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Consenso Fotografico</p>
                <p className="text-sm text-muted-foreground">
                  Uso di foto e video in cui appare il membro
                </p>
              </div>
              <Badge variant={member.photoConsent ? "default" : "destructive"}>
                {member.photoConsent ? "Concesso" : "Non concesso"}
              </Badge>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Consenso Fotografico A.I.S.A</p>
                <p className="text-sm text-muted-foreground">
                  Uso di foto e video nell'ambito di attività di comunicazione inerenti all'A.I.S.A
                </p>
              </div>
              <Badge variant={member.aisaPhotoConsent ? "default" : "destructive"}>
                {member.aisaPhotoConsent ? "Concesso" : "Non concesso"}
              </Badge>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Consenso per Gite</p>
                <p className="text-sm text-muted-foreground">
                  Partecipazione a gite ed escursioni
                </p>
              </div>
              <Badge variant={member.tripConsent ? "default" : "destructive"}>
                {member.tripConsent ? "Concesso" : "Non concesso"}
              </Badge>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Consenso per Trattamento Medico</p>
                <p className="text-sm text-muted-foreground">
                  Assistenza medica in caso di emergenza
                </p>
              </div>
              <Badge variant={member.medicalTreatmentConsent ? "default" : "destructive"}>
                {member.medicalTreatmentConsent ? "Concesso" : "Non concesso"}
              </Badge>
            </div>
          </div>
        </div>
      </TabsContent>
    );
  };

  const renderDocumentTab = () => {
    return (
      <TabsContent value="document" className="space-y-4">
        <div className="border rounded-md p-4">
          <p className="text-sm font-semibold mb-2">Informazioni Documento</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Tipo di Documento</p>
              <p className="text-sm">
                {member.documentType === "cartaIdentita" 
                  ? "Carta d'identità" 
                  : member.documentType === "patente" 
                    ? "Patente" 
                    : member.documentType === "passaporto" 
                      ? "Passaporto" 
                      : "-"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Numero</p>
              <p className="text-sm">{member.documentNumber || "-"}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Rilasciato da</p>
              <p className="text-sm">{member.issuedBy || "-"}</p>
            </div>
          </div>
        </div>
        
        {(!member.documentType && !member.documentNumber && !member.issuedBy) && (
          <div className="flex items-center justify-center p-4 text-muted-foreground">
            <AlertCircle className="mr-2 h-4 w-4" />
            <p>Nessuna informazione sul documento registrata</p>
          </div>
        )}
      </TabsContent>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <CardTitle>{member.name}</CardTitle>
          </div>
          <div className="flex gap-2">
            <PDFDownloadLink 
              document={<PDFGenerator members={[member]} />} 
              fileName={`${member.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`}
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Stampa PDF
            </PDFDownloadLink>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifica
            </Button>
          </div>
        </div>
        <CardDescription>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{member.unitName}</Badge>
            <Badge variant="outline" className="capitalize">{member.memberType === "bambini" ? "Bambino" : member.memberType === "animatori" ? "Animatore" : "Accompagnatore"}</Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-4">
            <TabsTrigger value="personal">Dati Personali</TabsTrigger>
            {renderMemberTypeSpecificTabs()}
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm">{member.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Telefono:</p>
                <p className="text-sm">{member.phone || "-"}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Indirizzo:</p>
              <p className="text-sm">{member.address || "-"}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Data di nascita:</p>
                <p className="text-sm">
                  {member.birthDate 
                    ? new Date(member.birthDate).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                    : "-"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Luogo di nascita:</p>
                <p className="text-sm">{member.birthPlace || "-"}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Codice Fiscale:</p>
              <p className="text-sm">{member.fiscalCode || "-"}</p>
            </div>
          </TabsContent>
          
          {member.memberType === "bambini" && renderHealthTab()}
          {member.memberType === "bambini" && renderParentTab()}
          {member.memberType === "bambini" && renderAuthorizationsTab()}
          {member.memberType !== "bambini" && renderDocumentTab()}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onDelete && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Elimina
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Conferma eliminazione</DialogTitle>
                <DialogDescription>
                  Sei sicuro di voler eliminare {member.name}? Questa azione non può essere annullata.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Annulla</Button>
                <Button 
                  variant="destructive"
                  onClick={() => onDelete(member.id)}
                >
                  Elimina
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemberDetails;
