import type { SeverityLevel } from "@/lib/types/care";

export const severityLabel = (s: SeverityLevel): string => {
  const map: Record<SeverityLevel, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };
  return map[s];
};

export const severityBadgeClass = (s: SeverityLevel): string => {
  const map: Record<SeverityLevel, string> = {
    low: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/20",
    medium:
      "bg-amber-500/15 text-amber-900 dark:text-amber-100 border-amber-500/25",
    high: "bg-orange-500/15 text-orange-900 dark:text-orange-100 border-orange-500/25",
    critical:
      "bg-rose-500/15 text-rose-900 dark:text-rose-100 border-rose-500/30",
  };
  return map[s];
};
