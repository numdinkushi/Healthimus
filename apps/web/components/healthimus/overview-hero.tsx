import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  recipientName: string;
  openAlerts: number;
};

export const OverviewHero = ({ recipientName, openAlerts }: Props) => {
  return (
    <div className="healthimus-glass relative overflow-hidden rounded-2xl border p-6 md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-linear-to-br from-teal-400/20 to-cyan-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl space-y-2">
          <div className="text-primary inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            Today
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Supporting {recipientName}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Track symptoms, stay on top of medications, and walk into the next
            visit with a clear, doctor-ready brief — all in one calm workspace.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          <Button asChild className="rounded-xl shadow-sm">
            <Link href="/dashboard/symptoms">
              Log symptom
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="healthimus-glass rounded-xl"
          >
            <Link href="/dashboard/brief">Open doctor brief</Link>
          </Button>
        </div>
      </div>
      {openAlerts > 0 ? (
        <div className="relative mt-6 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-100">
          <span className="font-medium">{openAlerts} follow-up</span>
          {openAlerts === 1 ? " item" : " items"} need attention today — see
          overview cards below.
        </div>
      ) : null}
    </div>
  );
};
