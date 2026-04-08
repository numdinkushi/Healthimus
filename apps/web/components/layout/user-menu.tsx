"use client";

import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionUser } from "@/hooks/use-session-user";
import { clearHealthimusClientStorage } from "@/lib/utils/clear-client-session";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "dropdown" | "inline";
};

export const UserMenu = ({ className, variant = "dropdown" }: Props) => {
  const user = useSessionUser();
  const router = useRouter();

  const logout = () => {
    clearHealthimusClientStorage();
    router.refresh();
    window.location.assign("/");
  };

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "healthimus-glass flex flex-col gap-3 rounded-xl border p-3",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <Avatar className="size-10 ring-2 ring-primary/15">
            <AvatarFallback className="bg-primary/15 text-primary text-sm font-semibold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.displayName}</p>
            <p className="text-muted-foreground truncate text-xs">
              {user.email}
            </p>
            <p className="text-muted-foreground mt-0.5 text-[11px] leading-snug">
              Sign in to sync across devices.
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full justify-center gap-2"
          onClick={logout}
        >
          <LogOut className="size-4" />
          Log out
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "hover:bg-muted/80 h-10 gap-2 rounded-xl px-2",
            className,
          )}
          aria-label="Account menu"
        >
          <Avatar className="size-8 ring-2 ring-border">
            <AvatarFallback className="bg-primary/12 text-primary text-xs font-semibold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 text-left sm:block">
            <p className="truncate text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
              {user.isAuthenticated ? user.email : "Guest session"}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{user.displayName}</span>
            <span className="text-muted-foreground text-xs">{user.email}</span>
            <span className="text-muted-foreground text-[11px] leading-snug">
              Sign in with Google to sync your workspace across devices.
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="gap-2">
          <User className="size-4 opacity-60" />
          Profile
          <span className="text-muted-foreground ml-auto text-[10px]">
            Soon
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive gap-2"
          onSelect={() => {
            logout();
          }}
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
