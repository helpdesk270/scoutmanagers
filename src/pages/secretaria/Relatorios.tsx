
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, FileText, Users, Calendar, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Relatorios = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState("panoramica");
  const [anoSelecionado, setAnoSelecionado] = React.useState("2023");
  const [mesInicio, setMesInicio] = React.useState("01");
  const [mesFim, setMesFim] = React.useState("12");
  const [formacaoSelecionada, setFormacaoSelecionada] = React.useState("all");
  
  // Mock data for reports
  const mockParticipacaoData = [
    { name: 'Jan', presentes: 24, ausentes: 6 },
    { name: 'Fev', presentes: 22, ausentes: 8 },
    { name: 'Mar', presentes: 25, ausentes: 5 },
    { name: 'Abr', presentes: 18, ausentes: 12 },
    { name: 'Mai', presentes: 20, ausentes: 10 },
    { name: 'Jun', presentes: 28, ausentes: 2 },
    { name: 'Jul', presentes: 15, ausentes: 15 },
    { name: 'Ago', presentes: 27, ausentes: 3 },
    { name: 'Set', presentes: 24, ausentes: 6 },
    { name: 'Out', presentes: 23, ausentes: 7 },
    { name: 'Nov', presentes: 26, ausentes: 4 },
    { name: 'Dez', presentes: 28, ausentes: 2 },
  ];

  const mockDistribuicaoData = [
    { name: 'Gemma', value: 15 },
    { name: 'Tizzoni', value: 20 },
    { name: 'Esploratori', value: 18 },
    { name: 'Animatori', value: 7 },
  ];

  const mockEvolucaoData = [
    { name: 'Jan', membros: 52 },
    { name: 'Fev', membros: 54 },
    { name: 'Mar', membros: 56 },
    { name: 'Abr', membros: 58 },
    { name: 'Mai', membros: 58 },
    { name: 'Jun', membros: 60 },
    { name: 'Jul', membros: 60 },
    { name: 'Ago', membros: 62 },
    { name: 'Set', membros: 65 },
    { name: 'Out', membros: 68 },
    { name: 'Nov', membros: 70 },
    { name: 'Dez', membros: 72 },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Relatório Gerado",
      description: "O relatório foi gerado com sucesso."
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Download Iniciado",
      description: "O download do relatório começará em breve."
    });
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Relatórios</h1>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Relatórios
          </CardTitle>
          <CardDescription>
            Visualize estatísticas e relatórios do Club Comando Celeste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="panoramica" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="panoramica">Panorâmica</TabsTrigger>
              <TabsTrigger value="participacao">Participação</TabsTrigger>
              <TabsTrigger value="personalizado">Personalizado</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="panoramica">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          Total de Membros
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">72</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          +8 nos últimos 3 meses
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Taxa de Presença
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Média do último mês
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Conquistas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Especialidades e percursos completados
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Distribuição por Formação</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={mockDistribuicaoData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {mockDistribuicaoData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Evolução do Número de Membros</CardTitle>
                      </CardHeader>
                      <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockEvolucaoData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="membros" 
                              stroke="#8884d8" 
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="participacao">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 md:items-end">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                      <div>
                        <Label htmlFor="ano">Ano</Label>
                        <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                          <SelectTrigger id="ano">
                            <SelectValue placeholder="Selecione o ano" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="mes-inicio">De</Label>
                        <Select value={mesInicio} onValueChange={setMesInicio}>
                          <SelectTrigger id="mes-inicio">
                            <SelectValue placeholder="Mês inicial" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">Janeiro</SelectItem>
                            <SelectItem value="02">Fevereiro</SelectItem>
                            <SelectItem value="03">Março</SelectItem>
                            <SelectItem value="04">Abril</SelectItem>
                            <SelectItem value="05">Maio</SelectItem>
                            <SelectItem value="06">Junho</SelectItem>
                            <SelectItem value="07">Julho</SelectItem>
                            <SelectItem value="08">Agosto</SelectItem>
                            <SelectItem value="09">Setembro</SelectItem>
                            <SelectItem value="10">Outubro</SelectItem>
                            <SelectItem value="11">Novembro</SelectItem>
                            <SelectItem value="12">Dezembro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="mes-fim">Até</Label>
                        <Select value={mesFim} onValueChange={setMesFim}>
                          <SelectTrigger id="mes-fim">
                            <SelectValue placeholder="Mês final" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">Janeiro</SelectItem>
                            <SelectItem value="02">Fevereiro</SelectItem>
                            <SelectItem value="03">Março</SelectItem>
                            <SelectItem value="04">Abril</SelectItem>
                            <SelectItem value="05">Maio</SelectItem>
                            <SelectItem value="06">Junho</SelectItem>
                            <SelectItem value="07">Julho</SelectItem>
                            <SelectItem value="08">Agosto</SelectItem>
                            <SelectItem value="09">Setembro</SelectItem>
                            <SelectItem value="10">Outubro</SelectItem>
                            <SelectItem value="11">Novembro</SelectItem>
                            <SelectItem value="12">Dezembro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={handleGenerateReport}>
                      Gerar Relatório
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Taxa de Participação Mensal</CardTitle>
                    </CardHeader>
                    <CardContent className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockParticipacaoData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="presentes" stackId="a" fill="#4ade80" name="Presentes" />
                          <Bar dataKey="ausentes" stackId="a" fill="#f87171" name="Ausentes" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="personalizado">
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-4 flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros do Relatório
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tipo-relatorio">Tipo de Relatório</Label>
                        <Select defaultValue="members">
                          <SelectTrigger id="tipo-relatorio">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="members">Membros</SelectItem>
                            <SelectItem value="attendance">Presenças</SelectItem>
                            <SelectItem value="achievements">Conquistas</SelectItem>
                            <SelectItem value="activities">Atividades</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="formacao">Formação</Label>
                        <Select 
                          value={formacaoSelecionada} 
                          onValueChange={setFormacaoSelecionada}
                        >
                          <SelectTrigger id="formacao">
                            <SelectValue placeholder="Selecione a formação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="gemma">Gemma</SelectItem>
                            <SelectItem value="tizzoni">Tizzoni</SelectItem>
                            <SelectItem value="esploratori">Esploratori</SelectItem>
                            <SelectItem value="animatori">Animatori</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="periodo">Período</Label>
                        <Select defaultValue="year">
                          <SelectTrigger id="periodo">
                            <SelectValue placeholder="Selecione o período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month">Último Mês</SelectItem>
                            <SelectItem value="quarter">Último Trimestre</SelectItem>
                            <SelectItem value="semester">Último Semestre</SelectItem>
                            <SelectItem value="year">Último Ano</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button onClick={handleGenerateReport}>
                        Gerar Relatório Personalizado
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-muted-foreground">
                    Selecione os filtros acima e clique em "Gerar Relatório Personalizado"
                    para visualizar os dados.
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
