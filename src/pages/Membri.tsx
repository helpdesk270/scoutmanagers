
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
  X
} from "lucide-react";
import MemberForm from "@/components/members/MemberForm";
import MemberAchievements from "@/components/members/MemberAchievements";
import MemberAttendance from "@/components/members/MemberAttendance";

// Mock data structure for members
export interface MemberType extends User {
  achievements: Achievement[];
  attendance: AttendanceRecord[];
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
  const [members, setMembers] = useState<MemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberType | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "achievements" | "attendance">("list");
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

  // Initialize with mock data
  React.useEffect(() => {
    // In a real app, this would fetch from an API
    const mockMembers: MemberType[] = [
      {
        id: "1",
        name: "Laura Rossi",
        email: "laura.rossi@example.com",
        role: "integrante",
        unitName: "Tizzoni",
        avatarUrl: "/placeholder.svg",
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
        unitName: "Tizzoni", 
        avatarUrl: "/placeholder.svg",
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
        unitName: "Tizzoni",
        avatarUrl: "/placeholder.svg",
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

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = members.filter(member => 
      member.name.toLowerCase().includes(query.toLowerCase()) || 
      member.email.toLowerCase().includes(query.toLowerCase()) ||
      member.unitName?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  // Add new member
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

  // Update member
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

  // Delete member
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

  // Add achievement to member
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
    
    // Update selected member if we're viewing their achievements
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

  // Add attendance record to member
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
    
    // Update selected member if we're viewing their attendance
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

  // Handle view member details
  const handleViewMember = (mode: "achievements" | "attendance", member: MemberType) => {
    setSelectedMember(member);
    setViewMode(mode);
  };

  // Go back to list view
  const handleBackToList = () => {
    setViewMode("list");
    setSelectedMember(null);
  };

  // Render appropriate content based on view mode
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
          // Instead of implicitly returning void, we immediately return to list view
          return handleBackToList(), <></>;  // Return empty fragment after function call
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
          // Instead of implicitly returning void, we immediately return to list view
          return handleBackToList(), <></>;  // Return empty fragment after function call
        }
      
      case "list":
      default:
        return (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca membri..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
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
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Unità</TableHead>
                        <TableHead>Ruolo</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Conquiste</TableHead>
                        <TableHead>Presenze</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
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
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
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
