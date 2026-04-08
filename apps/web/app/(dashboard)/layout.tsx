import { type ReactNode } from "react";

import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
