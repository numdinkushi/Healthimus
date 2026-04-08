"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/theme-provider";
import { ConvexProviderWrapper } from "@/components/providers/convex-provider";

type Props = {
  children: ReactNode;
  convexUrl?: string;
};

export const AppProviders = ({ children, convexUrl }: Props) => {
  return (
    <SessionProvider>
      <ConvexProviderWrapper convexUrl={convexUrl}>
        <ThemeProvider>{children}</ThemeProvider>
      </ConvexProviderWrapper>
    </SessionProvider>
  );
};
