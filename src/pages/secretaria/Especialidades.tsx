
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award, Plus, Search, X, FileText } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface Especialidade {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: string[];
  formacao: "gemma" | "tizzoni" | "esploratori" | "animatori";
}

const Especialidades = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState<string>("gemma");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [especialidades, setEspecialidades] = React.useState<Especialidade[]>([]);
  const [filteredItems, setFilteredItems] = React.useState<Especialidade[]>([]);
  const [selectedEspecialidade, setSelectedEspecialidade] = React.useState<Especialidade | null>(null);
  
  // Form state
  const [isAddingEspecialidade, setIsAddingEspecialidade] = React.useState(false);
  const [formName, setFormName] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formCategory, setFormCategory] = React.useState("");
  const [formRequirement, setFormRequirement] = React.useState("");
  const [formRequirements, setFormRequirements] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Mock data
    const mockEspecialidades: Especialidade[] = [
      {
        id: "1",
        name: "Primeiros Socorros",
        description: "Aprender técnicas básicas de primeiros socorros",
        category: "Saúde",
        requirements: [
          "Demonstrar como lidar com pequenos cortes e escoriações",
          "Aprender posição de recuperação",
          "Saber chamar por ajuda em caso de emergência",
          "Criar um kit básico de primeiros socorros"
        ],
        formacao: "tizzoni"
      },
      {
        id: "2",
        name: "Artesanato",
        description: "Desenvolver habilidades criativas através do artesanato",
        category: "Arte",
        requirements: [
          "Criar 3 trabalhos manuais diferentes",
          "Aprender a usar materiais recicláveis",
          "Ensinar uma técnica para o grupo"
        ],
        formacao: "gemma"
      },
      {
        id: "3",
        name: "Navegação",
        description: "Aprender técnicas de orientação e navegação",
        category: "Técnicas de Campo",
        requirements: [
          "Usar corretamente uma bússola",
          "Ler um mapa topográfico",
          "Completar uma trilha de orientação",
          "Identificar 5 constelações no céu noturno"
        ],
        formacao: "esploratori"
      },
      {
        id: "4",
        name: "Liderança",
        description: "Desenvolver habilidades de liderança e gestão de equipe",
        category: "Desenvolvimento Pessoal",
        requirements: [
          "Liderar uma atividade de grupo",
          "Demonstrar capacidade de tomada de decisões",
          "Solucionar conflitos em equipe",
          "Criar e executar um projeto para o grupo"
        ],
        formacao: "animatori"
      }
    ];
    
    setEspecialidades(mockEspecialidades);
    filterItems(mockEspecialidades, activeTab, searchQuery);
  }, []);

  const filterItems = (items: Especialidade[], tab: string, query: string) => {
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
    filterItems(especialidades, activeTab, query);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterItems(especialidades, value, searchQuery);
    setSelectedEspecialidade(null);
  };

  const handleAddRequirement = () => {
    if (formRequirement.trim()) {
      setFormRequirements([...formRequirements, formRequirement]);
      setFormRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updated = [...formRequirements];
    updated.splice(index, 1);
    setFormRequirements(updated);
  };

  const handleAddEspecialidade = () => {
    const newEspecialidade: Especialidade = {
      id: `${especialidades.length + 1}`,
      name: formName,
      description: formDescription,
      category: formCategory,
      requirements: formRequirements,
      formacao: activeTab as "gemma" | "tizzoni" | "esploratori" | "animatori"
    };
    
    const updatedItems = [...especialidades, newEspecialidade];
    setEspecialidades(updatedItems);
    filterItems(updatedItems, activeTab, searchQuery);
    
    // Reset form
    setFormName("");
    setFormDescription("");
    setFormCategory("");
    setFormRequirements([]);
    setIsAddingEspecialidade(false);
    
    toast({
      title: "Especialidade adicionada",
      description: `${newEspecialidade.name} foi adicionada com sucesso.`
    });
  };

  const handleDeleteEspecialidade = (id: string) => {
    const updatedItems = especialidades.filter(item => item.id !== id);
    setEspecialidades(updatedItems);
    filterItems(updatedItems, activeTab, searchQuery);
    
    if (selectedEspecialidade && selectedEspecialidade.id === id) {
      setSelectedEspecialidade(null);
    }
    
    toast({
      title: "Especialidade removida",
      description: "Especialidade removida com sucesso.",
      variant: "destructive"
    });
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Cadastro de Especialidades</h1>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setIsAddingEspecialidade(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Especialidade
          </Button>
        </div>
      </div>

      {isAddingEspecialidade && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adicionar Nova Especialidade</CardTitle>
            <CardDescription>Preencha os dados para adicionar uma nova especialidade</CardDescription>
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
                    placeholder="Nome da especialidade"
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
                  placeholder="Descrição da especialidade"
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
              <div className="space-y-2">
                <Label>Requisitos</Label>
                <div className="flex gap-2">
                  <Input 
                    value={formRequirement} 
                    onChange={(e) => setFormRequirement(e.target.value)} 
                    placeholder="Adicionar requisito"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRequirement();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleAddRequirement}
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {formRequirements.map((req, index) => (
                    <div key={index} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                      <span className="text-sm">{req}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveRequirement(index)}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddingEspecialidade(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddEspecialidade}>
              Adicionar
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-${selectedEspecialidade ? '1' : '3'}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Especialidades
              </CardTitle>
              <div className="flex items-center mt-2">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar especialidade..."
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
                  Nenhuma especialidade encontrada
                </div>
              ) : (
                <div className="space-y-4">
                  {isMobile ? (
                    <div className="space-y-4">
                      {filteredItems.map((item) => (
                        <Card
                          key={item.id}
                          className="p-4 cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedEspecialidade(item)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <Badge variant="outline" className="mt-1">{item.category}</Badge>
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
                                    Tem certeza que deseja excluir esta especialidade?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancelar</Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleDeleteEspecialidade(item.id)}
                                  >
                                    Excluir
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              {item.requirements.length} requisitos
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEspecialidade(item);
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
                          <TableHead>Requisitos</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow 
                            key={item.id}
                            className="cursor-pointer"
                            onClick={() => setSelectedEspecialidade(item)}
                          >
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.requirements.length} requisitos</TableCell>
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
                                      Tem certeza que deseja excluir esta especialidade?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline">Cancelar</Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleDeleteEspecialidade(item.id)}
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
        
        {selectedEspecialidade && (
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedEspecialidade.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">{selectedEspecialidade.category}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEspecialidade(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="mt-2">
                  {selectedEspecialidade.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Requisitos para obtenção
                    </h3>
                    <div className="space-y-2">
                      {selectedEspecialidade.requirements.map((req, index) => (
                        <div key={index} className="bg-muted/50 p-3 rounded-md">
                          <div className="flex gap-2">
                            <span className="font-medium">{index + 1}.</span>
                            <span>{req}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Especialidades;
