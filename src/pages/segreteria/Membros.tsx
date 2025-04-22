import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell 
} from "@/components/ui/table";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Award,
  Calendar,
  Search,
  Plus,
  X,
  MoreVertical,
  ChevronRight,
  FileText,
  AlertCircle,
  Phone,
  Printer
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import MemberForm from "@/components/members/MemberForm";
import MemberAchievements from "@/components/members/MemberAchievements";
import MemberAttendance from "@/components/members/MemberAttendance";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberType, Achievement, AttendanceRecord } from "@/types/member"; 
import MemberDetails from "@/components/secretaria/MemberDetails";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFGenerator from "@/components/secretaria/PDFGenerator";

const Membros = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [members, setMembers] = useState<MemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberType | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "achievements" | "attendance" | "details">("list");
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [filterUnit, setFilterUnit] = useState<string | null>(null);
  const [filterMemberType, setFilterMemberType] = useState<"bambini" | "animatori" | "accompagnatore" | null>(null);
  const [activeTab, setActiveTab] = useState<"bambini" | "animatori" | "accompagnatore">("bambini");

  useEffect(() => {
    const mockMembers: MemberType[] = [
      {
        id: "1",
        name: "Laura Rossi",
        email: "laura.rossi@example.com",
        role: "integrante",
        unitName: "Tizzoni",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2013-05-10"),
        birthPlace: "Milano",
        address: "Via Roma 123, Milano",
        phone: "+39 333 1234567",
        fiscalCode: "RSSLRA13E50F205Z",
        bloodType: "A+",
        allergies: "Polline, fragole",
        medications: "Antistaminico al bisogno",
        healthNotes: "Asma lieve, porta con sé inalatore",
        followsMedicalTreatment: true,
        illnesses: {
          rosolia: true,
          varicella: true,
          angina: false,
          febbreReumatica: false,
          scarlattina: false,
          pertosse: false,
          otite: true,
          morbillo: false,
          parotite: false
        },
        allergyDetails: "In caso di reazione allergica, somministrare antistaminico come prescritto dal medico",
        healthDifficulties: "Ha avuto bronchite nel 2020, nessuna complicazione",
        parentRecommendations: "Tende a stancarsi facilmente, necessita di pause regolari",
        photoConsent: true,
        aisaPhotoConsent: true,
        tripConsent: true,
        medicalTreatmentConsent: true,
        dataProcessingConsent: true,
        parentName: "Marco Rossi",
        parentAddress: "Via Roma 123, Milano",
        parentFiscalCode: "RSSMRC70A01F205Z",
        parentPhone: "+39 335 9876543",
        emergencyContact1Name: "Marco Rossi",
        emergencyContact1Relation: "Padre",
        emergencyContact1Phone: "+39 335 9876543",
        emergencyContact2Name: "Giulia Bianchi",
        emergencyContact2Relation: "Madre",
        emergencyContact2Phone: "+39 339 8765432",
        achievements: [
          { 
            id: "1", 
            name: "Specializzazione Natura", 
            date: "2023-05-15",
            description: "Completamento del corso sulla natura e ambiente"
          }
        ],
        attendance: [
          {
            id: "1",
            date: "2023-06-10",
            activity: "Riunione settimanale",
            present: true
          },
          {
            id: "2",
            date: "2023-06-17",
            activity: "Riunione settimanale",
            present: false
          }
        ],
        memberType: "bambini"
      },
      {
        id: "2",
        name: "Marco Bianchi",
        email: "marco@example.com",
        role: "animatore",
        unitName: "Animatori", 
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("1995-08-15"),
        birthPlace: "Roma",
        address: "Via Garibaldi 45, Roma",
        phone: "+39 333 9876543",
        fiscalCode: "BNCMRC95M15H501Y",
        bloodType: "0+",
        allergies: "Nessuna",
        photoConsent: true,
        tripConsent: true,
        medicalTreatmentConsent: true,
        dataProcessingConsent: true,
        documentType: "cartaIdentita",
        documentNumber: "AX123456",
        issuedBy: "Comune di Roma",
        achievements: [],
        attendance: [
          {
            id: "3",
            date: "2023-06-10",
            activity: "Riunione settimanale",
            present: true
          }
        ],
        memberType: "animatori"
      },
      {
        id: "3",
        name: "Giulia Verdi",
        email: "giulia@example.com",
        role: "integrante",
        unitName: "Gemme",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2015-01-23"),
        birthPlace: "Firenze",
        address: "Via Dante 78, Firenze",
        phone: "+39 333 7654321",
        fiscalCode: "VRDGLI15A63D612Z",
        bloodType: "AB-",
        allergies: "Lattosio, frutta secca",
        medications: "Nessuna",
        healthNotes: "Intolleranza al lattosio",
        followsMedicalTreatment: false,
        illnesses: {
          rosolia: false,
          varicella: true,
          angina: false,
          febbreReumatica: false,
          scarlattina: false,
          pertosse: false,
          otite: false,
          morbillo: true,
          parotite: false
        },
        photoConsent: false,
        aisaPhotoConsent: false,
        tripConsent: true,
        medicalTreatmentConsent: true,
        dataProcessingConsent: true,
        parentName: "Anna Verdi",
        parentAddress: "Via Dante 78, Firenze",
        parentFiscalCode: "VRDNNA75A63D612Z",
        parentPhone: "+39 335 5544332",
        achievements: [
          { 
            id: "2", 
            name: "Primo Soccorso", 
            date: "2023-04-20",
            description: "Corso base di primo soccorso"
          }
        ],
        attendance: [],
        memberType: "bambini"
      },
      {
        id: "4",
        name: "Paolo Marrone",
        email: "paolo@example.com",
        role: "accompagnatore",
        unitName: "Accompagnatori",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("1980-03-12"),
        birthPlace: "Napoli",
        address: "Via Mergellina 45, Napoli",
        phone: "+39 333 1122334",
        fiscalCode: "MRRPLA80C12F839Z",
        documentType: "patente",
        documentNumber: "NA1234567X",
        issuedBy: "MCTC-NA",
        dataProcessingConsent: true,
        achievements: [],
        attendance: [],
        memberType: "accompagnatore"
      }
    ];
    
    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  useEffect(() => {
    applyFilters(searchQuery, filterUnit, filterMemberType);
  }, [filterMemberType]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filterUnit, filterMemberType);
  };

  const handleFilterUnit = (unit: string | null) => {
    setFilterUnit(unit);
    applyFilters(searchQuery, unit, filterMemberType);
  };

  const handleFilterMemberType = (type: "bambini" | "animatori" | "accompagnatore" | null) => {
    setFilterMemberType(type);
    setActiveTab(type || "bambini");
  };

  const applyFilters = (query: string, unit: string | null, memberType: "bambini" | "animatori" | "accompagnatore" | null) => {
    let filtered = members;
    
    if (query) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query.toLowerCase()) || 
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.fiscalCode?.toLowerCase().includes(query.toLowerCase()) ||
        member.unitName?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (unit) {
      filtered = filtered.filter(member => member.unitName === unit);
    }
    
    if (memberType) {
      filtered = filtered.filter(member => member.memberType === memberType);
    }
    
    setFilteredMembers(filtered);
  };

  const handleAddMember = (newMember: Omit<MemberType, "id" | "achievements" | "attendance">) => {
    const member: MemberType = {
      ...newMember,
      id: String(members.length + 1),
      achievements: [],
      attendance: []
    };
    
    setMembers([...members, member]);
    setFilteredMembers([...members, member]);
    setIsAddingMember(false);
    
    toast({
      title: "Membro aggiunto",
      description: `${newMember.name} è stato aggiunto con successo.`
    });
  };

  const handleUpdateMember = (updatedMember: MemberType) => {
    const updatedMembers = members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
    setEditingMember(null);
    
    toast({
      title: "Membro aggiornato",
      description: `Le informazioni di ${updatedMember.name} sono state aggiornate.`
    });
  };

  const handleDeleteMember = (id: string) => {
    const memberToDelete = members.find(m => m.id === id);
    const updatedMembers = members.filter(member => member.id !== id);
    
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
    
    toast({
      title: "Membro rimosso",
      description: `${memberToDelete?.name} è stato rimosso con successo.`,
      variant: "destructive"
    });
  };

  const handleAddAchievement = (memberId: string, achievement: Omit<Achievement, "id">) => {
    const newAchievement: Achievement = {
      ...achievement,
      id: String(Date.now()),
      name: achievement.name || "",
      date: achievement.date || "",
      description: achievement.description || ""
    };
    
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          achievements: [...member.achievements, newAchievement]
        };
      }
      return member;
    });
    
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
    
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember({
        ...selectedMember,
        achievements: [...selectedMember.achievements, newAchievement]
      });
    }
    
    toast({
      title: "Conquista aggiunta",
      description: `La conquista è stata aggiunta con successo.`
    });
  };

  const handleAddAttendance = (memberId: string, record: Omit<AttendanceRecord, "id">) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: String(Date.now()),
      date: record.date || "",
      activity: record.activity || "",
      present: record.present || false
    };
    
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          attendance: [...member.attendance, newRecord]
        };
      }
      return member;
    });
    
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
    
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember({
        ...selectedMember,
        attendance: [...selectedMember.attendance, newRecord]
      });
    }
    
    toast({
      title: "Presenza registrata",
      description: `La presenza è stata registrata con successo.`
    });
  };

  const handleViewMember = (mode: "achievements" | "attendance" | "details", member: MemberType) => {
    setSelectedMember(member);
    setViewMode(mode);
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedMember(null);
  };

  const renderMemberDetails = () => {
    if (!selectedMember) return null;
    
    return <MemberDetails member={selectedMember} onBack={handleBackToList} onEdit={() => setEditingMember(selectedMember)} />;
  };

  const renderContent = () => {
    switch (viewMode) {
      case "achievements":
        if (selectedMember) {
          return (
            <MemberAchievements 
              member={selectedMember} 
              onAddAchievement={(achievement) => handleAddAchievement(selectedMember.id, achievement)}
              onBack={handleBackToList}
            />
          );
        } else {
          return handleBackToList(), <></>;
        }
      
      case "attendance":
        if (selectedMember) {
          return (
            <MemberAttendance 
              member={selectedMember} 
              onAddAttendance={(record) => handleAddAttendance(selectedMember.id, record)}
              onBack={handleBackToList}
            />
          );
        } else {
          return handleBackToList(), <></>;
        }
      
      case "details":
        return renderMemberDetails();
      
      case "list":
      default:
        return (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="w-full space-y-4">
                <Tabs defaultValue={activeTab} onValueChange={(value) => handleFilterMemberType(value as any)} className="w-full">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="bambini">Bambini</TabsTrigger>
                    <TabsTrigger value="animatori">Animatori</TabsTrigger>
                    <TabsTrigger value="accompagnatore">Accompagnatore</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cerca membri..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={filterUnit === null ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterUnit(null)}
                    >
                      Tutti
                    </Badge>
                    <Badge 
                      variant={filterUnit === "Gemme" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterUnit("Gemme")}
                    >
                      Gemme
                    </Badge>
                    <Badge 
                      variant={filterUnit === "Tizzoni" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterUnit("Tizzoni")}
                    >
                      Tizzoni
                    </Badge>
                    <Badge 
                      variant={filterUnit === "Esploratori" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFilterUnit("Esploratori")}
                    >
                      Esploratori
                    </Badge>
                    {activeTab === "animatori" && (
                      <Badge 
                        variant={filterUnit === "Animatori" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleFilterUnit("Animatori")}
                      >
                        Animatori
                      </Badge>
                    )}
                    {activeTab === "accompagnatore" && (
                      <Badge 
                        variant={filterUnit === "Accompagnatori" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleFilterUnit("Accompagnatori")}
                      >
                        Accompagnatori
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setIsAddingMember(true)} className="mt-2 sm:mt-0">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Aggiungi Membro
                </Button>
                
                {filteredMembers.length > 0 && (
                  <PDFDownloadLink 
                    document={<PDFGenerator members={filteredMembers} />} 
                    fileName={`membri-${Date.now()}.pdf`}
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-2 sm:mt-0"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Stampa
                  </PDFDownloadLink>
                )}
              </div>
            </div>

            {isAddingMember && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Aggiungi Nuovo Membro</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsAddingMember(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <MemberForm 
                    onSubmit={handleAddMember} 
                    onCancel={() => setIsAddingMember(false)} 
                    initialTab={activeTab}
                  />
                </CardContent>
              </Card>
            )}

            {editingMember && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Modifica Membro</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setEditingMember(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <MemberForm 
                    member={editingMember} 
                    onSubmit={(updatedData) => handleUpdateMember({ ...editingMember, ...updatedData })} 
                    onCancel={() => setEditingMember(null)} 
                    initialTab={editingMember.memberType}
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Elenco {activeTab === "bambini" ? "Bambini" : activeTab === "animatori" ? "Animatori" : "Accompagnatori"}
                </CardTitle>
                <CardDescription>
                  {filteredMembers.length} {activeTab === "bambini" ? "bambini" : activeTab === "animatori" ? "animatori" : "accompagnatori"} {searchQuery && `che corrispondono a "${searchQuery}"`}
                  {filterUnit && ` nell'unità "${filterUnit}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isMobile ? (
                  <div className="space-y-4">
                    {filteredMembers.length === 0 ? (
                      <div className="text-center py-4">
                        Nessun membro trovato
                      </div>
                    ) : (
                      filteredMembers.map((member) => (
                        <Card key={member.id} className="overflow-hidden">
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-base">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                              <div className="flex">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setEditingMember(member)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4 text-destructive" />
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
                                        onClick={() => handleDeleteMember(member.id)}
                                      >
                                        Elimina
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Unità:</span> {member.unitName || "-"}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Tipo:</span> <span className="capitalize">{member.memberType}</span>
                              </div>
                            </div>
                            
                            <div className="flex mt-3 pt-3 border-t justify-between">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => handleViewMember("details", member)}
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                Dettagli
                              </Button>
                              <div className="flex gap-1">
                                <PDFDownloadLink 
                                  document={<PDFGenerator members={[member]} />} 
                                  fileName={`${member.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`}
                                  className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                  <Printer className="mr-1 h-3 w-3" />
                                  PDF
                                </PDFDownloadLink>
                                {member.memberType === "bambini" && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-xs h-8"
                                      onClick={() => handleViewMember("achievements", member)}
                                    >
                                      <Award className="mr-1 h-3 w-3" />
                                      {member.achievements.length}
                                    </Button>
                                    
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-xs h-8"
                                      onClick={() => handleViewMember("attendance", member)}
                                    >
                                      <Calendar className="mr-1 h-3 w-3" />
                                      {member.attendance.length}
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Unità</TableHead>
                          {activeTab === "bambini" ? (
                            <>
                              <TableHead>Data di nascita</TableHead>
                              <TableHead>Genitore</TableHead>
                              <TableHead>Contatto</TableHead>
                            </>
                          ) : (
                            <>
                              <TableHead>Documento</TableHead>
                              <TableHead>Telefono</TableHead>
                              <TableHead>Email</TableHead>
                            </>
                          )}
                          <TableHead>Info</TableHead>
                          {activeTab === "bambini" && (
                            <>
                              <TableHead>Conquiste</TableHead>
                              <TableHead>Presenze</TableHead>
                            </>
                          )}
                          <TableHead className="text-right">Azioni</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={activeTab === "bambini" ? 9 : 7} className="text-center py-4">
                              Nessun membro trovato
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.unitName || "-"}</TableCell>
                              
                              {activeTab === "bambini" ? (
                                <>
                                  <TableCell>
                                    {member.birthDate 
                                      ? new Date(member.birthDate).toLocaleDateString('it-IT')
                                      : "-"}
                                  </TableCell>
                                  <TableCell>{member.parentName || "-"}</TableCell>
                                  <TableCell>{member.parentPhone || "-"}</TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell>
                                    {member.documentType 
                                      ? `${member.documentType === "cartaIdentita" 
                                          ? "Carta d'identità" 
                                          : member.documentType === "patente" 
                                            ? "Patente" 
                                            : "Passaporto"} ${member.documentNumber || ""}`
                                      : "-"}
                                  </TableCell>
                                  <TableCell>{member.phone || "-"}</TableCell>
                                  <TableCell>{member.email}</TableCell>
                                </>
                              )}
                              
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewMember("details", member)}
                                >
                                  <FileText className="mr-1 h-4 w-4" />
                                  Dettagli
                                </Button>
                              </TableCell>
                              
                              {activeTab === "bambini" && (
                                <>
                                  <TableCell>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleViewMember("achievements", member)}
                                    >
                                      <Award className="mr-1 h-4 w-4" />
                                      {member.achievements.length}
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleViewMember("attendance", member)}
                                    >
                                      <Calendar className="mr-1 h-4 w-4" />
                                      {member.attendance.length}
                                    </Button>
                                  </TableCell>
                                </>
                              )}
                              
                              <TableCell className="text-right space-x-1">
                                <PDFDownloadLink 
                                  document={<PDFGenerator members={[member]} />} 
                                  fileName={`${member.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`}
                                  className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium bg-transparent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                  <Printer className="h-4 w-4" />
                                </PDFDownloadLink>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setEditingMember(member)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4 text-destructive" />
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
                                        onClick={() => handleDeleteMember(member.id)}
                                      >
                                        Elimina
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Registrazione Membri</h1>
      {renderContent()}
    </div>
  );
};

export default Membros;
