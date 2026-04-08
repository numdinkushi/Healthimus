import { SymptomLogForm } from "@/components/healthimus/symptom-log-form";
import { SymptomsTimelinePanel } from "@/components/healthimus/symptoms-timeline-panel";

export default function SymptomsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Symptoms</h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Capture what you observe — severity, timing, and context. This flow is
          designed for fast mobile logging during real caregiving moments.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-2">
        <SymptomLogForm />
        <SymptomsTimelinePanel />
      </div>
    </div>
  );
}
