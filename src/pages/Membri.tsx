
import React, { useState } from "react";
import { useAuth, User, UserRole } from "@/context/AuthContext";
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
  Phone
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

export interface MemberType extends User {
  achievements: Achievement[];
  attendance: AttendanceRecord[];
  
  // Personal data
  birthDate?: Date;
  address?: string;
  phone?: string;
  fiscalCode?: string;
  
  // Health information
  bloodType?: string;
  allergies?: string;
  medications?: string;
  healthNotes?: string;
  
  // Authorizations
  photoConsent?: boolean;
  tripConsent?: boolean;
  medicalTreatmentConsent?: boolean;
  
  // Emergency contacts
  emergencyContact1Name?: string;
  emergencyContact1Relation?: string;
  emergencyContact1Phone?: string;
  emergencyContact2Name?: string;
  emergencyContact2Relation?: string;
  emergencyContact2Phone?: string;
}

export interface Achievement {
  id: string;
  name: string;
  date: string;
  description: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  activity: string;
  present: boolean;
}

const Membri = () => {
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
        ]
      },
      {
        id: "2",
        name: "Marco Bianchi",
        email: "marco@example.com",
        role: "integrante",
        unitName: "Esploratori", 
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2010-08-15"),
        address: "Via Garibaldi 45, Roma",
        phone: "+39 333 9876543",
        fiscalCode: "BNCMRC10M15H501Y",
        bloodType: "0+",
        allergies: "Nessuna",
        photoConsent: true,
        tripConsent: true,
        medicalTreatmentConsent: true,
        emergencyContact1Name: "Paolo Bianchi",
        emergencyContact1Relation: "Padre",
        emergencyContact1Phone: "+39 335 1122334",
        achievements: [],
        attendance: [
          {
            id: "3",
            date: "2023-06-10",
            activity: "Riunione settimanale",
            present: true
          }
        ]
      },
      {
        id: "3",
        name: "Giulia Verdi",
        email: "giulia@example.com",
        role: "integrante",
        unitName: "Gemme",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2015-01-23"),
        address: "Via Dante 78, Firenze",
        phone: "+39 333 7654321",
        fiscalCode: "VRDGLI15A63D612Z",
        bloodType: "AB-",
        allergies: "Lattosio, frutta secca",
        medications: "Nessuna",
        healthNotes: "Intolleranza al lattosio",
        photoConsent: false,
        tripConsent: true,
        medicalTreatmentConsent: true,
        emergencyContact1Name: "Anna Verdi",
        emergencyContact1Relation: "Madre",
        emergencyContact1Phone: "+39 335 5544332",
        achievements: [
          { 
            id: "2", 
            name: "Primo Soccorso", 
            date: "2023-04-20",
            description: "Corso base di primo soccorso"
          }
        ],
        attendance: []
      }
    ];
    
    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, filterUnit);
  };

  const handleFilterUnit = (unit: string | null) => {
    setFilterUnit(unit);
    applyFilters(searchQuery, unit);
  };

  const applyFilters = (query: string, unit: string | null) => {
    let filtered = members;
    
    // Apply search query filter
    if (query) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(query.toLowerCase()) || 
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.fiscalCode?.toLowerCase().includes(query.toLowerCase()) ||
        member.unitName?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply unit filter
    if (unit) {
      filtered = filtered.filter(member => member.unitName === unit);
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
      id: String(Date.now())
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
      id: String(Date.now())
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
    
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleBackToList}>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
              <CardTitle>{selectedMember.name}</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingMember(selectedMember)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifica
            </Button>
          </div>
          <CardDescription>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{selectedMember.unitName}</Badge>
              <Badge variant="outline" className="capitalize">{selectedMember.role}</Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Dati Personali</TabsTrigger>
              <TabsTrigger value="health">Salute</TabsTrigger>
              <TabsTrigger value="authorizations">Autorizzazioni</TabsTrigger>
              <TabsTrigger value="emergency">Contatti</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email:</p>
                  <p className="text-sm">{selectedMember.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Telefono:</p>
                  <p className="text-sm">{selectedMember.phone || "-"}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Indirizzo:</p>
                <p className="text-sm">{selectedMember.address || "-"}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data di nascita:</p>
                  <p className="text-sm">
                    {selectedMember.birthDate 
                      ? new Date(selectedMember.birthDate).toLocaleDateString('it-IT', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })
                      : "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Codice Fiscale:</p>
                  <p className="text-sm">{selectedMember.fiscalCode || "-"}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Gruppo Sanguigno:</p>
                  <p className="text-sm">{selectedMember.bloodType || "-"}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Allergie:</p>
                  <p className="text-sm whitespace-pre-wrap">{selectedMember.allergies || "Nessuna allergia registrata"}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Farmaci:</p>
                <p className="text-sm whitespace-pre-wrap">{selectedMember.medications || "Nessun farmaco registrato"}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Note Mediche:</p>
                <p className="text-sm whitespace-pre-wrap">{selectedMember.healthNotes || "Nessuna nota medica"}</p>
              </div>
              
              {(!selectedMember.bloodType && !selectedMember.allergies && 
                !selectedMember.medications && !selectedMember.healthNotes) && (
                <div className="flex items-center justify-center p-4 text-muted-foreground">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <p>Nessuna informazione medica registrata</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="authorizations" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Consenso Fotografico</p>
                      <p className="text-sm text-muted-foreground">
                        Uso di foto e video in cui appare il membro
                      </p>
                    </div>
                    <Badge variant={selectedMember.photoConsent ? "default" : "destructive"}>
                      {selectedMember.photoConsent ? "Concesso" : "Non concesso"}
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
                    <Badge variant={selectedMember.tripConsent ? "default" : "destructive"}>
                      {selectedMember.tripConsent ? "Concesso" : "Non concesso"}
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
                    <Badge variant={selectedMember.medicalTreatmentConsent ? "default" : "destructive"}>
                      {selectedMember.medicalTreatmentConsent ? "Concesso" : "Non concesso"}
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="emergency" className="space-y-4">
              {(selectedMember.emergencyContact1Name || selectedMember.emergencyContact1Phone) && (
                <div className="border rounded-md p-4">
                  <p className="text-sm font-semibold mb-2">Contatto Principale</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Nome</p>
                      <p className="text-sm">{selectedMember.emergencyContact1Name || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Relazione</p>
                      <p className="text-sm">{selectedMember.emergencyContact1Relation || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Telefono</p>
                      <div className="flex items-center">
                        <p className="text-sm">{selectedMember.emergencyContact1Phone || "-"}</p>
                        {selectedMember.emergencyContact1Phone && (
                          <a 
                            href={`tel:${selectedMember.emergencyContact1Phone}`} 
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
              
              {(selectedMember.emergencyContact2Name || selectedMember.emergencyContact2Phone) && (
                <div className="border rounded-md p-4">
                  <p className="text-sm font-semibold mb-2">Contatto Secondario</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Nome</p>
                      <p className="text-sm">{selectedMember.emergencyContact2Name || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Relazione</p>
                      <p className="text-sm">{selectedMember.emergencyContact2Relation || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Telefono</p>
                      <div className="flex items-center">
                        <p className="text-sm">{selectedMember.emergencyContact2Phone || "-"}</p>
                        {selectedMember.emergencyContact2Phone && (
                          <a 
                            href={`tel:${selectedMember.emergencyContact2Phone}`} 
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
              
              {(!selectedMember.emergencyContact1Name && !selectedMember.emergencyContact1Phone &&
                !selectedMember.emergencyContact2Name && !selectedMember.emergencyContact2Phone) && (
                <div className="flex items-center justify-center p-4 text-muted-foreground">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <p>Nessun contatto di emergenza registrato</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleViewMember("achievements", selectedMember)}
            >
              <Award className="mr-2 h-4 w-4" />
              Conquiste ({selectedMember.achievements.length})
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleViewMember("attendance", selectedMember)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Presenze ({selectedMember.attendance.length})
            </Button>
          </div>
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
                  Sei sicuro di voler eliminare {selectedMember.name}? Questa azione non può essere annullata.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Annulla</Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    handleDeleteMember(selectedMember.id);
                    handleBackToList();
                  }}
                >
                  Elimina
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );
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
              <div className="w-full space-y-2 sm:w-64">
                <div className="relative w-full">
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
                </div>
              </div>
              <Button onClick={() => setIsAddingMember(true)} className="mt-2 sm:mt-0">
                <UserPlus className="mr-2 h-4 w-4" />
                Aggiungi Membro
              </Button>
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
                  <MemberForm onSubmit={handleAddMember} onCancel={() => setIsAddingMember(false)} />
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
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Elenco Membri
                </CardTitle>
                <CardDescription>
                  {filteredMembers.length} membri {searchQuery && `che corrispondono a "${searchQuery}"`}
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
                                <span className="text-muted-foreground">Ruolo:</span> <span className="capitalize">{member.role}</span>
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
                          <TableHead>Ruolo</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Info</TableHead>
                          <TableHead>Conquiste</TableHead>
                          <TableHead>Presenze</TableHead>
                          <TableHead className="text-right">Azioni</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                              Nessun membro trovato
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.unitName || "-"}</TableCell>
                              <TableCell className="capitalize">{member.role}</TableCell>
                              <TableCell>{member.email}</TableCell>
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
                              <TableCell className="text-right space-x-1">
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
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Gestione Membri</h1>
      {renderContent()}
    </div>
  );
};

export default Membri;
