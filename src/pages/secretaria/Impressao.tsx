
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Printer, 
  Download, 
  FileText, 
  Users, 
  CheckSquare, 
  ClipboardList 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberType } from "@/pages/Membri";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Impressao = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedTab, setSelectedTab] = useState("fichas");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [memberType, setMemberType] = useState<string>("all");
  
  // Selections for what to include in the printed forms
  const [includePersonalInfo, setIncludePersonalInfo] = useState(true);
  const [includeHealthInfo, setIncludeHealthInfo] = useState(true);
  const [includeAuthorizations, setIncludeAuthorizations] = useState(true);
  const [includeContacts, setIncludeContacts] = useState(true);
  
  React.useEffect(() => {
    // Mock data for members
    const mockMembers: MemberType[] = [
      {
        id: "1",
        name: "Laura Rossi",
        email: "laura.rossi@example.com",
        role: "integrante",
        unitName: "Tizzoni",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2013-05-10"),
        memberType: "bambini",
        achievements: [],
        attendance: []
      },
      {
        id: "2",
        name: "Marco Bianchi",
        email: "marco@example.com",
        role: "integrante",
        unitName: "Esploratori",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2010-08-15"),
        memberType: "bambini",
        achievements: [],
        attendance: []
      },
      {
        id: "3",
        name: "Giulia Verdi",
        email: "giulia@example.com",
        role: "integrante",
        unitName: "Gemme",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("2015-01-23"),
        memberType: "bambini",
        achievements: [],
        attendance: []
      },
      {
        id: "4",
        name: "Antonio Ferrari",
        email: "antonio@example.com",
        role: "animatore",
        unitName: "Animatori",
        avatarUrl: "/placeholder.svg",
        birthDate: new Date("1997-04-12"),
        memberType: "animatori",
        achievements: [],
        attendance: []
      }
    ];
    
    setMembers(mockMembers);
  }, []);

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id));
    }
  };

  const filteredMembers = React.useMemo(() => {
    let filtered = members;
    
    if (memberType !== "all") {
      filtered = filtered.filter(m => m.memberType === memberType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [members, memberType, searchQuery]);

  const handleGeneratePDF = () => {
    setLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Documentos gerados com sucesso",
        description: `${selectedMembers.length} ${selectedMembers.length === 1 ? 'documento foi gerado' : 'documentos foram gerados'}.`
      });
    }, 1500);
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Impressão</h1>
      </div>
      
      <Tabs defaultValue="fichas" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fichas">
            <FileText className="mr-2 h-4 w-4" />
            Fichas Cadastrais
          </TabsTrigger>
          <TabsTrigger value="adesoes">
            <CheckSquare className="mr-2 h-4 w-4" />
            Adesões e Autorizações
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="fichas">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Fichas Cadastrais
                </CardTitle>
                <CardDescription>
                  Selecione os membros para gerar e imprimir as fichas cadastrais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="search">Buscar</Label>
                      <Input 
                        id="search" 
                        placeholder="Nome ou email" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="member-type">Tipo de Membro</Label>
                      <Select value={memberType} onValueChange={setMemberType}>
                        <SelectTrigger id="member-type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="bambini">Bambini</SelectItem>
                          <SelectItem value="animatori">Animatori</SelectItem>
                          <SelectItem value="accompagnatore">Accompagnatore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-4">Incluir na Ficha:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="include-personal" 
                          checked={includePersonalInfo}
                          onCheckedChange={(checked) => 
                            setIncludePersonalInfo(Boolean(checked))
                          }
                        />
                        <Label htmlFor="include-personal">Informações Pessoais</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="include-health" 
                          checked={includeHealthInfo}
                          onCheckedChange={(checked) => 
                            setIncludeHealthInfo(Boolean(checked))
                          }
                        />
                        <Label htmlFor="include-health">Informações de Saúde</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="include-authorizations" 
                          checked={includeAuthorizations}
                          onCheckedChange={(checked) => 
                            setIncludeAuthorizations(Boolean(checked))
                          }
                        />
                        <Label htmlFor="include-authorizations">Autorizações</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="include-contacts" 
                          checked={includeContacts}
                          onCheckedChange={(checked) => 
                            setIncludeContacts(Boolean(checked))
                          }
                        />
                        <Label htmlFor="include-contacts">Contatos de Emergência</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Selecionar Membros:</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSelectAll}
                      >
                        {selectedMembers.length === filteredMembers.length ? 
                          "Desmarcar Todos" : "Selecionar Todos"}
                      </Button>
                    </div>
                    
                    <Card>
                      <CardContent className="p-0">
                        {filteredMembers.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            Nenhum membro encontrado
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">
                                  <Checkbox 
                                    checked={
                                      filteredMembers.length > 0 && 
                                      selectedMembers.length === filteredMembers.length
                                    }
                                    onCheckedChange={handleSelectAll}
                                  />
                                </TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Tipo</TableHead>
                                {!isMobile && <TableHead>Unidade</TableHead>}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredMembers.map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell>
                                    <Checkbox 
                                      checked={selectedMembers.includes(member.id)}
                                      onCheckedChange={() => handleSelectMember(member.id)}
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">{member.name}</TableCell>
                                  <TableCell>{member.email}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">
                                      {member.memberType === 'bambini' ? 'Bambino' : 
                                       member.memberType === 'animatori' ? 'Animatore' : 'Accompagnatore'}
                                    </Badge>
                                  </TableCell>
                                  {!isMobile && <TableCell>{member.unitName}</TableCell>}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      {selectedMembers.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {selectedMembers.length} {selectedMembers.length === 1 ? 'membro selecionado' : 'membros selecionados'}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedMembers([]);
                          setSearchQuery("");
                          setMemberType("all");
                        }}
                      >
                        Limpar Seleção
                      </Button>
                      <Button 
                        disabled={selectedMembers.length === 0 || loading}
                        onClick={handleGeneratePDF}
                      >
                        {loading ? (
                          <>Gerando...</>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Gerar PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="adesoes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckSquare className="mr-2 h-5 w-5" />
                  Adesões e Autorizações
                </CardTitle>
                <CardDescription>
                  Gere formulários de adesão, autorizações para fotos, passeios e outros documentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 hover:border-primary cursor-pointer transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <ClipboardList className="mr-2 h-5 w-5" />
                          Formulário de Adesão
                        </CardTitle>
                        <CardDescription>
                          Documento oficial para novos membros
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Formulário completo para inscrição de novos membros com campos para 
                          dados pessoais e autorizações.
                        </p>
                        <Button variant="outline" className="w-full" onClick={handleGeneratePDF}>
                          <Download className="mr-2 h-4 w-4" />
                          Gerar Modelo
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-primary cursor-pointer transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <CheckSquare className="mr-2 h-5 w-5" />
                          Autorização para Fotos
                        </CardTitle>
                        <CardDescription>
                          Consentimento para uso de imagem
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Formulário de autorização para uso de imagem e vídeo dos membros
                          em materiais promocionais e redes sociais.
                        </p>
                        <Button variant="outline" className="w-full" onClick={handleGeneratePDF}>
                          <Download className="mr-2 h-4 w-4" />
                          Gerar Modelo
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-primary cursor-pointer transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <CheckSquare className="mr-2 h-5 w-5" />
                          Autorização para Passeios
                        </CardTitle>
                        <CardDescription>
                          Consentimento para atividades externas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Formulário de autorização para participação em passeios, 
                          acampamentos e atividades fora da sede do clube.
                        </p>
                        <Button variant="outline" className="w-full" onClick={handleGeneratePDF}>
                          <Download className="mr-2 h-4 w-4" />
                          Gerar Modelo
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-primary cursor-pointer transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <CheckSquare className="mr-2 h-5 w-5" />
                          Autorização Médica
                        </CardTitle>
                        <CardDescription>
                          Consentimento para assistência médica
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Formulário de autorização para assistência médica em caso de 
                          emergência durante atividades do clube.
                        </p>
                        <Button variant="outline" className="w-full" onClick={handleGeneratePDF}>
                          <Download className="mr-2 h-4 w-4" />
                          Gerar Modelo
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Precisa de um formulário personalizado?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Você pode criar um formulário personalizado com os campos que precisar.
                      Entre em contato com a administração para solicitar.
                    </p>
                    <Button variant="secondary">
                      Solicitar Formulário Personalizado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Impressao;
