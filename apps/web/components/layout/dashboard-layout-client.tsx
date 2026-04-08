"use client";

import { type ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { CareProvider, useCare } from "@/lib/context/care-context";

const ShellInner = ({ children }: { children: ReactNode }) => {
  const {
    recipient,
    recipientId,
    setRecipientId,
    recipients,
  } = useCare();

  return (
    <AppShell
      recipient={recipient}
      recipientId={recipientId}
      recipients={recipients}
      onRecipientChange={setRecipientId}
    >
      {children}
    </AppShell>
  );
};

export const DashboardLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <CareProvider>
      <ShellInner>{children}</ShellInner>
    </CareProvider>
  );
};
