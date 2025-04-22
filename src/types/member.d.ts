
import { UserRole } from "@/context/AuthContext";

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

export interface MemberType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitName?: string;
  avatarUrl?: string;
  achievements: Achievement[];
  attendance: AttendanceRecord[];
  
  // Common fields
  birthDate?: Date;
  birthPlace?: string;
  address?: string;
  phone?: string;
  fiscalCode?: string;
  
  // Member type
  memberType?: "bambini" | "animatori" | "accompagnatore";
  
  // Health information (primarily for bambini)
  bloodType?: string;
  allergies?: string;
  medications?: string;
  healthNotes?: string;
  illnesses?: string[];
  
  // Authorizations (primarily for bambini)
  photoConsent?: boolean;
  tripConsent?: boolean;
  medicalTreatmentConsent?: boolean;
  
  // Parent/Guardian info (for bambini)
  parentName?: string;
  parentAddress?: string;
  parentFiscalCode?: string;
  parentPhone?: string;
  
  // Emergency contacts
  emergencyContact1Name?: string;
  emergencyContact1Relation?: string;
  emergencyContact1Phone?: string;
  emergencyContact2Name?: string;
  emergencyContact2Relation?: string;
  emergencyContact2Phone?: string;
  
  // Document info (for animatori and accompagnatore)
  documentType?: string;
  documentNumber?: string;
  issuedBy?: string;
}
