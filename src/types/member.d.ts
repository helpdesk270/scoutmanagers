
import { UserRole } from "@/context/AuthContext";

export { UserRole };

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

export interface Disease {
  name: string;
  hasHad: boolean;
}

export interface MemberType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitName?: string;
  avatarUrl?: string;
  achievements: Achievement[];
  attendance: AttendanceRecord[];
  
  // Common fields for all member types
  birthDate?: Date;
  birthPlace?: string;
  address?: string;
  phone?: string;
  fiscalCode?: string;
  memberType: "bambini" | "animatori" | "accompagnatore";
  
  // Document information for animatori and accompagnatore
  documentType?: "cartaIdentita" | "patente" | "passaporto";
  documentNumber?: string;
  issuedBy?: string;
  
  // Health information mainly for bambini
  bloodType?: string;
  allergies?: string;
  medications?: string;
  healthNotes?: string;
  followsMedicalTreatment?: boolean;
  illnesses?: {
    rosolia: boolean;
    varicella: boolean;
    angina: boolean;
    febbreReumatica: boolean;
    scarlattina: boolean;
    pertosse: boolean;
    otite: boolean;
    morbillo: boolean;
    parotite: boolean;
  };
  allergyDetails?: string;
  healthDifficulties?: string;
  parentRecommendations?: string;
  
  // Parent/Guardian information for bambini
  parentName?: string;
  parentAddress?: string;
  parentFiscalCode?: string;
  parentPhone?: string;
  
  // Authorizations
  photoConsent?: boolean;
  aisaPhotoConsent?: boolean;
  tripConsent?: boolean;
  medicalTreatmentConsent?: boolean;
  dataProcessingConsent?: boolean;
  
  // Emergency contacts
  emergencyContact1Name?: string;
  emergencyContact1Relation?: string;
  emergencyContact1Phone?: string;
  emergencyContact2Name?: string;
  emergencyContact2Relation?: string;
  emergencyContact2Phone?: string;
}
