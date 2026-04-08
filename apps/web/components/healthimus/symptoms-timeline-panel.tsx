"use client";

import { SymptomTimeline } from "@/components/healthimus/symptom-timeline";
import { useCare } from "@/lib/context/care-context";

export const SymptomsTimelinePanel = () => {
  const { symptoms } = useCare();
  return <SymptomTimeline entries={symptoms} max={12} />;
};
