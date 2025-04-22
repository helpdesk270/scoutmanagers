import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import PDFGenerator from "@/components/secretaria/PDFGenerator";

const PDFDownloadButton = ({ members, filename }) => {
  return (
    <PDFDownloadLink 
      document={<PDFGenerator members={members} />} 
      fileName={filename}
      className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-2 sm:mt-0"
    >
      {(params) => (
        params.loading ? (
          "Generazione PDF..."
        ) : (
          <>
            <Printer className="mr-2 h-4 w-4" />
            Scarica PDF
          </>
        )
      )}
    </PDFDownloadLink>
  );
};

const Impressao = () => {
  const { toast } = useToast();
  const [selectedMemberType, setSelectedMemberType] = useState<"bambini" | "animatori" | "accompagnatore">("bambini");
  const [selectedForm, setSelectedForm] = useState<"registrazione" | "adesione">("registrazione");

  const [members, setMembers] = useState<MemberType[]>([
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
      achievements: [],
      attendance: [],
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
      attendance: [],
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
      achievements: [],
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
  ]);

  const [selectedUnits, setSelectedUnits] = useState<{[key: string]: boolean}>({
    "Gemme": true,
    "Tizzoni": true,
    "Esploratori": true,
    "Animatori": true,
    "Accompagnatori": true
  });

  const getPDFFilename = () => {
    if (selectedForm === "registrazione") {
      return `modulo-registrazione-${selectedMemberType}-${Date.now()}.pdf`;
    } else {
      return `modulo-adesione-${selectedMemberType}-${Date.now()}.pdf`;
    }
  };

  const getFilteredMembers = () => {
    const typeFiltered = members.filter(m => m.memberType === selectedMemberType);
    
    return typeFiltered.filter(m => m.unitName ? selectedUnits[m.unitName] : true);
  };

  const handlePrintAll = () => {
    const filteredMembers = getFilteredMembers();
    
    if (filteredMembers.length === 0) {
      toast({
        title: "Nessun membro da stampare",
        description: "Non ci sono membri che corrispondono ai criteri selezionati.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download iniziato",
      description: `Il PDF con ${filteredMembers.length} membri sta per essere scaricato.`
    });
  };

  const handleToggleUnit = (unit: string, checked: boolean) => {
    setSelectedUnits(prev => ({...prev, [unit]: checked}));
  };

  return (
    <div className="container py-6 md:py-8 animate-fade-in">
      <h1 className="text-2xl font-bold md:text-3xl mb-6">Stampa</h1>
      
      <Tabs defaultValue="moduli" className="w-full mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="moduli">Moduli di Registrazione</TabsTrigger>
          <TabsTrigger value="adesioni">Adesioni</TabsTrigger>
        </TabsList>
        
        <TabsContent value="moduli" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Moduli di Registrazione
              </CardTitle>
              <CardDescription>
                Genera moduli di registrazione per la stampa o PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-base font-medium mb-2">Tipo di Membro</h3>
                    <Select 
                      value={selectedMemberType} 
                      onValueChange={(value) => setSelectedMemberType(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo di membro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bambini">Bambini</SelectItem>
                        <SelectItem value="animatori">Animatori</SelectItem>
                        <SelectItem value="accompagnatore">Accompagnatore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-2">Unità</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedMemberType === "bambini" && (
                        <>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="gemme" 
                              checked={selectedUnits["Gemme"]} 
                              onCheckedChange={(checked) => handleToggleUnit("Gemme", checked as boolean)}
                            />
                            <label
                              htmlFor="gemme"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Gemme
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="tizzoni" 
                              checked={selectedUnits["Tizzoni"]} 
                              onCheckedChange={(checked) => handleToggleUnit("Tizzoni", checked as boolean)}
                            />
                            <label
                              htmlFor="tizzoni"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Tizzoni
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="esploratori" 
                              checked={selectedUnits["Esploratori"]} 
                              onCheckedChange={(checked) => handleToggleUnit("Esploratori", checked as boolean)}
                            />
                            <label
                              htmlFor="esploratori"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Esploratori
                            </label>
                          </div>
                        </>
                      )}
                      
                      {selectedMemberType === "animatori" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="animatori" 
                            checked={selectedUnits["Animatori"]} 
                            onCheckedChange={(checked) => handleToggleUnit("Animatori", checked as boolean)}
                          />
                          <label
                            htmlFor="animatori"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Animatori
                          </label>
                        </div>
                      )}
                      
                      {selectedMemberType === "accompagnatore" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="accompagnatori" 
                            checked={selectedUnits["Accompagnatori"]} 
                            onCheckedChange={(checked) => handleToggleUnit("Accompagnatori", checked as boolean)}
                          />
                          <label
                            htmlFor="accompagnatori"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accompagnatori
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-2">Tipo di Modulo</h3>
                    <Select 
                      value={selectedForm} 
                      onValueChange={(value) => setSelectedForm(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo di modulo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registrazione">Modulo di Registrazione</SelectItem>
                        <SelectItem value="adesione">Modulo di Adesione</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="font-medium text-base mb-4">Anteprima Selezione</h3>
                  
                  {getFilteredMembers().length > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Tipo di membro:</p>
                        <p className="text-sm capitalize">{selectedMemberType}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Unità incluse:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(selectedUnits)
                            .filter(([_, isSelected]) => isSelected)
                            .map(([unit, _]) => (
                              <Badge key={unit} variant="outline" className="text-xs">
                                {unit}
                              </Badge>
                            ))
                          }
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Membri trovati:</p>
                        <p className="text-sm">{getFilteredMembers().length} membri</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Tipo di modulo:</p>
                        <p className="text-sm">{selectedForm === "registrazione" ? "Modulo di Registrazione" : "Modulo di Adesione"}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-20" />
                      <p>Nessun membro trovato</p>
                      <p className="text-xs mt-1">Modifica i filtri per trovare membri</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <PDFDownloadButton members={getFilteredMembers()} filename={getPDFFilename()} />
              <Button 
                variant="outline" 
                onClick={handlePrintAll}
                disabled={getFilteredMembers().length === 0}
              >
                <Printer className="mr-2 h-4 w-4" />
                Stampa
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="adesioni" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Moduli di Adesione
              </CardTitle>
              <CardDescription>
                Genera moduli di adesione e autorizzazioni per la stampa o PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Funzionalità in fase di sviluppo</p>
                <p className="max-w-md mx-auto mt-2">
                  Questa sezione permetterà di generare moduli di adesione e autorizzazioni specifiche.
                  Torna a visitarci presto!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Impressao;
