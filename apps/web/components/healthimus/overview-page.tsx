"use client";

import {
  Activity,
  Bell,
  Pill,
} from "lucide-react";

import { AlertList } from "@/components/healthimus/alert-list";
import { MedicationList } from "@/components/healthimus/medication-list";
import { OverviewHero } from "@/components/healthimus/overview-hero";
import { StatCard } from "@/components/healthimus/stat-card";
import { SymptomTimeline } from "@/components/healthimus/symptom-timeline";
import { RelativeTime } from "@/components/ui/relative-time";
import { useCare } from "@/lib/context/care-context";

export const OverviewPage = () => {
  const { recipient, summary, symptoms, medications, alerts } = useCare();

  const name = recipient?.displayName ?? "Care recipient";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <OverviewHero recipientName={name} openAlerts={summary.openAlerts} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Symptoms logged"
          value={summary.symptomCount}
          hint="In this demo dataset + your session"
          icon={Activity}
        />
        <StatCard
          title="Pending doses"
          value={summary.adherencePending}
          hint="Medications not marked taken"
          icon={Pill}
        />
        <StatCard
          title="Open alerts"
          value={summary.openAlerts}
          hint="Needs follow-up"
          icon={Bell}
        />
        <StatCard
          title="Last update"
          value={
            summary.lastSymptomAt ? (
              <RelativeTime iso={summary.lastSymptomAt} />
            ) : (
              "—"
            )
          }
          hint="Most recent symptom entry"
          icon={Activity}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SymptomTimeline entries={symptoms} max={5} />
        <MedicationList medications={medications} />
      </div>

      <AlertList alerts={alerts} />
    </div>
  );
};
