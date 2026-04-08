import { CheckCircle2, Circle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MedicationDose } from "@/lib/types/care";
import { cn } from "@/lib/utils";

type Props = {
  medications: MedicationDose[];
};

export const MedicationList = ({ medications }: Props) => {
  return (
    <Card className="healthimus-glass h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Medications</CardTitle>
        <CardDescription>Today&apos;s schedule (sample)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {medications.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm",
              m.taken
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-amber-500/20 bg-amber-500/5",
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              {m.taken ? (
                <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 size-4 shrink-0" />
              ) : (
                <Circle className="text-amber-600 dark:text-amber-400 size-4 shrink-0" />
              )}
              <div className="min-w-0">
                <div className="truncate font-medium">{m.name}</div>
                <div className="text-muted-foreground text-xs">
                  {m.scheduleLabel} · {m.dueTimeLabel}
                </div>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 text-xs font-medium",
                m.taken ? "text-emerald-700 dark:text-emerald-300" : "text-amber-800 dark:text-amber-200",
              )}
            >
              {m.taken ? "Taken" : "Pending"}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
