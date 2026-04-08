export type SeverityLevel = "low" | "medium" | "high" | "critical";

export type CareRecipient = {
  id: string;
  displayName: string;
  relationLabel: string;
  age?: number;
  conditions: string[];
  avatarGradient: string;
};

export type SymptomEntry = {
  id: string;
  recipientId: string;
  symptom: string;
  severity: SeverityLevel;
  note?: string;
  loggedAt: string;
};

export type MedicationDose = {
  id: string;
  recipientId: string;
  name: string;
  scheduleLabel: string;
  taken: boolean;
  dueTimeLabel: string;
};

export type CareAlert = {
  id: string;
  recipientId: string;
  title: string;
  detail: string;
  priority: SeverityLevel;
  createdAt: string;
};

export type DoctorBriefDraft = {
  id: string;
  recipientId: string;
  generatedAt: string;
  summaryLines: string[];
  sections: { title: string; bullets: string[] }[];
};
