/**
 * Types & Interfaces for Suprabhat Mishra & Associates Legal Workspace
 */

export interface PracticeArea {
  id: string;
  title: string;
  titleHindi: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  casesHandled: string[];
  disputesType: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface StampDutyInput {
  propertyValue: number;
  buyerGender: "male" | "female" | "joint";
  propertyType: "residential" | "agricultural" | "commercial";
  isInKanpurMetropolitan: boolean;
}

export interface StampDutyResult {
  propertyValue: number;
  stampDutyPercent: number;
  stampDutyAmount: number;
  rebatePercent: number;
  rebateAmount: number;
  registrationPercent: number;
  registrationAmount: number;
  totalCharges: number;
  grandTotal: number;
  legalNote: string;
}

export interface AppointmentInput {
  clientName: string;
  phone: string;
  email: string;
  matterType: string;
  description: string;
  preferredDate: string;
  preferredSlot: string;
}

export interface ScheduledCaseFile {
  fileNumber: string;
  clientName: string;
  phone: string;
  email: string;
  matterType: string;
  description: string;
  preferredDate: string;
  preferredSlot: string;
  estimatedJurisdiction: string;
  dateCreated: string;
  status: "Confirmed" | "Initiated" | "Awaiting Review";
}

export interface ClientConsultation {
  id: string;
  date: string;
  summary: string;
  lawyerNotes: string;
  courtLocation: string;
}

export interface ClientDocument {
  id: string;
  name: string;
  type: "Agreement" | "Notice" | "Stamp Estimator" | "Pleading Affidavit" | "Summons";
  dateCreated: string;
  fileSize: string;
  content: string;
}

export interface ClientProfile {
  phone: string;
  clientName: string;
  email: string;
  caseStatus: "Case Initiated" | "Documentation Review" | "Advocate Pleading Filed" | "Court Decision Status" | "Closed";
  fileNumber: string;
  matterType: string;
  progressPercent: number;
  consultations: ClientConsultation[];
  documents: ClientDocument[];
}

export interface LawSectionItem {
  section: string;
  category: "Civil" | "Criminal" | "Family" | "Property" | "Corporate";
  title: string;
  act: string;
  description: string;
  penalty: string;
  keyAdvice: string;
}
