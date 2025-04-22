
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MemberType } from "../../pages/Membri";
import MemberList from "@/components/secretaria/MemberList";
import MemberForm from "@/components/members/MemberForm";
import { Users, UserPlus, Download, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import MemberDetails from "@/components/secretaria/MemberDetails";
import PDFGenerator from "@/components/secretaria/PDFGenerator";

const Membros: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [members, setMembers] = useState<MemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("bambini");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberType | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [showPdfDialog, setShowPdfDialog] = useState(false);

  React.useEffect(() => {
    const mockMembers: MemberType[] = [
      {
        id: "1",
        name: "Laura Rossi",
        email: "laura.rossi@example.com",
        role: "integrante",
        unitName: "Tizzoni",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2013-05-10"),
        address: "Via Roma 123, Milano",
        phone: "+39 333 1234567",
        fiscalCode: "RSSLRA13E50F205Z",
        bloodType: "A+",
        allergies: "Polline, fragole",
        medications: "Antistaminico al bisogno",
        healthNotes: "Asma lieve, porta con sé inalatore",
        photoConsent: true,
        tripConsent: true,
        medicalTreatmentConsent: true,
        emergencyContact1Name: "Marco Rossi",
        emergencyContact1Relation: "Padre",
        emergencyContact1Phone: "+39 335 9876543",
        emergencyContact2Name: "Giulia Bianchi",
        emergencyContact2Relation: "Madre",
        emergencyContact2Phone: "+39 339 8765432",
        memberType: "bambini",
        birthPlace: "Milano",
        illnesses: ["Varicella"],
        parentName: "Marco Rossi",
        parentAddress: "Via Roma 123, Milano",
        parentFiscalCode: "RSSMRC70A01F205Z",
        parentPhone: "+39 335 9876543",
        achievements: [],
        attendance: []
      },
      {
        id: "2",
        name: "Carlo Bianchi",
        email: "carlo@example.com",
        role: "animatore",
        unitName: "Animatori",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("1998-03-15"),
        birthPlace: "Roma",
        address: "Via Dante 45, Roma",
        phone: "+39 333 1122334",
        fiscalCode: "BNCCRL98C15H501Z",
        memberType: "animatori",
        documentType: "Carta d'identità",
        documentNumber: "AX123456",
        issuedBy: "Comune di Roma",
        achievements: [],
        attendance: []
      },
      {
        id: "3",
        name: "Maria Verdi",
        email: "maria@example.com",
        role: "integrante",
        unitName: "Gemme",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2017-09-20"),
        birthPlace: "Firenze",
        address: "Via Garibaldi 78, Firenze",
        phone: "+39 333 5544332",
        fiscalCode: "VRDMRA17P60D612Z",
        bloodType: "0+",
        allergies: "Nessuna",
        photoConsent: true,
        tripConsent: true,
        medicalTreatmentConsent: true,
        emergencyContact1Name: "Paolo Verdi",
        emergencyContact1Relation: "Padre",
        emergencyContact1Phone: "+39 335 6677889",
        memberType: "bambini",
        parentName: "Paolo Verdi",
        parentAddress: "Via Garibaldi 78, Firenze",
        parentFiscalCode: "VRDPLA75M01D612Z",
        parentPhone: "+39 335 6677889", 
        illnesses: [],
        achievements: [],
        attendance: []
      },
      {
        id: "4",
        name: "Francesco Neri",
        email: "francesco@example.com",
        role: "accompagnatore",
        unitName: "Accompagnatori",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("1985-11-30"),
        birthPlace: "Napoli",
        address: "Corso Umberto 12, Napoli",
        phone: "+39 333 9988776",
        fiscalCode: "NREFNC85S30F839Z",
        memberType: "accompagnatore",
        documentType: "Patente",
        documentNumber: "NA5544332",
        issuedBy: "MCTC Napoli",
        achievements: [],
        attendance: []
      }
    ];
    
    setMembers(mockMembers);
    filterMembers(mockMembers, activeTab, searchQuery);
  }, [activeTab]);

  const filterMembers = (members: MemberType[], tab: string, query: string) => {
    let filtered = members.filter(m => m.memberType === tab);
    
    if (query) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query.toLowerCase()) || 
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.fiscalCode?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredMembers(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterMembers(members, activeTab, query);
  };

  const handleAddMember = (newMember: Omit<MemberType, "id" | "achievements" | "attendance">) => {
    const member: MemberType = {
      ...newMember,
      id: String(members.length + 1),
      achievements: [],
      attendance: []
    };
    
    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
    filterMembers(updatedMembers, activeTab, searchQuery);
    setIsAddingMember(false);
    
    toast({
      title: "Membro adicionado",
      description: `${newMember.name} foi adicionado com sucesso.`
    });
  };

  const handleUpdateMember = (updatedMember: MemberType) => {
    const updatedMembers = members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    
    setMembers(updatedMembers);
    filterMembers(updatedMembers, activeTab, searchQuery);
    setEditingMember(null);
    setSelectedMember(updatedMember); // Update the selected member if it's currently being viewed
    
    toast({
      title: "Membro atualizado",
      description: `As informações de ${updatedMember.name} foram atualizadas.`
    });
  };

  const handleDeleteMember = (id: string) => {
    const memberToDelete = members.find(m => m.id === id);
    const updatedMembers = members.filter(member => member.id !== id);
    
    setMembers(updatedMembers);
    filterMembers(updatedMembers, activeTab, searchQuery);
    
    if (selectedMember && selectedMember.id === id) {
      setSelectedMember(null);
    }
    
    toast({
      title: "Membro removido",
      description: `${memberToDelete?.name} foi removido com sucesso.`,
      variant: "destructive"
    });
  };

  const handleSelectMember = (member: MemberType) => {
    setSelectedMember(member);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedMember(null);
  };

  const handleGeneratePDF = (member: MemberType) => {
    setSelectedMember(member);
    setShowPdfDialog(true);
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Cadastro de Membros</h1>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setIsAddingMember(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Membro
          </Button>
        </div>
      </div>
      
      {isAddingMember && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Adicionar Novo Membro</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsAddingMember(false)}>
                <span className="sr-only">Fechar</span>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MemberForm 
              onSubmit={handleAddMember} 
              onCancel={() => setIsAddingMember(false)}
              initialTab={activeTab as "bambini" | "animatori" | "accompagnatore"} 
            />
          </CardContent>
        </Card>
      )}

      {editingMember && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Editar Membro</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setEditingMember(null)}>
                <span className="sr-only">Fechar</span>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MemberForm 
              member={editingMember} 
              onSubmit={(updatedData) => handleUpdateMember({ ...editingMember, ...updatedData })} 
              onCancel={() => setEditingMember(null)}
              initialTab={editingMember.memberType as "bambini" | "animatori" | "accompagnatore"}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-${selectedMember ? '1' : '3'}`}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Membros
                </CardTitle>
                
                <div className="flex items-center">
                  <div className="relative w-full max-w-xs mr-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="bambini" onValueChange={handleTabChange} value={activeTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bambini">
                    Bambini
                    <Badge variant="secondary" className="ml-2">
                      {members.filter(m => m.memberType === 'bambini').length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="animatori">
                    Animatori
                    <Badge variant="secondary" className="ml-2">
                      {members.filter(m => m.memberType === 'animatori').length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="accompagnatore">
                    Accompagnatore
                    <Badge variant="secondary" className="ml-2">
                      {members.filter(m => m.memberType === 'accompagnatore').length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <MemberList 
                members={filteredMembers}
                onEdit={setEditingMember}
                onDelete={handleDeleteMember}
                onSelect={handleSelectMember}
                onGeneratePDF={handleGeneratePDF}
                selectedMemberId={selectedMember?.id}
              />
            </CardContent>
          </Card>
        </div>
        
        {selectedMember && (
          <div className="md:col-span-2">
            <MemberDetails 
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
              onEdit={() => setEditingMember(selectedMember)}
              onGeneratePDF={() => handleGeneratePDF(selectedMember)}
            />
          </div>
        )}
      </div>

      {showPdfDialog && selectedMember && (
        <PDFGenerator 
          member={selectedMember}
          onClose={() => setShowPdfDialog(false)}
        />
      )}
    </div>
  );
};

export default Membros;
