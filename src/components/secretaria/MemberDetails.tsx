
import React from "react";
import { MemberType } from "@/pages/Membri";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Edit, Download, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MemberDetailsProps {
  member: MemberType;
  onClose: () => void;
  onEdit: () => void;
  onGeneratePDF: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ 
  member, 
  onClose,
  onEdit,
  onGeneratePDF
}) => {
  const renderBambiniDetails = () => {
    if (member.memberType !== 'bambini') return null;

    return (
      <>
        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Grupo Sanguíneo:</p>
              <p className="text-sm">{member.bloodType || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Alergias:</p>
              <p className="text-sm">{member.allergies || "Nenhuma"}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Medicamentos:</p>
            <p className="text-sm">{member.medications || "Nenhum"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Observações Médicas:</p>
            <p className="text-sm">{member.healthNotes || "Nenhuma"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Doenças Anteriores:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {member.illnesses && member.illnesses.length > 0 ? 
                member.illnesses.map((illness, idx) => (
                  <Badge key={idx} variant="outline">{illness}</Badge>
                )) : 
                <p className="text-sm">Nenhuma doença registrada</p>
              }
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="authorizations" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Consentimento para Fotos</p>
                  <p className="text-sm text-muted-foreground">
                    Uso de fotos e vídeos em que o membro aparece
                  </p>
                </div>
                <Badge variant={member.photoConsent ? "default" : "destructive"}>
                  {member.photoConsent ? "Concedido" : "Não concedido"}
                </Badge>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Consentimento para Passeios</p>
                  <p className="text-sm text-muted-foreground">
                    Participação em passeios e excursões
                  </p>
                </div>
                <Badge variant={member.tripConsent ? "default" : "destructive"}>
                  {member.tripConsent ? "Concedido" : "Não concedido"}
                </Badge>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Consentimento para Tratamento Médico</p>
                  <p className="text-sm text-muted-foreground">
                    Assistência médica em caso de emergência
                  </p>
                </div>
                <Badge variant={member.medicalTreatmentConsent ? "default" : "destructive"}>
                  {member.medicalTreatmentConsent ? "Concedido" : "Não concedido"}
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="parent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Nome do Responsável:</p>
              <p className="text-sm">{member.parentName || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Telefone:</p>
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
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Endereço:</p>
            <p className="text-sm">{member.parentAddress || "-"}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Código Fiscal:</p>
            <p className="text-sm">{member.parentFiscalCode || "-"}</p>
          </div>
        </TabsContent>
      </>
    );
  };

  const renderAnimatoriDetails = () => {
    if (member.memberType !== 'animatori' && member.memberType !== 'accompagnatore') return null;
    
    return (
      <TabsContent value="document" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Tipo de Documento:</p>
            <p className="text-sm">{member.documentType || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Número:</p>
            <p className="text-sm">{member.documentNumber || "-"}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Emitido por:</p>
          <p className="text-sm">{member.issuedBy || "-"}</p>
        </div>
      </TabsContent>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Detalhes do Membro</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold">{member.name}</h2>
            <p className="text-muted-foreground">{member.email}</p>
            
            <div className="flex gap-2 mt-2">
              <Badge>{member.unitName}</Badge>
              <Badge variant="outline" className="capitalize">
                {member.memberType === 'bambini' ? 'Bambino' : 
                 member.memberType === 'animatori' ? 'Animatore' : 'Accompagnatore'}
              </Badge>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="personal">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            {member.memberType === 'bambini' && (
              <TabsTrigger value="health">Saúde</TabsTrigger>
            )}
            {(member.memberType === 'animatori' || member.memberType === 'accompagnatore') && (
              <TabsTrigger value="document">Documento</TabsTrigger>
            )}
            {member.memberType === 'bambini' && (
              <TabsTrigger value="authorizations">Autorizações</TabsTrigger>
            )}
            {member.memberType === 'bambini' && (
              <TabsTrigger value="parent">Responsável</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Data de Nascimento:</p>
                <p className="text-sm">
                  {member.birthDate ? new Date(member.birthDate).toLocaleDateString('it-IT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }) : "-"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Local de Nascimento:</p>
                <p className="text-sm">{member.birthPlace || "-"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Telefone:</p>
                <div className="flex items-center">
                  <p className="text-sm">{member.phone || "-"}</p>
                  {member.phone && (
                    <a 
                      href={`tel:${member.phone}`} 
                      className="ml-2 text-primary hover:text-primary/80"
                    >
                      <Phone className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Código Fiscal:</p>
                <p className="text-sm">{member.fiscalCode || "-"}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Endereço:</p>
              <p className="text-sm">{member.address || "-"}</p>
            </div>
          </TabsContent>
          
          {renderBambiniDetails()}
          {renderAnimatoriDetails()}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button variant="default" onClick={onGeneratePDF}>
          <Download className="mr-2 h-4 w-4" />
          Gerar PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberDetails;
