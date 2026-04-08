"use client";

import { useEffect, useState } from "react";

import { formatRelativeTime, formatShortDate } from "@/lib/utils/format-time";
import { cn } from "@/lib/utils";

type Props = {
  iso: string;
  className?: string;
};

export const RelativeTime = ({ iso, className }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span className={cn("tabular-nums", className)}>
      {mounted ? formatRelativeTime(iso) : formatShortDate(iso)}
    </span>
  );
};
