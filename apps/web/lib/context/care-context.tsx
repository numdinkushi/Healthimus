"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DUMMY_ALERTS,
  DUMMY_MEDICATIONS,
  DUMMY_RECIPIENTS,
  DUMMY_SYMPTOMS,
  getBriefForRecipient,
  getTodaysSummaryDummy,
} from "@/lib/data/dummy-care";
import type {
  CareAlert,
  CareRecipient,
  DoctorBriefDraft,
  MedicationDose,
  SeverityLevel,
  SymptomEntry,
} from "@/lib/types/care";

const STORAGE_KEY = "healthimus.selectedRecipientId";

type CareContextValue = {
  recipientId: string;
  recipient: CareRecipient | undefined;
  recipients: CareRecipient[];
  setRecipientId: (id: string) => void;
  symptoms: SymptomEntry[];
  addSymptom: (input: {
    symptom: string;
    severity: SeverityLevel;
    note?: string;
  }) => void;
  medications: MedicationDose[];
  alerts: CareAlert[];
  summary: ReturnType<typeof getTodaysSummaryDummy>;
  brief: DoctorBriefDraft;
};

const CareContext = createContext<CareContextValue | null>(null);

export const CareProvider = ({ children }: { children: ReactNode }) => {
  const [recipientId, setRecipientIdState] = useState(
    DUMMY_RECIPIENTS[0]?.id ?? "",
  );
  const [localSymptoms, setLocalSymptoms] = useState<SymptomEntry[]>([]);

  const setRecipientId = useCallback((id: string) => {
    setRecipientIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const recipient = DUMMY_RECIPIENTS.find((r) => r.id === recipientId);

  const symptoms = useMemo(() => {
    const base = DUMMY_SYMPTOMS.filter((s) => s.recipientId === recipientId);
    const local = localSymptoms.filter((s) => s.recipientId === recipientId);
    return [...local, ...base].sort(
      (a, b) =>
        new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime(),
    );
  }, [localSymptoms, recipientId]);

  const addSymptom = useCallback(
    (input: {
      symptom: string;
      severity: SeverityLevel;
      note?: string;
    }) => {
      const entry: SymptomEntry = {
        id: `local_${Date.now().toString(36)}`,
        recipientId,
        symptom: input.symptom.trim(),
        severity: input.severity,
        note: input.note?.trim() || undefined,
        loggedAt: new Date().toISOString(),
      };
      setLocalSymptoms((prev) => [entry, ...prev]);
    },
    [recipientId],
  );

  const medications = useMemo(
    () => DUMMY_MEDICATIONS.filter((m) => m.recipientId === recipientId),
    [recipientId],
  );

  const alerts = useMemo(
    () => DUMMY_ALERTS.filter((a) => a.recipientId === recipientId),
    [recipientId],
  );

  const summary = useMemo(
    () => getTodaysSummaryDummy(recipientId),
    [recipientId],
  );

  const brief = useMemo(
    () => getBriefForRecipient(recipientId),
    [recipientId],
  );

  const value = useMemo(
    (): CareContextValue => ({
      recipientId,
      recipient,
      recipients: DUMMY_RECIPIENTS,
      setRecipientId,
      symptoms,
      addSymptom,
      medications,
      alerts,
      summary,
      brief,
    }),
    [
      recipientId,
      recipient,
      setRecipientId,
      symptoms,
      addSymptom,
      medications,
      alerts,
      summary,
      brief,
    ],
  );

  return (
    <CareContext.Provider value={value}>{children}</CareContext.Provider>
  );
};

export const useCare = (): CareContextValue => {
  const ctx = useContext(CareContext);
  if (!ctx) {
    throw new Error("useCare must be used within CareProvider");
  }
  return ctx;
};
