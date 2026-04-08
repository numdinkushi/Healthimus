"use client";

import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { clearHealthimusClientStorage } from "@/lib/utils/clear-client-session";

type SignInButtonProps = {
  className?: string;
  callbackUrl?: string;
};

export const GoogleSignInButton = ({
  className,
  callbackUrl = "/dashboard",
}: SignInButtonProps) => {
  return (
    <Button
      type="button"
      className={className}
      onClick={() => {
        void signIn("google", { callbackUrl });
      }}
    >
      Sign in with Google
    </Button>
  );
};

type SignOutButtonProps = {
  className?: string;
};

export const GoogleSignOutButton = ({ className }: SignOutButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={() => {
        clearHealthimusClientStorage();
        void signOut({ callbackUrl: "/" });
      }}
    >
      <LogOut className="mr-2 size-4" />
      Log out
    </Button>
  );
};
