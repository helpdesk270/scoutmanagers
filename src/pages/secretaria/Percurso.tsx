
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookCheck, Plus, Search, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PercursoItem {
  id: string;
  name: string;
  description: string;
  category: string;
  formacao: "gemma" | "tizzoni" | "esploratori" | "animatori";
}

interface ChecklistItem {
  id: string;
  description: string;
  percursoId: string;
}

const Percurso = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState<string>("gemma");
  const [percursoItems, setPercursoItems] = React.useState<PercursoItem[]>([]);
  const [checklistItems, setChecklistItems] = React.useState<ChecklistItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<PercursoItem[]>([]);
  const [selectedPercurso, setSelectedPercurso] = React.useState<PercursoItem | null>(null);
  
  // Form state
  const [isAddingPercurso, setIsAddingPercurso] = React.useState(false);
  const [isAddingChecklist, setIsAddingChecklist] = React.useState(false);
  const [formName, setFormName] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formCategory, setFormCategory] = React.useState("");
  const [formChecklistItem, setFormChecklistItem] = React.useState("");

  React.useEffect(() => {
    // Mock data for percurso items
    const mockPercursoItems: PercursoItem[] = [
      {
        id: "1",
        name: "Amizade",
        description: "Desenvolver habilidades de amizade e trabalho em equipe",
        category: "Desenvolvimento Social",
        formacao: "gemma"
      },
      {
        id: "2",
        name: "Explorador da Natureza",
        description: "Aprender sobre a natureza e meio ambiente",
        category: "Meio Ambiente",
        formacao: "tizzoni"
      },
      {
        id: "3",
        name: "Orientação",
        description: "Aprender a se orientar com bússola e mapas",
        category: "Habilidades Técnicas",
        formacao: "esploratori"
      },
      {
        id: "4",
        name: "Liderança de Grupo",
        description: "Desenvolver habilidades de liderança e gestão de equipe",
        category: "Liderança",
        formacao: "animatori"
      }
    ];
    
    // Mock data for checklist items
    const mockChecklistItems: ChecklistItem[] = [
      {
        id: "1",
        description: "Fazer 3 novos amigos no grupo",
        percursoId: "1"
      },
      {
        id: "2",
        description: "Participar de 5 atividades em grupo",
        percursoId: "1"
      },
      {
        id: "3",
        description: "Identificar 10 espécies de plantas",
        percursoId: "2"
      },
      {
        id: "4",
        description: "Aprender a usar uma bússola",
        percursoId: "3"
      },
      {
        id: "5",
        description: "Conduzir uma reunião de planejamento",
        percursoId: "4"
      }
    ];
    
    setPercursoItems(mockPercursoItems);
    setChecklistItems(mockChecklistItems);
    filterItems(mockPercursoItems, activeTab, searchQuery);
  }, []);

  const filterItems = (items: PercursoItem[], tab: string, query: string) => {
    let filtered = items.filter(item => item.formacao === tab);
    
    if (query) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterItems(percursoItems, activeTab, query);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterItems(percursoItems, value, searchQuery);
    setSelectedPercurso(null);
  };

  const handleAddPercurso = () => {
    const newPercurso: PercursoItem = {
      id: `${percursoItems.length + 1}`,
      name: formName,
      description: formDescription,
      category: formCategory,
      formacao: activeTab as "gemma" | "tizzoni" | "esploratori" | "animatori"
    };
    
    const updatedItems = [...percursoItems, newPercurso];
    setPercursoItems(updatedItems);
    filterItems(updatedItems, activeTab, searchQuery);
    
    // Reset form
    setFormName("");
    setFormDescription("");
    setFormCategory("");
    setIsAddingPercurso(false);
    
    toast({
      title: "Percurso adicionado",
      description: `${newPercurso.name} foi adicionado com sucesso.`
    });
  };

  const handleAddChecklistItem = () => {
    if (!selectedPercurso) return;
    
    const newItem: ChecklistItem = {
      id: `${checklistItems.length + 1}`,
      description: formChecklistItem,
      percursoId: selectedPercurso.id
    };
    
    setChecklistItems([...checklistItems, newItem]);
    setFormChecklistItem("");
    setIsAddingChecklist(false);
    
    toast({
      title: "Item adicionado",
      description: "Item adicionado à checklist com sucesso."
    });
  };

  const handleDeletePercurso = (id: string) => {
    const updatedItems = percursoItems.filter(item => item.id !== id);
    setPercursoItems(updatedItems);
    filterItems(updatedItems, activeTab, searchQuery);
    
    // Also delete related checklist items
    const updatedChecklist = checklistItems.filter(item => item.percursoId !== id);
    setChecklistItems(updatedChecklist);
    
    if (selectedPercurso && selectedPercurso.id === id) {
      setSelectedPercurso(null);
    }
    
    toast({
      title: "Percurso removido",
      description: "Percurso removido com sucesso.",
      variant: "destructive"
    });
  };

  const handleDeleteChecklistItem = (id: string) => {
    const updatedItems = checklistItems.filter(item => item.id !== id);
    setChecklistItems(updatedItems);
    
    toast({
      title: "Item removido",
      description: "Item removido da checklist com sucesso.",
      variant: "destructive"
    });
  };

  const getChecklistForPercurso = (percursoId: string) => {
    return checklistItems.filter(item => item.percursoId === percursoId);
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Cadastro de Percurso</h1>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setIsAddingPercurso(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Percurso
          </Button>
        </div>
      </div>

      {isAddingPercurso && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adicionar Novo Percurso</CardTitle>
            <CardDescription>Preencha os dados para adicionar um novo percurso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                    placeholder="Nome do percurso"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input 
                    id="category" 
                    value={formCategory} 
                    onChange={(e) => setFormCategory(e.target.value)} 
                    placeholder="Categoria"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={formDescription} 
                  onChange={(e) => setFormDescription(e.target.value)} 
                  placeholder="Descrição do percurso"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formacao">Formação</Label>
                <Select 
                  value={activeTab} 
                  onValueChange={handleTabChange}
                  disabled
                >
                  <SelectTrigger id="formacao">
                    <SelectValue placeholder="Selecione a formação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemma">Gemma</SelectItem>
                    <SelectItem value="tizzoni">Tizzoni</SelectItem>
                    <SelectItem value="esploratori">Esploratori</SelectItem>
                    <SelectItem value="animatori">Animatori</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardContent className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddingPercurso(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPercurso}>
              Adicionar
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-${selectedPercurso ? '1' : '3'}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookCheck className="mr-2 h-5 w-5" />
                Percurso
              </CardTitle>
              <div className="flex items-center mt-2">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar percurso..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="gemma" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-4 mt-2">
                  <TabsTrigger value="gemma">Gemma</TabsTrigger>
                  <TabsTrigger value="tizzoni">Tizzoni</TabsTrigger>
                  <TabsTrigger value="esploratori">Esploratori</TabsTrigger>
                  <TabsTrigger value="animatori">Animatori</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum percurso encontrado
                </div>
              ) : (
                <div className="space-y-4">
                  {isMobile ? (
                    <div className="space-y-4">
                      {filteredItems.map((item) => (
                        <Card
                          key={item.id}
                          className="p-4 cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedPercurso(item)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                              <p className="text-sm mt-2">{item.description}</p>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <X className="h-4 w-4 text-destructive" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirmar exclusão</DialogTitle>
                                  <DialogDescription>
                                    Tem certeza que deseja excluir este percurso? Esta ação também removerá todos os itens da checklist associados.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancelar</Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleDeletePercurso(item.id)}
                                  >
                                    Excluir
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              {getChecklistForPercurso(item.id).length} itens na checklist
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPercurso(item);
                              }}
                            >
                              Ver Detalhes
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Checklist</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow 
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => setSelectedPercurso(item)}
                          >
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{getChecklistForPercurso(item.id).length} itens</TableCell>
                            <TableCell className="text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <X className="h-4 w-4 text-destructive" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Confirmar exclusão</DialogTitle>
                                    <DialogDescription>
                                      Tem certeza que deseja excluir este percurso? Esta ação também removerá todos os itens da checklist associados.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline">Cancelar</Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleDeletePercurso(item.id)}
                                    >
                                      Excluir
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {selectedPercurso && (
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedPercurso.name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPercurso(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  {selectedPercurso.category} - {selectedPercurso.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Checklist</h3>
                  <Button size="sm" onClick={() => setIsAddingChecklist(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Item
                  </Button>
                </div>
                
                {isAddingChecklist && (
                  <div className="bg-muted p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Novo Item</h4>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Descrição do item"
                        value={formChecklistItem}
                        onChange={(e) => setFormChecklistItem(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsAddingChecklist(false)}>
                          Cancelar
                        </Button>
                        <Button size="sm" onClick={handleAddChecklistItem}>
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {getChecklistForPercurso(selectedPercurso.id).length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      Nenhum item na checklist
                    </div>
                  ) : (
                    getChecklistForPercurso(selectedPercurso.id).map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-start justify-between bg-muted/50 p-3 rounded-md"
                      >
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 mt-0.5 text-muted-foreground" />
                          <span>{item.description}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteChecklistItem(item.id)}
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Percurso;
