import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SymptomEntry } from "@/lib/types/care";
import { formatShortDate } from "@/lib/utils/format-time";
import { severityBadgeClass, severityLabel } from "@/lib/utils/severity";
import { cn } from "@/lib/utils";

type Props = {
  entries: SymptomEntry[];
  max?: number;
};

export const SymptomTimeline = ({ entries, max = 4 }: Props) => {
  const slice = entries.slice(0, max);

  return (
    <Card className="healthimus-glass h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent symptoms</CardTitle>
        <CardDescription>Latest entries for this recipient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0">
        {slice.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            No symptoms logged yet.
          </p>
        ) : (
          <ul className="relative space-y-0">
            {slice.map((s, i) => (
              <li
                key={s.id}
                className="border-border/80 relative flex gap-3 border-l-2 pb-6 pl-5 last:pb-0"
              >
                <span
                  className={cn(
                    "bg-background absolute top-1.5 -left-[5px] size-2 rounded-full ring-2 ring-primary/30",
                    i === 0 && "ring-primary",
                  )}
                />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-semibold uppercase",
                        severityBadgeClass(s.severity),
                      )}
                    >
                      {severityLabel(s.severity)}
                    </Badge>
                    <time className="text-muted-foreground text-xs">
                      {formatShortDate(s.loggedAt)}
                    </time>
                  </div>
                  <p className="text-sm leading-snug">{s.symptom}</p>
                  {s.note ? (
                    <p className="text-muted-foreground text-xs">{s.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
