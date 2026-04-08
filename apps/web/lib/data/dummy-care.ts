import type {
  CareAlert,
  CareRecipient,
  DoctorBriefDraft,
  MedicationDose,
  SymptomEntry,
} from "@/lib/types/care";

export const DUMMY_RECIPIENTS: CareRecipient[] = [
  {
    id: "rec_mom",
    displayName: "Eleanor Hart",
    relationLabel: "Mother",
    age: 78,
    conditions: ["Hypertension", "Mild cognitive impairment"],
    avatarGradient: "from-teal-400/90 to-cyan-600/80",
  },
  {
    id: "rec_dad",
    displayName: "James Hart",
    relationLabel: "Father",
    age: 81,
    conditions: ["Type 2 diabetes", "Osteoarthritis"],
    avatarGradient: "from-violet-400/80 to-indigo-700/80",
  },
];

export const DUMMY_SYMPTOMS: SymptomEntry[] = [
  {
    id: "sx_1",
    recipientId: "rec_mom",
    symptom: "Dizziness after lunch, lasted ~20 minutes",
    severity: "medium",
    note: "Skipped afternoon hydration; BP not measured yet.",
    loggedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "sx_2",
    recipientId: "rec_mom",
    symptom: "Mild confusion naming days of the week",
    severity: "low",
    loggedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: "sx_3",
    recipientId: "rec_dad",
    symptom: "Joint stiffness in knees, morning",
    severity: "low",
    note: "Improved after warm shower.",
    loggedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

export const DUMMY_MEDICATIONS: MedicationDose[] = [
  {
    id: "med_1",
    recipientId: "rec_mom",
    name: "Lisinopril 10mg",
    scheduleLabel: "Daily",
    taken: true,
    dueTimeLabel: "8:00 AM",
  },
  {
    id: "med_2",
    recipientId: "rec_mom",
    name: "Vitamin D",
    scheduleLabel: "Daily",
    taken: false,
    dueTimeLabel: "2:00 PM",
  },
  {
    id: "med_3",
    recipientId: "rec_dad",
    name: "Metformin 500mg",
    scheduleLabel: "2× daily",
    taken: true,
    dueTimeLabel: "8:00 AM",
  },
];

export const DUMMY_ALERTS: CareAlert[] = [
  {
    id: "al_1",
    recipientId: "rec_mom",
    title: "Afternoon medication pending",
    detail: "Vitamin D not marked taken before 3 PM window.",
    priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export const DUMMY_BRIEFS: Record<string, DoctorBriefDraft> = {
  rec_mom: {
    id: "brief_mom",
    recipientId: "rec_mom",
    generatedAt: new Date().toISOString(),
    summaryLines: [
      "78-year-old with hypertension and MCI; lives at home with family support.",
      "Recent focus: post-lunch dizziness and medication adherence.",
    ],
    sections: [
      {
        title: "Current symptoms",
        bullets: [
          "Dizziness after lunch (Apr 7), moderate concern; hydration and BP follow-up suggested.",
          "Intermittent mild naming difficulty; baseline vs new change to clarify at visit.",
        ],
      },
      {
        title: "Medication adherence",
        bullets: [
          "Lisinopril: taken AM as scheduled.",
          "Vitamin D: pending confirmation for afternoon dose.",
        ],
      },
      {
        title: "Questions for clinician",
        bullets: [
          "Orthostatic assessment given dizziness timing?",
          "Any med adjustments if afternoon BP runs low?",
        ],
      },
    ],
  },
  rec_dad: {
    id: "brief_dad",
    recipientId: "rec_dad",
    generatedAt: new Date().toISOString(),
    summaryLines: [
      "81-year-old with type 2 diabetes and osteoarthritis; ambulatory with cane.",
      "Stable glucose routine; joint stiffness mostly mornings.",
    ],
    sections: [
      {
        title: "Current symptoms",
        bullets: [
          "Morning knee stiffness; improves with movement and warm shower.",
        ],
      },
      {
        title: "Medication adherence",
        bullets: ["Metformin: AM dose confirmed."],
      },
      {
        title: "Questions for clinician",
        bullets: [
          "Continue current DM regimen given stable home readings?",
          "PT referral for gait if stiffness worsens?",
        ],
      },
    ],
  },
};

export const getBriefForRecipient = (recipientId: string): DoctorBriefDraft =>
  DUMMY_BRIEFS[recipientId] ?? DUMMY_BRIEFS.rec_mom;

export const getTodaysSummaryDummy = (recipientId: string) => {
  const symptoms = DUMMY_SYMPTOMS.filter((s) => s.recipientId === recipientId);
  const meds = DUMMY_MEDICATIONS.filter((m) => m.recipientId === recipientId);
  const pending = meds.filter((m) => !m.taken).length;
  const alerts = DUMMY_ALERTS.filter((a) => a.recipientId === recipientId);

  return {
    symptomCount: symptoms.length,
    adherencePending: pending,
    openAlerts: alerts.length,
    lastSymptomAt: symptoms[0]?.loggedAt ?? null,
  };
};
