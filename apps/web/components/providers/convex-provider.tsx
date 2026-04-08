"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode;
  convexUrl?: string;
};

export const ConvexProviderWrapper = ({ children, convexUrl }: Props) => {
  const client = useMemo(() => {
    if (!convexUrl?.trim()) {
      return null;
    }
    return new ConvexReactClient(convexUrl.trim());
  }, [convexUrl]);

  if (!client) {
    return children;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
};
