
import React, { useState } from "react";
import { MemberType } from "@/types/member";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Download,
  CheckSquare,
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface PDFGeneratorProps {
  member: MemberType;
  onClose: () => void;
}

type DocumentType = 
  | "registration" 
  | "health" 
  | "photo_consent" 
  | "trip_consent"
  | "medical_consent";

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ member, onClose }) => {
  const { toast } = useToast();
  const [documentType, setDocumentType] = useState<DocumentType>("registration");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);
  
  // Mock function to generate PDF (in a real app this would create an actual PDF)
  const generatePDF = () => {
    // This would be an API call or client-side PDF generation
    toast({
      title: "PDF Gerado com Sucesso",
      description: `O documento foi baixado para ${member.name}`,
    });
    
    onClose();
  };

  const documentTypes = [
    { value: "registration", label: "Ficha de Inscrição" },
    ...(member.memberType === "bambini" ? [
      { value: "health", label: "Informações de Saúde" },
      { value: "photo_consent", label: "Autorização para Fotos" },
      { value: "trip_consent", label: "Autorização para Passeios" },
      { value: "medical_consent", label: "Autorização para Tratamento Médico" },
    ] : []),
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerar Documento PDF
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="document-type">Tipo de Documento</Label>
            <Select
              value={documentType}
              onValueChange={(value) => setDocumentType(value as DocumentType)}
            >
              <SelectTrigger id="document-type">
                <SelectValue placeholder="Selecione o tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((doc) => (
                  <SelectItem key={doc.value} value={doc.value}>
                    {doc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-header" 
                checked={includeHeader}
                onCheckedChange={(checked) => 
                  setIncludeHeader(Boolean(checked))
                }
              />
              <Label htmlFor="include-header">Incluir Cabeçalho</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-signature" 
                checked={includeSignature}
                onCheckedChange={(checked) => 
                  setIncludeSignature(Boolean(checked))
                }
              />
              <Label htmlFor="include-signature">Incluir Assinatura</Label>
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <p className="text-sm">
              Este documento será gerado com os dados atuais do membro. 
              Certifique-se de que todas as informações estão atualizadas.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={generatePDF} className="gap-2">
            <Download className="h-4 w-4" />
            Gerar e Baixar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PDFGenerator;
