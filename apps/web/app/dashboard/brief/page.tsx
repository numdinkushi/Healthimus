import { DoctorBriefView } from "@/components/healthimus/doctor-brief-view";

export default function BriefPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Doctor brief</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Structured summary for the next visit — sample content below. In
          production, this will merge Convex records with live agent output.
        </p>
      </header>
      <DoctorBriefView />
    </div>
  );
}
