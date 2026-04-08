import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RelativeTime } from "@/components/ui/relative-time";
import type { CareAlert } from "@/lib/types/care";
import { severityBadgeClass, severityLabel } from "@/lib/utils/severity";
import { cn } from "@/lib/utils";

type Props = {
  alerts: CareAlert[];
};

export const AlertList = ({ alerts }: Props) => {
  if (alerts.length === 0) {
    return (
      <Card className="healthimus-glass">
        <CardHeader>
          <CardTitle className="text-base">Alerts</CardTitle>
          <CardDescription>No open alerts for this recipient.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="healthimus-glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="text-amber-600 dark:text-amber-400 size-4" />
          Alerts
        </CardTitle>
        <CardDescription>Escalations and follow-ups</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="bg-muted/40 flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{a.title}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-semibold uppercase",
                    severityBadgeClass(a.priority),
                  )}
                >
                  {severityLabel(a.priority)}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{a.detail}</p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
              <RelativeTime iso={a.createdAt} />
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
