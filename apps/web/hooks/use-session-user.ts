"use client";

import { useSession } from "next-auth/react";

import { GUEST_SESSION } from "@/lib/constants/session";

export type SessionUser = {
  displayName: string;
  email: string;
  initials: string;
  isAuthenticated: boolean;
  image?: string | null;
};

export const useSessionUser = (): SessionUser => {
  const { data } = useSession();
  const user = data?.user;
  const displayName = user?.name?.trim();
  const email = user?.email?.trim();
  const initials = (displayName ?? email ?? GUEST_SESSION.initials)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  if (user) {
    return {
      displayName: displayName || "Caregiver",
      email: email || "No email",
      initials: initials || "CG",
      isAuthenticated: true,
      image: user.image,
    };
  }

  return {
    displayName: GUEST_SESSION.displayName,
    email: GUEST_SESSION.email,
    initials: GUEST_SESSION.initials,
    isAuthenticated: false,
    image: null,
  };
};
