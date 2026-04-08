const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

export const formatShortDate = (iso: string): string =>
  shortDateFormatter.format(new Date(iso));

export const formatRelativeTime = (iso: string, nowMs: number = Date.now()): string => {
  const then = new Date(iso).getTime();
  const diffMs = nowMs - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};
