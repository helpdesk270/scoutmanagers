
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/context/AuthContext";
import { MemberType } from "@/types/member";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemberFormProps {
  member?: MemberType;
  onSubmit: (data: Omit<MemberType, "id" | "achievements" | "attendance">) => void;
  onCancel: () => void;
  initialTab?: "bambini" | "animatori" | "accompagnatore";
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onSubmit, onCancel, initialTab = "bambini" }) => {
  const form = useForm({
    defaultValues: {
      // Personal data
      name: member?.name || "",
      email: member?.email || "",
      role: member?.role || "integrante" as UserRole,
      unitName: member?.unitName || "",
      avatarUrl: member?.avatarUrl || "/placeholder.svg",
      birthDate: member?.birthDate || undefined,
      birthPlace: member?.birthPlace || "",
      address: member?.address || "",
      phone: member?.phone || "",
      fiscalCode: member?.fiscalCode || "",
      
      // Common
      memberType: member?.memberType || initialTab,
      
      // Health information
      bloodType: member?.bloodType || "",
      allergies: member?.allergies || "",
      medications: member?.medications || "",
      healthNotes: member?.healthNotes || "",
      followsMedicalTreatment: member?.followsMedicalTreatment || false,
      illnesses: member?.illnesses || {
        rosolia: false,
        varicella: false,
        angina: false,
        febbreReumatica: false,
        scarlattina: false,
        pertosse: false,
        otite: false,
        morbillo: false,
        parotite: false
      },
      allergyDetails: member?.allergyDetails || "",
      healthDifficulties: member?.healthDifficulties || "",
      parentRecommendations: member?.parentRecommendations || "",
      
      // Document information
      documentType: member?.documentType || "cartaIdentita",
      documentNumber: member?.documentNumber || "",
      issuedBy: member?.issuedBy || "",
      
      // Authorizations
      photoConsent: member?.photoConsent || false,
      aisaPhotoConsent: member?.aisaPhotoConsent || false,
      tripConsent: member?.tripConsent || false,
      medicalTreatmentConsent: member?.medicalTreatmentConsent || false,
      dataProcessingConsent: member?.dataProcessingConsent || false,
      
      // Parent/Guardian information
      parentName: member?.parentName || "",
      parentAddress: member?.parentAddress || "",
      parentFiscalCode: member?.parentFiscalCode || "",
      parentPhone: member?.parentPhone || "",
      
      // Emergency contacts
      emergencyContact1Name: member?.emergencyContact1Name || "",
      emergencyContact1Relation: member?.emergencyContact1Relation || "",
      emergencyContact1Phone: member?.emergencyContact1Phone || "",
      emergencyContact2Name: member?.emergencyContact2Name || "",
      emergencyContact2Relation: member?.emergencyContact2Relation || "",
      emergencyContact2Phone: member?.emergencyContact2Phone || "",
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  const memberType = form.watch("memberType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Tabs defaultValue={initialTab} onValueChange={(value) => form.setValue("memberType", value)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="bambini">Bambino</TabsTrigger>
            <TabsTrigger value="animatori">Animatore</TabsTrigger>
            <TabsTrigger value="accompagnatore">Accompagnatore</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4 border p-4 rounded-md mb-4">
            <h3 className="font-medium">Dati Personali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome e cognome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data di nascita</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: it })
                            ) : (
                              <span>Seleziona data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luogo di nascita</FormLabel>
                    <FormControl>
                      <Input placeholder="Città di nascita" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indirizzo</FormLabel>
                  <FormControl>
                    <Input placeholder="Via Roma 123, 00100 Roma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input placeholder="+39 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fiscalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codice Fiscale</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDEF12G34H567I" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ruolo</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="integrante">Integrante</option>
                        <option value="animatore">Animatore</option>
                        <option value="direttore">Direttore</option>
                        <option value="admin">Admin</option>
                        <option value="accompagnatore">Accompagnatore</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unità</FormLabel>
                    <FormControl>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        {memberType === "bambini" && (
                          <>
                            <option value="Gemme">Gemme</option>
                            <option value="Tizzoni">Tizzoni</option>
                            <option value="Esploratori">Esploratori</option>
                          </>
                        )}
                        {memberType === "animatori" && (
                          <option value="Animatori">Animatori</option>
                        )}
                        {memberType === "accompagnatore" && (
                          <option value="Accompagnatori">Accompagnatori</option>
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {memberType === "bambini" && (
            <>
              <div className="space-y-4 border p-4 rounded-md mb-4">
                <h3 className="font-medium">Informazioni di Salute</h3>
                
                <FormField
                  control={form.control}
                  name="followsMedicalTreatment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Segue un trattamento medico
                        </FormLabel>
                        <FormDescription>
                          Il ragazzo/a segue un trattamento medico?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gruppo Sanguigno</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="">Seleziona</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="0+">0+</option>
                          <option value="0-">0-</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Il ragazzo/a ha avuto una di queste malattie?</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-1">
                    <FormField
                      control={form.control}
                      name="illnesses.rosolia"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Rosolia</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.varicella"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Varicella</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.angina"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Angina</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.febbreReumatica"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Febbre Reumatica</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.scarlattina"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Scarlattina</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.pertosse"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Pertosse</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.otite"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Otite</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.morbillo"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Morbillo</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="illnesses.parotite"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Parotite</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergie</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Allergie alimentari, ai farmaci, stagionali, ecc."
                          {...field} 
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="allergyDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dettagli Allergie</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Precisare la causa delle allergie e il comportamento/procedura da tenere (se automedicazione, segnalarlo)"
                          {...field} 
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="medications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmaci</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Farmaci che devono essere assunti regolarmente"
                          {...field}
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="healthDifficulties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficoltà di Salute</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Difficoltà di salute (malattie, incidenti, crisi convulsive, ricoveri, operazioni chirurgiche, riabilitazioni) con date e precauzioni da prendere."
                          {...field}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="healthNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note Mediche</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Altre informazioni mediche rilevanti" 
                          {...field}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="parentRecommendations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raccomandazioni dai Genitori</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Raccomandazioni utili dai genitori/tutore" 
                          {...field}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4 border p-4 rounded-md mb-4">
                <h3 className="font-medium">Informazioni Genitore/Tutore</h3>
                
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome e Cognome Genitore/Tutore</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="parentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Indirizzo Genitore/Tutore</FormLabel>
                      <FormControl>
                        <Input placeholder="Via Roma 123, 00100 Roma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="parentFiscalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codice Fiscale Genitore/Tutore</FormLabel>
                        <FormControl>
                          <Input placeholder="ABCDEF12G34H567I" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="parentPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono Genitore/Tutore</FormLabel>
                        <FormControl>
                          <Input placeholder="+39 123 456 7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContact1Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Contatto Emergenza</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emergencyContact1Relation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relazione</FormLabel>
                        <FormControl>
                          <Input placeholder="Es. Genitore, Tutore" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emergencyContact1Phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input placeholder="+39 123 456 7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-4 border p-4 rounded-md mb-4">
                <h3 className="font-medium">Autorizzazioni</h3>
                
                <FormField
                  control={form.control}
                  name="dataProcessingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Consenso Trattamento Dati
                        </FormLabel>
                        <FormDescription>
                          Autorizzo il trattamento dei dati personali secondo la normativa vigente.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="photoConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Consenso Fotografico
                        </FormLabel>
                        <FormDescription>
                          Autorizzo l'uso di foto e video in cui appare il membro per scopi promozionali dell'organizzazione.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="aisaPhotoConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Consenso Fotografico A.I.S.A
                        </FormLabel>
                        <FormDescription>
                          Concedo l'autorizzazione affinché il minore di cui sopra venga ritratto in foto e/o video utilizzate dall'associazione nell'ambito di attività di comunicazione inerenti all'A.I.S.A.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tripConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Consenso per Gite
                        </FormLabel>
                        <FormDescription>
                          Autorizzo la partecipazione a gite ed escursioni organizzate dal gruppo.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="medicalTreatmentConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Consenso per Trattamento Medico
                        </FormLabel>
                        <FormDescription>
                          Autorizzo il personale a fornire assistenza medica di base e a cercare cure mediche professionali in caso di emergenza.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          
          {(memberType === "animatori" || memberType === "accompagnatore") && (
            <>
              <div className="space-y-4 border p-4 rounded-md mb-4">
                <h3 className="font-medium">Informazioni Documento</h3>
                
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo di Documento</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                        >
                          <option value="cartaIdentita">Carta d'identità</option>
                          <option value="patente">Patente</option>
                          <option value="passaporto">Passaporto</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero Documento</FormLabel>
                      <FormControl>
                        <Input placeholder="Numero del documento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="issuedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rilasciato da</FormLabel>
                      <FormControl>
                        <Input placeholder="Ente che ha rilasciato il documento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4 border p-4 rounded-md mb-4">
                <h3 className="font-medium">Autorizzazioni</h3>
                
                <FormField
                  control={form.control}
                  name="dataProcessingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Consenso Trattamento Dati
                        </FormLabel>
                        <FormDescription>
                          Autorizzo il trattamento dei dati personali secondo la normativa vigente.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annulla
          </Button>
          <Button type="submit">
            {member ? "Aggiorna" : "Aggiungi"} Membro
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MemberForm;
