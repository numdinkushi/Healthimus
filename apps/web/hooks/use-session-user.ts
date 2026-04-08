"use client";

import { GUEST_SESSION } from "@/lib/constants/session";

export type SessionUser = {
  displayName: string;
  email: string;
  initials: string;
  isAuthenticated: boolean;
};

export const useSessionUser = (): SessionUser => {
  return {
    displayName: GUEST_SESSION.displayName,
    email: GUEST_SESSION.email,
    initials: GUEST_SESSION.initials,
    isAuthenticated: false,
  };
};
