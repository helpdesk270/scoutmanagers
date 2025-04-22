import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { MemberType, UserRole } from "@/types/member";

interface MemberFormProps {
  member?: MemberType;
  onSubmit: (data: Partial<MemberType>) => void;
  onCancel: () => void;
  initialTab?: "bambini" | "animatori" | "accompagnatore";
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onSubmit, onCancel, initialTab = "bambini" }) => {
  const [name, setName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");
  const [role, setRole] = useState<UserRole>(member?.role || "integrante");
  const [unitName, setUnitName] = useState(member?.unitName || "");
  const [avatarUrl, setAvatarUrl] = useState(member?.avatarUrl || "");
  const [birthDate, setBirthDate] = useState<Date | undefined>(member?.birthDate);
  const [birthPlace, setBirthPlace] = useState(member?.birthPlace || "");
  const [address, setAddress] = useState(member?.address || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [fiscalCode, setFiscalCode] = useState(member?.fiscalCode || "");
  const [memberType, setMemberType] = useState<"bambini" | "animatori" | "accompagnatore">(member?.memberType || initialTab);
  const [documentType, setDocumentType] = useState<"cartaIdentita" | "patente" | "passaporto">(member?.documentType || "cartaIdentita");
  const [documentNumber, setDocumentNumber] = useState(member?.documentNumber || "");
  const [issuedBy, setIssuedBy] = useState(member?.issuedBy || "");
  const [bloodType, setBloodType] = useState(member?.bloodType || "");
  const [allergies, setAllergies] = useState(member?.allergies || "");
  const [medications, setMedications] = useState(member?.medications || "");
  const [healthNotes, setHealthNotes] = useState(member?.healthNotes || "");
  const [followsMedicalTreatment, setFollowsMedicalTreatment] = useState(member?.followsMedicalTreatment || false);
  const [illnesses, setIllnesses] = useState(member?.illnesses || {
    rosolia: false,
    varicella: false,
    angina: false,
    febbreReumatica: false,
    scarlattina: false,
    pertosse: false,
    otite: false,
    morbillo: false,
    parotite: false
  });
  const [allergyDetails, setAllergyDetails] = useState(member?.allergyDetails || "");
  const [healthDifficulties, setHealthDifficulties] = useState(member?.healthDifficulties || "");
  const [parentRecommendations, setParentRecommendations] = useState(member?.parentRecommendations || "");
  const [photoConsent, setPhotoConsent] = useState(member?.photoConsent || false);
  const [aisaPhotoConsent, setAisaPhotoConsent] = useState(member?.aisaPhotoConsent || false);
  const [tripConsent, setTripConsent] = useState(member?.tripConsent || false);
  const [medicalTreatmentConsent, setMedicalTreatmentConsent] = useState(member?.medicalTreatmentConsent || false);
  const [dataProcessingConsent, setDataProcessingConsent] = useState(member?.dataProcessingConsent || false);
  const [parentName, setParentName] = useState(member?.parentName || "");
  const [parentAddress, setParentAddress] = useState(member?.parentAddress || "");
  const [parentFiscalCode, setParentFiscalCode] = useState(member?.parentFiscalCode || "");
  const [parentPhone, setParentPhone] = useState(member?.parentPhone || "");
  const [emergencyContact1Name, setEmergencyContact1Name] = useState(member?.emergencyContact1Name || "");
  const [emergencyContact1Relation, setEmergencyContact1Relation] = useState(member?.emergencyContact1Relation || "");
  const [emergencyContact1Phone, setEmergencyContact1Phone] = useState(member?.emergencyContact1Phone || "");
  const [emergencyContact2Name, setEmergencyContact2Name] = useState(member?.emergencyContact2Name || "");
  const [emergencyContact2Relation, setEmergencyContact2Relation] = useState(member?.emergencyContact2Relation || "");
  const [emergencyContact2Phone, setEmergencyContact2Phone] = useState(member?.emergencyContact2Phone || "");

  const handleRoleChange = (value: string) => {
    setRole(value as UserRole);
  };

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value as "cartaIdentita" | "patente" | "passaporto");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: Partial<MemberType> = {
      name,
      email,
      role,
      unitName,
      avatarUrl,
      birthDate,
      birthPlace,
      address,
      phone,
      fiscalCode,
      memberType,
      documentType,
      documentNumber,
      issuedBy,
      bloodType,
      allergies,
      medications,
      healthNotes,
      followsMedicalTreatment,
      illnesses,
      allergyDetails,
      healthDifficulties,
      parentRecommendations,
      photoConsent,
      aisaPhotoConsent,
      tripConsent,
      medicalTreatmentConsent,
      dataProcessingConsent,
      parentName,
      parentAddress,
      parentFiscalCode,
      parentPhone,
      emergencyContact1Name,
      emergencyContact1Relation,
      emergencyContact1Phone,
      emergencyContact2Name,
      emergencyContact2Relation,
      emergencyContact2Phone,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Informazioni generali</CardTitle>
          <CardDescription>Dati principali del membro</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Ruolo</Label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona un ruolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="integrante">Integrante</SelectItem>
                  <SelectItem value="animatore">Animatore</SelectItem>
                  <SelectItem value="direttore">Direttore</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="accompagnatore">Accompagnatore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unitName">Unità</Label>
              <Input
                id="unitName"
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="avatarUrl">URL Avatar</Label>
            <Input
              id="avatarUrl"
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {memberType === "bambini" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Anagrafiche Bambino</CardTitle>
              <CardDescription>Dati specifici del bambino</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate">Data di Nascita</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "PPP") : <span>Scegli una data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="birthPlace">Luogo di Nascita</Label>
                  <Input
                    id="birthPlace"
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Indirizzo</Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fiscalCode">Codice Fiscale</Label>
                <Input
                  id="fiscalCode"
                  type="text"
                  value={fiscalCode}
                  onChange={(e) => setFiscalCode(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informazioni Mediche</CardTitle>
              <CardDescription>Dettagli sullo stato di salute del bambino</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodType">Gruppo Sanguigno</Label>
                  <Input
                    id="bloodType"
                    type="text"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="allergies">Allergie</Label>
                  <Input
                    id="allergies"
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medications">Farmaci Assunti</Label>
                  <Input
                    id="medications"
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="healthNotes">Note sulla Salute</Label>
                  <Input
                    id="healthNotes"
                    type="text"
                    value={healthNotes}
                    onChange={(e) => setHealthNotes(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="allergyDetails">Dettagli Allergie</Label>
                <Textarea
                  id="allergyDetails"
                  value={allergyDetails}
                  onChange={(e) => setAllergyDetails(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="healthDifficulties">Difficoltà di Salute</Label>
                <Textarea
                  id="healthDifficulties"
                  value={healthDifficulties}
                  onChange={(e) => setHealthDifficulties(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="parentRecommendations">Raccomandazioni dei Genitori</Label>
                <Textarea
                  id="parentRecommendations"
                  value={parentRecommendations}
                  onChange={(e) => setParentRecommendations(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="followsMedicalTreatment"
                  checked={followsMedicalTreatment}
                  onCheckedChange={(checked) => setFollowsMedicalTreatment(!!checked)}
                />
                <Label htmlFor="followsMedicalTreatment">Segue Terapie Mediche</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Malattie</CardTitle>
              <CardDescription>Storico malattie del bambino</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rosolia"
                      checked={illnesses.rosolia}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, rosolia: !!checked })}
                    />
                    <Label htmlFor="rosolia">Rosolia</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="varicella"
                      checked={illnesses.varicella}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, varicella: !!checked })}
                    />
                    <Label htmlFor="varicella">Varicella</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="angina"
                      checked={illnesses.angina}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, angina: !!checked })}
                    />
                    <Label htmlFor="angina">Angina</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="febbreReumatica"
                      checked={illnesses.febbreReumatica}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, febbreReumatica: !!checked })}
                    />
                    <Label htmlFor="febbreReumatica">Febbre Reumatica</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="scarlattina"
                      checked={illnesses.scarlattina}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, scarlattina: !!checked })}
                    />
                    <Label htmlFor="scarlattina">Scarlattina</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pertosse"
                      checked={illnesses.pertosse}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, pertosse: !!checked })}
                    />
                    <Label htmlFor="pertosse">Pertosse</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otite"
                      checked={illnesses.otite}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, otite: !!checked })}
                    />
                    <Label htmlFor="otite">Otite</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="morbillo"
                      checked={illnesses.morbillo}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, morbillo: !!checked })}
                    />
                    <Label htmlFor="morbillo">Morbillo</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parotite"
                      checked={illnesses.parotite}
                      onCheckedChange={(checked) => setIllnesses({ ...illnesses, parotite: !!checked })}
                    />
                    <Label htmlFor="parotite">Parotite</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informazioni Genitori</CardTitle>
              <CardDescription>Dati relativi ai genitori/tutori</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="parentName">Nome Genitore</Label>
                <Input
                  id="parentName"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="parentAddress">Indirizzo Genitore</Label>
                <Input
                  id="parentAddress"
                  type="text"
                  value={parentAddress}
                  onChange={(e) => setParentAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentFiscalCode">Codice Fiscale Genitore</Label>
                  <Input
                    id="parentFiscalCode"
                    type="text"
                    value={parentFiscalCode}
                    onChange={(e) => setParentFiscalCode(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="parentPhone">Telefono Genitore</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {memberType === "animatori" && (
        <Card>
          <CardHeader>
            <CardTitle>Informazioni Documento</CardTitle>
            <CardDescription>Dati relativi al documento identificativo</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="documentType">Tipo di Documento</Label>
                <Select value={documentType} onValueChange={handleDocumentTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cartaIdentita">Carta d'Identità</SelectItem>
                    <SelectItem value="patente">Patente</SelectItem>
                    <SelectItem value="passaporto">Passaporto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="documentNumber">Numero di Documento</Label>
                <Input
                  id="documentNumber"
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="issuedBy">Rilasciato da</Label>
              <Input
                id="issuedBy"
                type="text"
                value={issuedBy}
                onChange={(e) => setIssuedBy(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {memberType === "accompagnatore" && (
        <Card>
          <CardHeader>
            <CardTitle>Informazioni Accompagnatore</CardTitle>
            <CardDescription>Dati specifici dell'accompagnatore</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="documentType">Tipo di Documento</Label>
                <Select value={documentType} onValueChange={handleDocumentTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cartaIdentita">Carta d'Identità</SelectItem>
                    <SelectItem value="patente">Patente</SelectItem>
                    <SelectItem value="passaporto">Passaporto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="documentNumber">Numero di Documento</Label>
                <Input
                  id="documentNumber"
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="issuedBy">Rilasciato da</Label>
              <Input
                id="issuedBy"
                type="text"
                value={issuedBy}
                onChange={(e) => setIssuedBy(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {(memberType === "bambini") && (
        <Card>
          <CardHeader>
            <CardTitle>Contatti di Emergenza</CardTitle>
            <CardDescription>Informazioni sui contatti in caso di emergenza</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact1Name">Nome Contatto 1</Label>
                <Input
                  id="emergencyContact1Name"
                  type="text"
                  value={emergencyContact1Name}
                  onChange={(e) => setEmergencyContact1Name(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact1Relation">Relazione Contatto 1</Label>
                <Input
                  id="emergencyContact1Relation"
                  type="text"
                  value={emergencyContact1Relation}
                  onChange={(e) => setEmergencyContact1Relation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact1Phone">Telefono Contatto 1</Label>
                <Input
                  id="emergencyContact1Phone"
                  type="tel"
                  value={emergencyContact1Phone}
                  onChange={(e) => setEmergencyContact1Phone(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact2Name">Nome Contatto 2</Label>
                <Input
                  id="emergencyContact2Name"
                  type="text"
                  value={emergencyContact2Name}
                  onChange={(e) => setEmergencyContact2Name(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact2Relation">Relazione Contatto 2</Label>
                <Input
                  id="emergencyContact2Relation"
                  type="text"
                  value={emergencyContact2Relation}
                  onChange={(e) => setEmergencyContact2Relation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact2Phone">Telefono Contatto 2</Label>
                <Input
                  id="emergencyContact2Phone"
                  type="tel"
                  value={emergencyContact2Phone}
                  onChange={(e) => setEmergencyContact2Phone(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Consensi</CardTitle>
          <CardDescription>Autorizzazioni necessarie</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="photoConsent"
                checked={photoConsent}
                onCheckedChange={(checked) => setPhotoConsent(!!checked)}
              />
              <Label htmlFor="photoConsent">Consenso Foto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="aisaPhotoConsent"
                checked={aisaPhotoConsent}
                onCheckedChange={(checked) => setAisaPhotoConsent(!!checked)}
              />
              <Label htmlFor="aisaPhotoConsent">Consenso Foto AISA</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="tripConsent"
                checked={tripConsent}
                onCheckedChange={(checked) => setTripConsent(!!checked)}
              />
              <Label htmlFor="tripConsent">Consenso Gita</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medicalTreatmentConsent"
                checked={medicalTreatmentConsent}
                onCheckedChange={(checked) => setMedicalTreatmentConsent(!!checked)}
              />
              <Label htmlFor="medicalTreatmentConsent">Consenso Trattamento Medico</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dataProcessingConsent"
                checked={dataProcessingConsent}
                onCheckedChange={(checked) => setDataProcessingConsent(!!checked)}
              />
              <Label htmlFor="dataProcessingConsent">Consenso al Trattamento dei Dati</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annulla
        </Button>
        <Button type="submit">Salva</Button>
      </div>
    </form>
  );
};

export default MemberForm;
