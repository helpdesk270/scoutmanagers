
import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Settings,
  Users,
  Lock,
  Save,
  Plus,
  Trash2,
  Edit,
  Database,
  RefreshCw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Configurazioni: React.FC = () => {
  return (
    <div className="container max-w-full overflow-x-hidden py-8">
      <h1 className="text-3xl font-bold mb-6">Configurazioni</h1>
      
      <Tabs defaultValue="generale" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="generale" className="text-xs md:text-sm">Generale</TabsTrigger>
          <TabsTrigger value="utenti" className="text-xs md:text-sm">Utenti</TabsTrigger>
          <TabsTrigger value="permessi" className="text-xs md:text-sm">Permessi</TabsTrigger>
          <TabsTrigger value="sicurezza" className="text-xs md:text-sm">Sicurezza</TabsTrigger>
        </TabsList>
        
        {/* Generale Tab */}
        <TabsContent value="generale">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Impostazioni Generali</h2>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salva Modifiche
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Organizzazione</CardTitle>
                <CardDescription>
                  Dettagli generali dell'organizzazione
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Nome Organizzazione</Label>
                  <Input id="org-name" defaultValue="Club Comando Celeste" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-email">Email Principale</Label>
                  <Input id="org-email" type="email" defaultValue="info@comandoceleste.it" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-phone">Telefono</Label>
                  <Input id="org-phone" type="tel" defaultValue="+39 123 456 7890" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-address">Indirizzo Sede</Label>
                  <Input id="org-address" defaultValue="Via Roma 123, Milano" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preferenze Sistema</CardTitle>
                <CardDescription>
                  Configurazione generale del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifiche-email">Notifiche Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Invia notifiche via email
                    </p>
                  </div>
                  <Switch id="notifiche-email" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promemoria">Promemoria Eventi</Label>
                    <p className="text-sm text-muted-foreground">
                      Invia promemoria per gli eventi
                    </p>
                  </div>
                  <Switch id="promemoria" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="backup">Backup Automatico</Label>
                    <p className="text-sm text-muted-foreground">
                      Esegui backup giornaliero dei dati
                    </p>
                  </div>
                  <Switch id="backup" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lingua">Lingua Sistema</Label>
                  <Select defaultValue="it">
                    <SelectTrigger id="lingua">
                      <SelectValue placeholder="Seleziona lingua" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Italiano</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personalizzazione</CardTitle>
                <CardDescription>
                  Personalizza l'aspetto e il funzionamento del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo Organizzazione</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 border rounded-md flex items-center justify-center bg-accent/20">
                      <img
                        src="/lovable-uploads/a7a65f60-faab-465f-a5cf-09cf39dde5c0.png"
                        alt="Logo"
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                    <Button variant="outline">Cambia Logo</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Colori Tema</Label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary border cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-blue-500 border cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-green-500 border cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-purple-500 border cursor-pointer"></div>
                    <div className="h-10 w-10 rounded-full bg-orange-500 border cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Campi Personalizzati</Label>
                  <p className="text-sm text-muted-foreground">
                    Aggiungi campi personalizzati per membri, attività e altre entità
                  </p>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi Campo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Utenti Tab */}
        <TabsContent value="utenti">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Gestione Utenti</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Utente
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <ScrollArea className="h-[70vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ruolo</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead>Ultimo Accesso</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Marco Rossi</TableCell>
                      <TableCell>marco.rossi@esempio.it</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Admin
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Attivo
                        </Badge>
                      </TableCell>
                      <TableCell>10/04/2025 14:30</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Lucia Bianchi</TableCell>
                      <TableCell>lucia.bianchi@esempio.it</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Direttore
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Attivo
                        </Badge>
                      </TableCell>
                      <TableCell>09/04/2025 10:15</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Giorgio Verdi</TableCell>
                      <TableCell>giorgio.verdi@esempio.it</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Animatore
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Attivo
                        </Badge>
                      </TableCell>
                      <TableCell>08/04/2025 18:45</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Stefania Neri</TableCell>
                      <TableCell>stefania.neri@esempio.it</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Integrante
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Inattivo
                        </Badge>
                      </TableCell>
                      <TableCell>01/04/2025 09:20</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Permessi Tab */}
        <TabsContent value="permessi">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Gestione Permessi</h2>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salva Modifiche
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Permessi per Ruolo</CardTitle>
              <CardDescription>
                Configura i permessi per ciascun ruolo nel sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Funzionalità</TableHead>
                      <TableHead className="text-center">Integrante</TableHead>
                      <TableHead className="text-center">Animatore</TableHead>
                      <TableHead className="text-center">Direttore</TableHead>
                      <TableHead className="text-center">Admin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Dashboard</TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Gestione Membri</TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Gestione Attività</TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Creazione Attività</TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Gestione Finanziaria</TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Rapporti</TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="font-medium">Amministrazione Sistema</TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sicurezza Tab */}
        <TabsContent value="sicurezza">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Sicurezza e Privacy</h2>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salva Modifiche
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Impostazioni Account</CardTitle>
                <CardDescription>
                  Configurazione della sicurezza degli account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mfa">Autenticazione a due fattori</Label>
                    <p className="text-sm text-muted-foreground">
                      Richiedi 2FA per tutti gli utenti amministrativi
                    </p>
                  </div>
                  <Switch id="mfa" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-policy">Policy Password Avanzata</Label>
                    <p className="text-sm text-muted-foreground">
                      Richiedi password complesse (min. 8 caratteri, numeri, simboli)
                    </p>
                  </div>
                  <Switch id="password-policy" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Scadenza Password</Label>
                    <p className="text-sm text-muted-foreground">
                      Le password scadono dopo 90 giorni
                    </p>
                  </div>
                  <Switch id="password-expiry" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Timeout Sessione (minuti)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Backup e Ripristino</CardTitle>
                <CardDescription>
                  Gestione dei backup e ripristino dei dati
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automatico</Label>
                    <p className="text-sm text-muted-foreground">
                      Esegui backup giornaliero dei dati
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Frequenza Backup</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Seleziona frequenza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Giornaliera</SelectItem>
                      <SelectItem value="weekly">Settimanale</SelectItem>
                      <SelectItem value="monthly">Mensile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Backup Manuale</Label>
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Esegui Backup Ora
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Ripristino</Label>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Ripristina da Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Privacy e Conformità</CardTitle>
                <CardDescription>
                  Impostazioni relative alla privacy e alla conformità normativa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-retention">Conservazione Dati</Label>
                    <p className="text-sm text-muted-foreground">
                      Elimina automaticamente i dati inattivi dopo 5 anni
                    </p>
                  </div>
                  <Switch id="data-retention" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-encryption">Crittografia Dati</Label>
                    <p className="text-sm text-muted-foreground">
                      Cripta tutti i dati sensibili nel database
                    </p>
                  </div>
                  <Switch id="data-encryption" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-log">Registro Attività</Label>
                    <p className="text-sm text-muted-foreground">
                      Registra tutte le azioni degli utenti nel sistema
                    </p>
                  </div>
                  <Switch id="audit-log" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Documenti Legali</Label>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifica
                    </Button>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Informativa sulla Privacy</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Termini di Servizio</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Policy sulla Protezione dei Dati</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configurazioni;
