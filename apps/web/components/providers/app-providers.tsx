"use client";

import { type ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { ConvexProviderWrapper } from "@/components/providers/convex-provider";

type Props = {
  children: ReactNode;
  convexUrl?: string;
};

export const AppProviders = ({ children, convexUrl }: Props) => {
  return (
    <ConvexProviderWrapper convexUrl={convexUrl}>
      <ThemeProvider>{children}</ThemeProvider>
    </ConvexProviderWrapper>
  );
};
